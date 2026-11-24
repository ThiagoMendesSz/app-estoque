import { Platform } from "react-native";
export const fontFamily =
  Platform.OS === "web"
    ? "system-ui"
    : Platform.OS === "ios"
      ? "System"
      : "sans-serif";
export const displayFont = fontFamily;
export const monoFont = Platform.OS === "android" ? "monospace" : "Courier";
export const colors = {
  background: "#F4F1EA",
  surface: "#FFFFFF",
  ink: "#30282C",
  muted: "#756A6D",
  primary: "#731D39",
  primaryDark: "#461025",
  soft: "#EEE3E5",
  accent: "#D4B485",
  border: "#D9D2CE",
  danger: "#A52B35",
  dangerSoft: "#FAE8E6",
  warning: "#805514",
  warningSoft: "#F6EBCF",
  white: "#FFFFFF",
};
export const money = (cents: number): string =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    cents / 100,
  );
