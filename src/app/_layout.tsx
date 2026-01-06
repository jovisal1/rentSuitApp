import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SnackbarProvider } from "../providers/SnackBarProvider";
import { ThemeProvider } from "../providers/ThemeProvider";


export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator animating={true} />
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
                <ThemeProvider>
                    <SnackbarProvider>
                        <Stack screenOptions={{
                            headerShown: false
                        }}>
                            <Stack.Screen name="index" />
                            <Stack.Screen name="(tabs)" />
                        </Stack>
                    </SnackbarProvider>
                </ThemeProvider>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}