import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";
import { StockProvider } from "../context/StockContext";
import { RootNavigator } from "../routes/RootNavigator";
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StockProvider>
          <StatusBar style="dark" />
          <RootNavigator />
        </StockProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
