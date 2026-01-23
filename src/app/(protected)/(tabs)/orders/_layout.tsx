import { Stack } from "expo-router";
import { HeaderApp } from "@/components/HeaderApp";

export default function RootLayout() {
    return (
        <Stack screenOptions={{
            headerTitle: '',
            header: (props) => <HeaderApp {...props} />,
        }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="[orderId]" options={{ headerShown: false }} />
        </Stack>
    );
}
