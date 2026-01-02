import React, { useState } from "react";
import { Platform, Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDateForDisplay, toDate } from "../services/utils";


type DateFieldProps = {
    labelWhenEmpty: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
};

export function DateInputFieldApp({ labelWhenEmpty, value, onChange }: DateFieldProps) {
    const [showPicker, setShowPicker] = useState(false);

    // WEB: usamos input type="date"
    if (Platform.OS === "web") {
        return (
            <View style={dfStyles.webWrapper}>
                <TextInput
                    value={toDate(value)}
                    onChangeText={(text) => {
                        // text viene como "YYYY-MM-DD" o ""
                        if (!text) return onChange(null);
                        const ms = Date.parse(text);
                        if (!Number.isFinite(ms)) return;
                        onChange(new Date(ms));
                    }}
                    placeholder={labelWhenEmpty}
                    style={dfStyles.webInput}
                    // react-native-web lo pasa al <input>; TS puede que no lo tenga tipado:
                    {...({ type: "date" } as any)}
                />
            </View>
        );
    }

    // NATIVO: pressable + DateTimePicker
    return (
        <View>
            <Pressable style={dfStyles.nativeField} onPress={() => setShowPicker(true)}>
                <Text style={dfStyles.nativeText}>
                    {value ? formatDateForDisplay(value) : labelWhenEmpty}
                </Text>
            </Pressable>

            {showPicker && (
                <DateTimePicker
                    value={value ?? new Date()}
                    mode="date"
                    display="default"
                    onChange={(_, selectedDate) => {
                        setShowPicker(false);
                        if (selectedDate) onChange(selectedDate);
                    }}
                />
            )}
        </View>
    );
}

const dfStyles = StyleSheet.create({
    nativeField: {
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 10,
        padding: 12,
        justifyContent: "center",
    },
    nativeText: { color: "#111" },

    webWrapper: { flex: 1 },
    webInput: {
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 10,
        padding: 12,
    },
});
