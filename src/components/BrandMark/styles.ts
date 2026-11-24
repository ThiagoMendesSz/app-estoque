import { StyleSheet } from "react-native";
import { colors } from "../../global/theme";
export const styles = StyleSheet.create({
  mark: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  large: { width: 66, height: 66, borderRadius: 6 },
});
