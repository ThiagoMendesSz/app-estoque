import {
  useCallback,
  useRef,
  type ComponentRef,
  type PropsWithChildren,
} from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { styles } from "./styles";
import { KeyboardFocus } from "../KeyboardFocus";
interface ScreenProps extends PropsWithChildren {
  scroll?: boolean;
  includeBottomInset?: boolean;
}
export function Screen({
  children,
  scroll = true,
  includeBottomInset = false,
}: ScreenProps) {
  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);
  const insets = useSafeAreaInsets();
  const getScrollResponder = useCallback(
    () => scrollRef.current?.getScrollResponder(),
    [],
  );
  return (
    <SafeAreaView
      style={styles.safe}
      edges={
        includeBottomInset
          ? ["top", "left", "right", "bottom"]
          : ["top", "left", "right"]
      }
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={insets.top}
        enabled={Platform.OS !== "web"}
      >
        {scroll ? (
          <KeyboardFocus getScrollResponder={getScrollResponder}>
            <ScrollView
              ref={scrollRef}
              contentContainerStyle={styles.content}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </KeyboardFocus>
        ) : (
          <View style={styles.listContent}>{children}</View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
