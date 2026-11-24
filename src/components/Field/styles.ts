import { StyleSheet } from "react-native";
import { colors, fontFamily } from "../../global/theme";
export const styles = StyleSheet.create({
  field: { gap: 9 },
  label: { color: colors.ink, fontFamily, fontSize: 12, fontWeight: "600" },
  inputWrap: {
    minHeight: 53,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.white,
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 15,
    fontFamily,
    fontSize: 15,
    color: colors.ink,
    borderWidth: 0,
    outlineWidth: 0,
    outlineColor: "transparent",
  },
  focused: { borderColor: colors.primary },
  invalid: { borderColor: colors.danger },
  prefix: { color: colors.muted, fontFamily, fontWeight: "600", fontSize: 14 },
  error: { color: colors.danger, fontSize: 12, lineHeight: 18 },
  hint: { color: colors.muted, fontSize: 12, lineHeight: 18 },
});
