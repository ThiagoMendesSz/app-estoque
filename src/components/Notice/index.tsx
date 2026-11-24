import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../global/theme";
import { styles } from "./styles";
interface NoticeProps {
  message: string;
  tone?: "success" | "error" | "info";
}
export function Notice({ message, tone = "info" }: NoticeProps) {
  return (
    <View
      style={[styles.box, tone === "error" && styles.errorBox]}
      accessibilityRole={tone === "error" ? "alert" : undefined}
      accessibilityLiveRegion="polite"
    >
      <Feather
        name={
          tone === "error"
            ? "alert-circle"
            : tone === "success"
              ? "check-circle"
              : "info"
        }
        size={21}
        color={tone === "error" ? colors.danger : colors.primary}
      />
      <Text style={[styles.text, tone === "error" && styles.errorText]}>
        {message}
      </Text>
    </View>
  );
}
