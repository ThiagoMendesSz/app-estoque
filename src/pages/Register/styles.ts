import { StyleSheet } from "react-native";
import { colors, monoFont } from "../../global/theme";
export const styles = StyleSheet.create({
  steps: { flexDirection: "row", gap: 8 },
  step: {
    flex: 1,
    paddingVertical: 13,
    borderBottomWidth: 3,
    borderBottomColor: colors.border,
  },
  activeStep: { borderBottomColor: colors.primary },
  stepText: { fontFamily: monoFont, fontSize: 9, color: colors.muted },
  activeText: { color: colors.primary, fontWeight: "700" },
  sheet: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    padding: 21,
    borderRadius: 6,
    gap: 22,
  },
  sheetLabel: {
    fontFamily: monoFont,
    fontSize: 9,
    color: colors.muted,
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: colors.ink,
    lineHeight: 29,
  },
  note: { color: colors.muted, fontSize: 12, lineHeight: 20 },
  productName: {
    color: colors.primary,
    fontSize: 23,
    lineHeight: 30,
    fontWeight: "700",
  },
  total: {
    backgroundColor: colors.background,
    padding: 17,
    gap: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  totalLabel: { fontFamily: monoFont, fontSize: 8, color: colors.muted },
  totalValue: {
    fontFamily: monoFont,
    fontSize: 25,
    fontWeight: "700",
    color: colors.primaryDark,
  },
  footer: {
    fontFamily: monoFont,
    fontSize: 8,
    color: colors.muted,
    textAlign: "center",
  },
});
