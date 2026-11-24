import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../global/theme";
import { styles } from "./styles";
export function BrandMark({ large = false }: { large?: boolean }) {
  return (
    <View style={[styles.mark, large && styles.large]}>
      <MaterialCommunityIcons
        name="layers-triple"
        color={colors.accent}
        size={large ? 38 : 25}
      />
    </View>
  );
}
