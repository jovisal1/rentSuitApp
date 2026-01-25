import React from "react";
import { useLocalSearchParams } from "expo-router";
import { OrderFormScreen } from "@/components/orders/OrderFormScreen";

export default function OrderEditScreen() {
    const { orderId } = useLocalSearchParams<{ orderId?: string }>();
    const mode = orderId === "new" ? "create" : "edit";
    return <OrderFormScreen mode={mode} orderId={orderId} />;
}
