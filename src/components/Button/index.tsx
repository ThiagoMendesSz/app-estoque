import { ActivityIndicator, Pressable, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { colors } from "../../global/theme";
import { styles } from "./styles";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  secondary?: boolean;
  icon?: ComponentProps<typeof Feather>["name"];
}

export function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  secondary = false,
  icon,
}: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.secondary,
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={secondary ? colors.primary : colors.white} />
      ) : (
        <>
          <Text style={[styles.label, secondary && styles.secondaryLabel]}>
            {title}
          </Text>
          {icon && (
            <Feather
              name={icon}
              size={18}
              color={secondary ? colors.primary : colors.white}
            />
          )}
        </>
      )}
    </Pressable>
  );
}
