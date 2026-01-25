import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Portal, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { TextInputApp } from "@/components/TextInputApp";
import { FloatingFabApp } from "@/components/FloatingFabApp";
import { CustomerSelectField } from "@/components/customers/CustomerSelectField/CustomerSelectField";
import { getOrderFormStyles } from "@/styles/orderForm.styles";
import { ORDER_STATUS_META } from "@/utils/constants";
import { formatDateForDisplay } from "@/utils/dateUtils";
import { useOrdersQuery } from "@/hooks/queries/useOrdersQuery";

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
    orderId?: string;
};

export function OrderFormScreen({ mode, orderId }: OrderFormScreenProps) {
    const theme = useTheme();
    const styles = useMemo(() => getOrderFormStyles(theme), [theme]);
    const router = useRouter();
    const isEditMode = mode === "edit";
    const orderIdNumber = orderId ? Number(orderId) : undefined;
    const hasOrderId = Boolean(orderIdNumber && Number.isFinite(orderIdNumber));
    const { data: orders = [], isLoading: isOrdersLoading } = useOrdersQuery(
        isEditMode && hasOrderId
    );
    const order = useMemo(
        () =>
            isEditMode && hasOrderId
                ? orders.find((item) => item.id === orderIdNumber)
                : undefined,
        [hasOrderId, isEditMode, orderIdNumber, orders]
    );
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
    const [isCustomerPickerOpen, setIsCustomerPickerOpen] = useState(false);
    const statusLabel = order ? ORDER_STATUS_META[order.status]?.label ?? order.status : "Seleccionar";
    const startDate = order?.startDate ? formatDateForDisplay(order.startDate) : "";
    const endDate = order?.endDate ? formatDateForDisplay(order.endDate) : "";
    const [notes, setNotes] = useState("");
    const [lines, setLines] = useState<OrderLineForm[]>([]);
    const title = mode === "edit" ? "Editar Pedido" : "Nuevo Pedido";

    useEffect(() => {
        if (!isEditMode || !order) return;
        setSelectedCustomerId(order.customerId ?? null);
        setNotes(order.notes ?? "");
    }, [isEditMode, order]);

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

                <CustomerSelectField
                    visible={isCustomerPickerOpen}
                    isFieldLoading={isOrdersLoading && isEditMode}
                    selectedCustomerId={selectedCustomerId}
                    onClose={() => setIsCustomerPickerOpen(false)}
                    onOpen={() => setIsCustomerPickerOpen(true)}
                    onSelect={({ id }) => {
                        setSelectedCustomerId(id);
                    }}
                />

                <View style={styles.dateRow}>
                    <View style={styles.dateColumn}>
                        <Text style={styles.sectionLabel}>Fecha de Inicio</Text>
                        <Pressable style={styles.dateField} onPress={() => { }}>
                            <MaterialCommunityIcons
                                name="calendar-blank"
                                size={16}
                                color={theme.colors.onSurfaceVariant}
                            />
                            <Text style={styles.dateText}>{startDate || "Seleccionar"}</Text>
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
                            <Text style={styles.dateText}>{endDate || "Seleccionar"}</Text>
                        </Pressable>
                    </View>
                </View>

                <View>
                    <Text style={styles.sectionLabel}>Estado</Text>
                    <Pressable style={styles.selectField} onPress={() => { }}>
                        <Text style={styles.selectText}>{statusLabel}</Text>
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
