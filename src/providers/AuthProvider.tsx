import { SplashScreen, useRouter, useSegments } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useUserStore } from "@/stores/user.store";
import { supabase } from "@/services/supabaseClient";
import { fetchProfileByAuthId } from "@/services/auth.service";

SplashScreen.preventAutoHideAsync();

type AuthState = {
    isLoggedIn: boolean;
    isReady: boolean;
    logIn: () => void;
    logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isReady: false,
    logIn: () => { },
    logOut: () => { },
});

export function AuthProvider({ children }: PropsWithChildren) {
    const router = useRouter();
    const segments = useSegments();
    const user = useUserStore.use.user();
    const role = useUserStore.use.role();
    const token = useUserStore.use.token();
    const setUser = useUserStore.use.setUser();
    const clearUser = useUserStore.use.clearUser();
    const isLoggedIn = useMemo(() => Boolean(user && token), [user, token]);

    const [isHydrated, setIsHydrated] = useState(
        typeof useUserStore.persist?.hasHydrated === "function"
            ? useUserStore.persist.hasHydrated()
            : true
    );
    const [isAuthReady, setIsAuthReady] = useState(false);
    const isReady = isHydrated && isAuthReady;

    useEffect(() => {
        if (isHydrated) return;
        const unsubscribe =
            typeof useUserStore.persist?.onFinishHydration === "function"
                ? useUserStore.persist.onFinishHydration(() => setIsHydrated(true))
                : null;
        return () => {
            if (typeof unsubscribe === "function") {
                unsubscribe();
            }
        };
    }, [isHydrated]);

    useEffect(() => {
        if (!isHydrated) return;
        let isMounted = true;

        const loadSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (!isMounted) return;

            if (error || !data.session) {
                clearUser();
                setIsAuthReady(true);
                return;
            }

            if (!user || !role || !token) {
                try {
                    const profile = await fetchProfileByAuthId(data.session.user.id);
                    if (!isMounted) return;
                    setUser(profile.user, profile.role, data.session.access_token);
                } catch {
                    clearUser();
                    await supabase.auth.signOut();
                }
            }

            if (isMounted) {
                setIsAuthReady(true);
            }
        };

        loadSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (!session) {
                    clearUser();
                    return;
                }
                if (!user || !role || !token) {
                    const profile = await fetchProfileByAuthId(session.user.id);
                    setUser(profile.user, profile.role, session.access_token);
                }
            }
        );

        return () => {
            isMounted = false;
            authListener?.subscription?.unsubscribe();
        };
    }, [clearUser, isHydrated, role, setUser, token, user]);

    useEffect(() => {
        if (isReady) {
            SplashScreen.hideAsync();
        }
    }, [isReady]);

    useEffect(() => {
        if (!isReady) return;
        const inProtectedGroup = segments[0] === "(protected)";
        if (!isLoggedIn && inProtectedGroup) {
            router.replace("/login");
            return;
        }
        if (isLoggedIn && !inProtectedGroup) {
            router.replace("/(protected)");
        }
    }, [isLoggedIn, isReady, router, segments]);

    const logIn = () => {
        router.replace("/(protected)");
    };

    const logOut = async () => {
        clearUser();
        await useUserStore.persist.clearStorage();
        await supabase.auth.signOut();
        router.replace("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                isReady,
                isLoggedIn,
                logIn,
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
