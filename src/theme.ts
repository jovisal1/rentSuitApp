
import { MD3LightTheme as DefaultTheme } from "react-native-paper";
import { APP_FONTS } from "@/utils/constants";



export const lightThemeColors = {
    "primary": "#06305f",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(213, 227, 255)",
    "onPrimaryContainer": "rgb(0, 28, 59)",
    "secondary": "rgb(0, 99, 151)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(204, 229, 255)",
    "onSecondaryContainer": "rgb(0, 29, 49)",
    "tertiary": "rgb(5, 97, 163)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(209, 228, 255)",
    "onTertiaryContainer": "rgb(0, 29, 54)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(246, 245, 248)",
    "onBackground": "rgb(26, 28, 30)",
    "surface": "rgb(253, 252, 255)",
    "onSurface": "rgb(26, 28, 30)",
    "surfaceVariant": "rgb(224, 226, 236)",
    "onSurfaceVariant": "rgb(67, 71, 78)",
    "outline": "rgb(116, 119, 127)",
    "outlineVariant": "rgb(195, 198, 207)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(47, 48, 51)",
    "inverseOnSurface": "rgb(241, 240, 244)",
    "inversePrimary": "rgb(166, 200, 255)",
    "elevation": {
        "level0": "transparent",
        "level1": "rgb(242, 244, 251)",
        "level2": "rgb(235, 239, 248)",
        "level3": "rgb(229, 235, 245)",
        "level4": "rgb(227, 233, 244)",
        "level5": "rgb(222, 230, 243)"
    },
    "surfaceDisabled": "rgba(26, 28, 30, 0.12)",
    "onSurfaceDisabled": "rgba(26, 28, 30, 0.38)",
    "backdrop": "rgba(45, 48, 56, 0.4)",
    "custom0": "rgb(103, 96, 0)",
    "onCustom0": "rgb(255, 255, 255)",
    "custom0Container": "rgb(241, 230, 106)",
    "onCustom0Container": "rgb(31, 28, 0)"

}

export const darkThemeColors = {
    "primary": "rgb(166, 200, 255)",
    "onPrimary": "rgb(0, 49, 95)",
    "primaryContainer": "rgb(0, 71, 134)",
    "onPrimaryContainer": "rgb(213, 227, 255)",
    "secondary": "rgb(147, 204, 255)",
    "onSecondary": "rgb(0, 51, 81)",
    "secondaryContainer": "rgb(0, 75, 115)",
    "onSecondaryContainer": "rgb(204, 229, 255)",
    "tertiary": "rgb(159, 202, 255)",
    "onTertiary": "rgb(0, 50, 89)",
    "tertiaryContainer": "rgb(0, 73, 125)",
    "onTertiaryContainer": "rgb(209, 228, 255)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(26, 28, 30)",
    "onBackground": "rgb(227, 226, 230)",
    "surface": "rgb(26, 28, 30)",
    "onSurface": "rgb(227, 226, 230)",
    "surfaceVariant": "rgb(67, 71, 78)",
    "onSurfaceVariant": "rgb(195, 198, 207)",
    "outline": "rgb(141, 145, 153)",
    "outlineVariant": "rgb(67, 71, 78)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(227, 226, 230)",
    "inverseOnSurface": "rgb(47, 48, 51)",
    "inversePrimary": "rgb(32, 95, 166)",
    "elevation": {
        "level0": "transparent",
        "level1": "rgb(33, 37, 41)",
        "level2": "rgb(37, 42, 48)",
        "level3": "rgb(41, 47, 55)",
        "level4": "rgb(43, 49, 57)",
        "level5": "rgb(46, 52, 62)"
    },
    "surfaceDisabled": "rgba(227, 226, 230, 0.12)",
    "onSurfaceDisabled": "rgba(227, 226, 230, 0.38)",
    "backdrop": "rgba(45, 48, 56, 0.4)",
    "custom0": "rgb(212, 202, 81)",
    "onCustom0": "rgb(53, 49, 0)",
    "custom0Container": "rgb(77, 72, 0)",
    "onCustom0Container": "rgb(241, 230, 106)"
}

export const themeApp = {
    ...DefaultTheme,
    colors: lightThemeColors,
    fontFamily: APP_FONTS.regular,
};
