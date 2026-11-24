import { StyleSheet } from "react-native";
import { colors } from "../../global/theme";
export const styles = StyleSheet.create({
  box: {
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    backgroundColor: colors.soft,
    padding: 14,
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  text: { color: colors.primary, fontSize: 12, lineHeight: 20, flex: 1 },
  errorBox: {
    backgroundColor: colors.dangerSoft,
    borderLeftColor: colors.danger,
  },
  errorText: { color: colors.danger },
});
