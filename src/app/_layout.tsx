import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SnackbarProvider } from "@/providers/SnackBarProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { NotificationsProvider } from "@/providers/NotificationsProvider";
import { APP_FONTS } from "@/utils/constants";


export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        [APP_FONTS.regular]: require("../../assets/fonts/Poppins-Regular.ttf"),
        [APP_FONTS.bold]: require("../../assets/fonts/Poppins-Bold.ttf"),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator animating={true} />
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
                <AuthProvider>
                    <QueryProvider>
                        <ThemeProvider>
                            <NotificationsProvider>
                                <SnackbarProvider>
                                    <Stack screenOptions={{
                                        headerShown: false
                                    }}>
                                        <Stack.Screen
                                            name="login"
                                            options={{
                                                animation: "none",
                                            }} />
                                        <Stack.Screen name="(protected)" />
                                    </Stack>
                                </SnackbarProvider>
                            </NotificationsProvider>
                        </ThemeProvider>
                    </QueryProvider>
                </AuthProvider>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
