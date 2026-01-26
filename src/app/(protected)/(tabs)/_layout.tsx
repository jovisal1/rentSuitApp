import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { useUserStore } from "@/stores/user.store";
import { useState } from "react";

export default function TabsLayout() {
  const theme = useTheme();
  const { role } = useUserStore();
  const isAdmin = role != null && role.name == "ADMIN";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        headerStyle: { height: 0 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="monitor-dashboard"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Pedidos",
          href: isAdmin ? "/orders" : null,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="package-variant"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="customers"
        options={{
          title: "Clientes",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
