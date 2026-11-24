import { StyleSheet } from "react-native";
import { colors, monoFont } from "../global/theme";
export const styles = StyleSheet.create({
  navigator: { flex: 1, backgroundColor: colors.white },
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: 2,
    borderTopColor: colors.primary,
    height: 78,
    paddingBottom: 12,
    paddingTop: 7,
    elevation: 0,
  },
  label: {
    fontFamily: monoFont,
    fontSize: 9,
    lineHeight: 14,
    fontWeight: "700",
  },
  item: { borderRadius: 4, marginHorizontal: 5, paddingVertical: 4 },
});
