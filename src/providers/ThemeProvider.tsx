import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

import { darkThemeColors, lightThemeColors } from "@/theme";
import { APP_FONTS } from "@/utils/constants";

type ThemeContextValue = {
    isDark: boolean;
    setIsDark: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState(false);
    const theme = useMemo(() => {
        if (isDark) {
            return {
                ...MD3DarkTheme,
                colors: { ...MD3DarkTheme.colors, ...darkThemeColors },
                fontFamily: APP_FONTS.regular,
            };
        }

        return {
            ...MD3LightTheme,
            colors: { ...MD3LightTheme.colors, ...lightThemeColors },
            fontFamily: APP_FONTS.regular,
        };
    }, [isDark]);

    const value = useMemo(
        () => ({
            isDark,
            theme,
            setIsDark,
        }),
        [isDark, theme],
    );

    return (
        <ThemeContext.Provider value={value}>
            <PaperProvider theme={theme}>{children}</PaperProvider>
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useThemeContext must be used within ThemeProvider");
    }
    return ctx;
}
