import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ComponentRef,
  type PropsWithChildren,
} from "react";
import {
  Keyboard,
  Platform,
  View,
  type ScrollView,
  type TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

type InputInstance = ComponentRef<typeof TextInput>;
type ScrollResponder = ReturnType<
  ComponentRef<typeof ScrollView>["getScrollResponder"]
>;
interface FocusActions {
  focus: (input: InputInstance | null) => void;
  blur: (input: InputInstance | null) => void;
}
interface KeyboardFocusProps extends PropsWithChildren {
  getScrollResponder?: () => ScrollResponder | null | undefined;
}
const FocusContext = createContext<FocusActions | null>(null);

// O mesmo comportamento atende formulários em ScrollView e buscas em FlatList.
export function KeyboardFocus({
  children,
  getScrollResponder,
}: KeyboardFocusProps) {
  const input = useRef<InputInstance | null>(null);
  const frame = useRef<number | null>(null);
  const { top } = useSafeAreaInsets();
  const reveal = useCallback(() => {
    if (Platform.OS === "web" || !Keyboard.isVisible() || !getScrollResponder)
      return;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      if (input.current?.isFocused()) {
        // Compensa a área segura superior e deixa uma folga acima do teclado.
        getScrollResponder()?.scrollResponderScrollNativeHandleToKeyboard(
          input.current,
          top + 24,
          true,
        );
      }
    });
  }, [getScrollResponder, top]);

  useEffect(() => {
    const shown = Keyboard.addListener("keyboardDidShow", reveal);
    const changed = Keyboard.addListener("keyboardDidChangeFrame", reveal);
    return () => {
      shown.remove();
      changed.remove();
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [reveal]);

  const actions = useMemo<FocusActions>(
    () => ({
      focus: (target) => {
        input.current = target;
        reveal();
      },
      blur: (target) => {
        if (input.current === target) input.current = null;
      },
    }),
    [reveal],
  );

  return (
    <FocusContext.Provider value={actions}>
      <View style={styles.container} onLayout={reveal}>
        {children}
      </View>
    </FocusContext.Provider>
  );
}

export const useKeyboardFocus = () => useContext(FocusContext);
