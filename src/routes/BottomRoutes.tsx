import { Tabs } from "expo-router/js-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StockGate } from "../components/StockGate";
import { colors } from "../global/theme";
import { styles } from "./styles";
export function BottomRoutes() {
  return (
    <SafeAreaView style={styles.navigator} edges={["bottom"]}>
      <StockGate>
        <Tabs
          safeAreaInsets={{ bottom: 0 }}
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.muted,
            tabBarActiveBackgroundColor: colors.soft,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.label,
            tabBarItemStyle: styles.item,
            tabBarHideOnKeyboard: true,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Cadastrar",
              tabBarAccessibilityLabel: "Cadastrar",
              tabBarIcon: ({ focused, size }) => (
                <MaterialCommunityIcons
                  name="clipboard-plus-outline"
                  size={size}
                  color={focused ? colors.primary : colors.muted}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="saida"
            options={{
              title: "Dar baixa",
              tabBarAccessibilityLabel: "Dar baixa",
              tabBarIcon: ({ focused, size }) => (
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={size}
                  color={focused ? colors.primary : colors.muted}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="inventario"
            options={{
              title: "Inventário",
              tabBarAccessibilityLabel: "Inventário",
              tabBarIcon: ({ focused, size }) => (
                <MaterialCommunityIcons
                  name="view-list-outline"
                  size={size}
                  color={focused ? colors.primary : colors.muted}
                />
              ),
            }}
          />
        </Tabs>
      </StockGate>
    </SafeAreaView>
  );
}
