import { StyleSheet } from "react-native";
import type { MD3Theme } from "react-native-paper";

export const getCustomerInfoStyles = (theme: MD3Theme) =>
    StyleSheet.create({
        container: { flex: 1, backgroundColor: theme.colors.background },
        fixedHeader: {
            backgroundColor: theme.colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.outlineVariant,
            zIndex: 10,
        },

        headerSection: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 15,
            marginBottom: 15,
        },
        headerLeft: {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
        },

        avatarContainer: { position: "relative" },
        statusIndicator: {
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 14,
            height: 14,
            borderRadius: 7,
            borderWidth: 2,
            borderColor: theme.colors.surface,
        },
        infoTextContainer: { marginLeft: 15 },
        userNameText: { fontSize: 17, fontWeight: "700", color: theme.colors.onSurface },
        userSubText: { fontSize: 12, color: theme.colors.onSurfaceVariant },

        segmentedControlWrapper: { paddingHorizontal: 16, marginBottom: 10 },
        segmentedControlBackground: {
            flexDirection: "row",
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: 8,
            padding: 2,
        },
        segmentItem: { flex: 1, paddingVertical: 7, alignItems: "center", borderRadius: 6 },
        segmentItemActive: { backgroundColor: theme.colors.surface, elevation: 1 },
        segmentText: { fontSize: 12, color: theme.colors.onSurfaceVariant },

        scrollArea: { flex: 1 },
        scrollContent: { padding: 12, paddingBottom: 100, flexGrow: 1 },
    });

export const getCustomerCardStyles = (theme: MD3Theme) =>
    StyleSheet.create({
        itemCard: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginBottom: 10,
            backgroundColor: theme.colors.surface,
            shadowColor: theme.colors.shadow,
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            elevation: 2,
        },
        itemLeft: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            flex: 1,
        },
        statusBar: {
            width: 3,
            height: "100%",
            backgroundColor: theme.colors.primary,
            borderRadius: 3,
        },
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 20,
        },
        itemText: {
            flex: 1,
        },
        itemRight: {
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
        },
    });