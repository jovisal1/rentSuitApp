import { useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Button, Card, Divider, Text, useTheme } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LinkButtonApp } from "../components/LinkButtonApp";
import { TextInputApp } from "../components/TextInputApp";
import { PrimaryButtonApp } from "../components/PrimaryButtonApp";

import {
    loginSchema,
    registerSchema,
    LoginFormValues,
    RegisterFormValues,
} from "../schemas/auth.schema";
import styles from "../styles/AuthScreen.styles";

export default function AuthScreen() {
    const theme = useTheme();
    const [mode, setMode] = useState<"login" | "register">("login");
    const isRegister = useMemo(() => mode === "register", [mode]);

    const loginForm = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
        defaultValues: { email: "", password: "" },
    });

    const registerForm = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
        defaultValues: { email: "", password: "", confirmPassword: "" },
    });

    const form = isRegister ? registerForm : loginForm;
    const {
        control,
        formState: { errors, isSubmitting },
    } = form;

    const onSubmitLogin = async (data: LoginFormValues) => {
        try {
            console.log("login submit", data);
            router.replace("/(tabs)");
        } catch (e) {
            Alert.alert("Error", "No se pudo iniciar sesión");
        }
    };

    const onSubmitRegister = async (data: RegisterFormValues) => {
        try {
            console.log("register submit", data);
            router.replace("/(tabs)");
        } catch (e) {
            Alert.alert("Error", "No se pudo crear la cuenta");
        }
    };

    const toggleMode = () => {
        setMode(isRegister ? "login" : "register");
        loginForm.reset();
        registerForm.reset();
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Card style={styles.card} mode="elevated">
                <Card.Content>
                    <View style={[styles.logoBadge, { backgroundColor: theme.colors.primary }]} />

                    <Text variant="displaySmall" style={styles.greeting}>
                        Hey,
                    </Text>
                    <Text variant="headlineLarge" style={styles.title}>
                        {isRegister ? "Crea tu cuenta" : "Inicia sesión"}
                    </Text>

                    <View style={styles.helperRow}>
                        <Text variant="bodySmall">
                            {isRegister ? "¿Ya tienes cuenta?" : "Si eres nuevo /"}
                        </Text>
                        <LinkButtonApp onPress={toggleMode} labelStyle={styles.helperLink}>
                            {isRegister ? "Entrar" : "Crear cuenta"}
                        </LinkButtonApp>
                    </View>

                    <Controller
                        control={control as any}
                        name={"email" as any}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <TextInputApp
                                label="Correo electrónico"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                                textContentType="emailAddress"
                                errorText={(errors as any).email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control as any}
                        name={"password" as any}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <TextInputApp
                                label="Contraseña"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                secureTextEntry
                                autoComplete={isRegister ? "new-password" : "password"}
                                textContentType="password"
                                errorText={(errors as any).password?.message}
                            />
                        )}
                    />

                    {isRegister && (
                        <Controller
                            control={registerForm.control}
                            name="confirmPassword"
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextInputApp
                                    label="Confirmar contraseña"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    secureTextEntry
                                    autoComplete="new-password"
                                    errorText={registerForm.formState.errors.confirmPassword?.message}
                                />
                            )}
                        />
                    )}

                    {!isRegister && (
                        <View style={styles.resetRow}>
                            <Text
                                variant="bodySmall"
                                style={[styles.subtleText, { color: theme.colors.onSurfaceVariant }]}
                            >
                                ¿Olvidaste tu contraseña? /
                            </Text>
                            <Button compact mode="text" labelStyle={styles.helperLink}>
                                Restablecer
                            </Button>
                        </View>
                    )}

                    <PrimaryButtonApp
                        onPress={
                            isRegister
                                ? registerForm.handleSubmit(onSubmitRegister)
                                : loginForm.handleSubmit(onSubmitLogin)
                        }
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        labelStyle={styles.submitLabel}
                    >
                        {isRegister ? "Registrarme" : "Entrar"}
                    </PrimaryButtonApp>

                    <Divider style={[styles.divider, { backgroundColor: theme.colors.outlineVariant }]} />

                    <Text
                        variant="labelSmall"
                        style={[styles.socialHint, { color: theme.colors.onSurfaceVariant }]}
                    >
                        o continúa con
                    </Text>

                    <View style={styles.socialRow}>
                        <Button
                            mode="outlined"
                            icon="google"
                            compact
                            style={[styles.socialButton, { borderColor: theme.colors.outlineVariant }]}
                            labelStyle={[styles.socialLabel, { color: theme.colors.onSurface }]}
                            onPress={() => console.log("google login")}
                        >
                            Google
                        </Button>

                        <Button
                            mode="outlined"
                            icon="apple"
                            compact
                            style={[styles.socialButton, { borderColor: theme.colors.outlineVariant }]}
                            labelStyle={[styles.socialLabel, { color: theme.colors.onSurface }]}
                            onPress={() => console.log("apple login")}
                        >
                            Apple
                        </Button>
                    </View>

                    <Button mode="text" compact>
                        Saltar por ahora
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
}

