import { useCallback, useMemo, useState } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { Portal, useTheme } from "react-native-paper";
import { router } from "expo-router";
import CustomerCardApp from "@/components/customers/CustomerCardApp/CustomerCardApp";
import { SearchInputApp } from "@/components/SearchInputApp";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomersQuery } from "@/hooks/queries/useCustomersQuery";
import LoadingDataIndicatorApp from "@/components/LoadingDataIndicatorApp";
import ErrorMessageApp from "@/components/ErrorMessageApp";
import { FloatingFabApp } from "@/components/FloatingFabApp";

export default function CustomersScreen() {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [search, setSearch] = useState("");
  const {
    data: customers = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useCustomersQuery();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        (c.email?.toLowerCase().includes(term) ?? false) ||
        (c.phone?.toLowerCase().includes(term) ?? false),
    );
  }, [customers, search]);

  if (isLoading) {
    return <LoadingDataIndicatorApp message="Cargando clientes..." />;
  }

  if (isError) {
    const message =
      error instanceof Error
        ? error.message
        : "No se pudieron cargar los clientes.";
    return <ErrorMessageApp errorMessage={message} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <View
        style={[styles.header, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.topBar}>
          <SearchInputApp
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar clientes..."
            style={[
              styles.searchInput,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          />
        </View>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CustomerCardApp customer={item} />}
        contentContainerStyle={[
          styles.listContent,
          { backgroundColor: theme.colors.background },
        ]}
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
      />
      {isFocused && (
        <Portal>
          <FloatingFabApp
            icon="plus"
            onPress={() => router.push("/customers/new")}
            accessibilityLabel="Crear cliente"
          />
        </Portal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 32,
    paddingHorizontal: 16,
  },

  searchInput: {
    height: 45,
    fontSize: 14,
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  topBar: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
