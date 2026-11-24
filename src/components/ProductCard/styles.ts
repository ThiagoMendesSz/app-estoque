import { StyleSheet } from "react-native";
import { colors, monoFont } from "../../global/theme";
export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 15,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  identity: { flex: 1, gap: 8 },
  name: { color: colors.ink, fontSize: 15, fontWeight: "700", lineHeight: 22 },
  price: { fontSize: 11, color: colors.muted },
  status: { fontFamily: monoFont, fontSize: 9, color: colors.primary },
  low: { color: colors.warning },
  empty: { color: colors.danger },
  balance: { alignItems: "flex-end", gap: 5, maxWidth: "42%" },
  quantity: {
    fontFamily: monoFont,
    fontSize: 27,
    fontWeight: "700",
    color: colors.ink,
  },
  units: {
    fontFamily: monoFont,
    fontSize: 7,
    color: colors.muted,
    letterSpacing: 1,
  },
  subtotal: { fontFamily: monoFont, fontSize: 10, color: colors.muted },
});
