import { SplashScreen, useRouter, useSegments } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useUserStore } from "@/stores/user.store";

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
    const user = useUserStore((state) => state.user);
    const token = useUserStore((state) => state.token);
    const clearUser = useUserStore((state) => state.clearUser);
    const [isReady, setIsReady] = useState(
        typeof useUserStore.persist?.hasHydrated === "function"
            ? useUserStore.persist.hasHydrated()
            : true
    );

    const isLoggedIn = useMemo(() => Boolean(user && token), [user, token]);

    useEffect(() => {
        if (isReady) return;
        const unsubscribe =
            typeof useUserStore.persist?.onFinishHydration === "function"
                ? useUserStore.persist.onFinishHydration(() => setIsReady(true))
                : null;
        return () => {
            if (typeof unsubscribe === "function") {
                unsubscribe();
            }
        };
    }, [isReady]);

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
        console.log("Eliminado usuario")
        await useUserStore.persist.clearStorage();
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
