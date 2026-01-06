import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { View, StyleSheet } from "react-native";
import { Text, HelperText, useTheme } from "react-native-paper";
import { TextInputApp } from "./TextInputApp";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

interface EditableFieldAppProps {
    icon: IconName;
    label: string;
    value: any;
    isEditing: boolean;
    errorText?: string;
    onChangeText: (t: string) => void;
}

export function EditableFieldApp({
    icon,
    label,
    value,
    isEditing,
    onChangeText,
    errorText,
}: EditableFieldAppProps) {
    const theme = useTheme();
    const showError = isEditing && !!errorText;

    return (
        <View style={styles.fieldRow}>
            <View style={[styles.iconCircle, { backgroundColor: theme.colors.surfaceVariant }]}>
                <MaterialCommunityIcons name={icon} size={16} color={theme.colors.primary} />
            </View>

            <View style={styles.content}>
                <Text style={[styles.labelTitle, { color: theme.colors.onSurfaceVariant }]}>{label}</Text>

                {isEditing ? (
                    <>
                        <TextInputApp
                            value={value}
                            onChangeText={onChangeText}
                            mode="flat"
                            dense
                            style={styles.miniInput}
                            error={showError} // importante para el estado visual
                        />
                        <HelperText type="error" visible={showError} style={styles.helper}>
                            {errorText}
                        </HelperText>
                    </>
                ) : (
                    <Text style={[styles.valueText, { color: theme.colors.onSurface }]} numberOfLines={1}>
                        {value || "—"}
                    </Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fieldRow: { flexDirection: "row", alignItems: "flex-start", paddingVertical: 6 },
    iconCircle: {
        width: 28,
        height: 28,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },
    content: { flex: 1, marginLeft: 10 },

    labelTitle: {
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: 0.3,
        marginBottom: -2,
    },
    valueText: { fontSize: 14, fontWeight: "500", paddingVertical: 3 },

    miniInput: { height: 28, backgroundColor: "transparent", fontSize: 14, paddingHorizontal: 0 },

    helper: {
        marginTop: -3,
        paddingHorizontal: 0,
    },
});