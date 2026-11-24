import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { colors } from "../../global/theme";
import { styles } from "./styles";
import { BrandMark } from "../BrandMark";
interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  const { signOut } = useAuth();
  return (
    <View style={styles.wrapper}>
      <View style={styles.top}>
        <View style={styles.brand}>
          <BrandMark />
          <View>
            <Text style={styles.brandText}>LASTRO</Text>
            <Text style={styles.brandCaption}>CONTROLE DE ESTOQUE</Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Sair da conta"
          onPress={signOut}
          style={styles.logout}
        >
          <MaterialCommunityIcons
            name="exit-to-app"
            size={22}
            color={colors.primary}
          />
        </Pressable>
      </View>
      <View style={styles.section}>
        <View style={styles.line} />
        <Text style={styles.eyebrow}>{eyebrow}</Text>
      </View>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}
