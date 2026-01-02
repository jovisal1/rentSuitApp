import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { TextInput } from "react-native-paper";

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
    return (
        <TextInput
            mode="flat"
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={style}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            left={<TextInput.Icon icon="magnify" color="#A0A0A0" size={20} />}
            right={
                value.length > 0 ? (
                    <TextInput.Icon
                        icon="close-circle"
                        color="#A0A0A0"
                        size={20}
                        onPress={() => onChangeText("")}
                    />
                ) : null
            }
            placeholderTextColor="#A0A0A0"
        />
    );
}
