import { StyleSheet } from "react-native";
import { colors, fontFamily } from "../../global/theme";
export const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: 6,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 16,
  },
  label: { color: colors.white, fontFamily, fontSize: 14, fontWeight: "700" },
  secondary: { backgroundColor: colors.soft },
  secondaryLabel: { color: colors.primary },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.8 },
});
