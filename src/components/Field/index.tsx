import { useRef, useState, type ComponentRef } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../global/theme";
import { styles } from "./styles";
import { useKeyboardFocus } from "../KeyboardFocus";

interface FieldProps extends TextInputProps {
  label: string;
  error?: string;
  hint?: string;
  prefix?: string;
}

export function Field({
  label,
  error,
  hint,
  prefix,
  secureTextEntry,
  ...props
}: FieldProps) {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<ComponentRef<typeof TextInput>>(null);
  const keyboardFocus = useKeyboardFocus();
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputWrap,
          focused && styles.focused,
          !!error && styles.invalid,
        ]}
      >
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          {...props}
          ref={inputRef}
          accessibilityLabel={label}
          placeholderTextColor={colors.muted}
          secureTextEntry={secureTextEntry && !visible}
          style={styles.input}
          onFocus={(event) => {
            setFocused(true);
            keyboardFocus?.focus(inputRef.current);
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            keyboardFocus?.blur(inputRef.current);
            props.onBlur?.(event);
          }}
        />
        {secureTextEntry && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={visible ? "Ocultar senha" : "Mostrar senha"}
            hitSlop={10}
            onPress={() => setVisible(!visible)}
          >
            <Feather
              name={visible ? "eye-off" : "eye"}
              size={21}
              color={colors.muted}
            />
          </Pressable>
        )}
      </View>
      {error ? (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}
