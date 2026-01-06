import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { TextInput, useTheme } from "react-native-paper";

interface SearchInputAppProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    style?: StyleProp<TextStyle>;
}

export function SearchInputApp({
    value,
    onChangeText,
    placeholder = "Buscar...",
    style,
}: SearchInputAppProps) {
    const theme = useTheme();

    return (
        <TextInput
            mode="flat"
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={style}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            left={<TextInput.Icon icon="magnify" color={theme.colors.onSurfaceVariant} size={20} />}
            right={
                value.length > 0 ? (
                    <TextInput.Icon
                        icon="close-circle"
                        color={theme.colors.onSurfaceVariant}
                        size={20}
                        onPress={() => onChangeText("")}
                    />
                ) : null
            }
            placeholderTextColor={theme.colors.onSurfaceVariant}
        />
    );
}