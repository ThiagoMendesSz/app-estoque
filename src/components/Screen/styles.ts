import { StyleSheet } from "react-native";
import { colors } from "../../global/theme";
export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  content: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 620,
    alignSelf: "center",
    padding: 22,
    paddingBottom: 36,
    gap: 22,
  },
  listContent: {
    flex: 1,
    width: "100%",
    maxWidth: 620,
    alignSelf: "center",
    paddingHorizontal: 22,
    paddingTop: 22,
    gap: 18,
  },
});
