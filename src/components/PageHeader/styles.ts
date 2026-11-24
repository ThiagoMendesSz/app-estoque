import { StyleSheet } from "react-native";
import { colors, monoFont } from "../../global/theme";
export const styles = StyleSheet.create({
  wrapper: { gap: 9 },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  brand: { flexDirection: "row", gap: 10, alignItems: "center" },
  brandText: {
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 3,
    color: colors.ink,
  },
  brandCaption: {
    fontSize: 7,
    letterSpacing: 1.2,
    color: colors.muted,
    marginTop: 4,
  },
  logout: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
  },
  section: { flexDirection: "row", alignItems: "center", gap: 9 },
  line: { width: 24, height: 3, backgroundColor: colors.primary },
  eyebrow: {
    fontFamily: monoFont,
    fontSize: 10,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    letterSpacing: -1,
    color: colors.ink,
  },
  description: { fontSize: 13, lineHeight: 21, color: colors.muted },
});
