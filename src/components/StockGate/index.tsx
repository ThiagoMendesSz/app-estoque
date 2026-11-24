import type { PropsWithChildren } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Button } from "../Button";
import { Notice } from "../Notice";
import { Screen } from "../Screen";
import { useStock } from "../../context/StockContext";
import { colors } from "../../global/theme";
import { styles } from "./styles";
export function StockGate({ children }: PropsWithChildren) {
  const { loading, error, reload } = useStock();
  if (!loading && !error) return children;
  return (
    <Screen>
      <View style={styles.container}>
        {loading ? (
          <>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.label}>Abrindo seu estoque…</Text>
          </>
        ) : (
          <>
            <Notice message={error!} tone="error" />
            <Button title="Tentar novamente" onPress={() => void reload()} />
          </>
        )}
      </View>
    </Screen>
  );
}
