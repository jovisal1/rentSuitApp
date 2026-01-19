import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Portal, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { TextInputApp } from "@/components/TextInputApp";
import { FloatingFabApp } from "@/components/FloatingFabApp";
import { getOrderFormStyles } from "@/styles/orderForm.styles";
import { themeApp } from "@/theme";

type LineSize = {
    id: string;
    label: string;
    quantity: string;
};

type OrderLineForm = {
    id: string;
    productName: string;
    pricePerDay: string;
    days: string;
    sizes: LineSize[];
};

type OrderFormScreenProps = {
    mode: "create" | "edit";
};

const buildInitialLines = (): OrderLineForm[] => [
    {
        id: "line-1",
        productName: "Traje Clasi",
        pricePerDay: "45",
        days: "5",
        sizes: [
            { id: "size-1", label: "M", quantity: "1" },
            { id: "size-2", label: "L", quantity: "1" },
        ],
    },
    {
        id: "line-2",
        productName: "Camisa Blu",
        pricePerDay: "12",
        days: "5",
        sizes: [{ id: "size-3", label: "M", quantity: "2" }],
    },
];

export function OrderFormScreen({ mode }: OrderFormScreenProps) {
    const theme = useTheme();
    const styles = useMemo(() => getOrderFormStyles(theme), [theme]);
    const router = useRouter();
    const customerName = "Ana García López";
    const status = "PREPARADO";
    const startDate = "28 de diciembre de 2025";
    const endDate = "2 de enero de 2026";
    const [notes, setNotes] = useState("Cliente requiere entrega antes de las 10:00");
    const [lines, setLines] = useState<OrderLineForm[]>(() => buildInitialLines());
    const title = mode === "edit" ? "Editar Pedido" : "Nuevo Pedido";

    const handleRemoveLine = (id: string) => {
        setLines((prev) => prev.filter((line) => line.id !== id));
    };

    const handleRemoveSize = (lineId: string, sizeId: string) => {
        setLines((prev) =>
            prev.map((line) =>
                line.id === lineId
                    ? { ...line, sizes: line.sizes.filter((size) => size.id !== sizeId) }
                    : line
            )
        );
    };

    const handleAddLine = () => {
        setLines((prev) => [
            ...prev,
            {
                id: `line-${prev.length + 1}`,
                productName: "Seleccionar",
                pricePerDay: "",
                days: "",
                sizes: [],
            },
        ]);
    };

    const handleAddSize = (lineId: string) => {
        setLines((prev) =>
            prev.map((line) =>
                line.id === lineId
                    ? {
                        ...line,
                        sizes: [
                            ...line.sizes,
                            {
                                id: `size-${line.sizes.length + 1}-${lineId}`,
                                label: "M",
                                quantity: "1",
                            },
                        ],
                    }
                    : line
            )
        );
    };

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <Pressable style={styles.closeButton} onPress={() => router.back()}>
                        <MaterialCommunityIcons
                            name="close"
                            size={18}
                            color={theme.colors.onSurface}
                        />
                    </Pressable>
                </View>

                <View>
                    <Text style={styles.sectionLabel}>Cliente</Text>
                    <Pressable style={styles.selectField} onPress={() => { }}>
                        <Text style={styles.selectText}>{customerName}</Text>
                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={18}
                            color={theme.colors.onSurfaceVariant}
                        />
                    </Pressable>
                </View>

                <View style={styles.dateRow}>
                    <View style={styles.dateColumn}>
                        <Text style={styles.sectionLabel}>Fecha de Inicio</Text>
                        <Pressable style={styles.dateField} onPress={() => { }}>
                            <MaterialCommunityIcons
                                name="calendar-blank"
                                size={16}
                                color={theme.colors.onSurfaceVariant}
                            />
                            <Text style={styles.dateText}>{startDate}</Text>
                        </Pressable>
                    </View>

                    <View style={styles.dateColumn}>
                        <Text style={styles.sectionLabel}>Fecha de Fin</Text>
                        <Pressable style={styles.dateField} onPress={() => { }}>
                            <MaterialCommunityIcons
                                name="calendar-blank"
                                size={16}
                                color={theme.colors.onSurfaceVariant}
                            />
                            <Text style={styles.dateText}>{endDate}</Text>
                        </Pressable>
                    </View>
                </View>

                <View>
                    <Text style={styles.sectionLabel}>Estado</Text>
                    <Pressable style={styles.selectField} onPress={() => { }}>
                        <Text style={styles.selectText}>{status}</Text>
                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={18}
                            color={theme.colors.onSurfaceVariant}
                        />
                    </Pressable>
                </View>

                <View style={styles.productsHeader}>
                    <Text style={styles.sectionLabel}>Productos</Text>
                    <Pressable style={styles.addProductButton} onPress={handleAddLine}>
                        <MaterialCommunityIcons name="plus" size={16} color={theme.colors.surface} />
                        <Text style={styles.addProductText}>Añadir Producto</Text>
                    </Pressable>
                </View>

                {lines.map((line) => (
                    <View key={line.id} style={styles.productCard}>
                        <View style={styles.productRow}>
                            <View style={styles.productColumn}>
                                <Text style={styles.fieldLabel}>Producto</Text>
                                <Pressable style={styles.productSelect} onPress={() => { }}>
                                    <Text style={styles.selectText}>{line.productName}</Text>
                                    <MaterialCommunityIcons
                                        name="chevron-down"
                                        size={16}
                                        color={theme.colors.onSurfaceVariant}
                                    />
                                </Pressable>
                            </View>

                            <View style={styles.priceColumn}>
                                <Text style={styles.fieldLabel}>Precio/día</Text>
                                <TextInputApp
                                    value={line.pricePerDay}
                                    onChangeText={(value) =>
                                        setLines((prev) =>
                                            prev.map((item) =>
                                                item.id === line.id ? { ...item, pricePerDay: value } : item
                                            )
                                        )
                                    }
                                    keyboardType="numeric"
                                    style={styles.inputCompact}
                                />
                            </View>

                            <View style={styles.daysColumn}>
                                <Text style={styles.fieldLabel}>Días</Text>
                                <TextInputApp
                                    value={line.days}
                                    onChangeText={(value) =>
                                        setLines((prev) =>
                                            prev.map((item) =>
                                                item.id === line.id ? { ...item, days: value } : item
                                            )
                                        )
                                    }
                                    keyboardType="numeric"
                                    style={styles.inputCompact}
                                />
                            </View>

                            <Pressable
                                style={styles.deleteButton}
                                onPress={() => handleRemoveLine(line.id)}
                            >
                                <MaterialCommunityIcons
                                    name="trash-can-outline"
                                    size={18}
                                    color={theme.colors.error}
                                />
                            </Pressable>
                        </View>

                        <View style={styles.sizesBlock}>
                            <Text style={styles.sizesLabel}>Tallas</Text>
                            <View style={styles.sizesRow}>
                                {line.sizes.map((size) => (
                                    <View key={size.id} style={styles.sizeChip}>
                                        <Text style={styles.sizeChipText}>{size.label}</Text>
                                        <Text style={styles.sizeChipQty}>{size.quantity}</Text>
                                        <Pressable
                                            onPress={() => handleRemoveSize(line.id, size.id)}
                                        >
                                            <MaterialCommunityIcons
                                                name="close"
                                                size={12}
                                                color={theme.colors.error}
                                            />
                                        </Pressable>
                                    </View>
                                ))}
                                <Pressable
                                    style={styles.addSizeChip}
                                    onPress={() => handleAddSize(line.id)}
                                >
                                    <Text style={styles.sizeChipText}>+ Talla</Text>
                                    <MaterialCommunityIcons
                                        name="chevron-down"
                                        size={14}
                                        color={theme.colors.onSurfaceVariant}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                ))}

                <View>
                    <Text style={styles.sectionLabel}>Notas</Text>
                    <TextInputApp
                        value={notes}
                        onChangeText={setNotes}
                        multiline
                        numberOfLines={4}
                        style={styles.notesInput}
                    />
                </View>
            </ScrollView>

            <Portal>

                <FloatingFabApp
                    icon="close"
                    onPress={() => {
                        router.back();
                    }}
                    size="small"
                    style={{ elevation: 0, marginBottom: 10 }}
                />


                <FloatingFabApp
                    icon={"check"}
                    onPress={() => {

                    }}
                    size="medium"
                />
            </Portal>

        </View>
    );
}
