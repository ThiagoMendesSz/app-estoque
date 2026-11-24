import { Text, View } from "react-native";
import { stockStatus, type Product } from "../../domain/stock";
import { money } from "../../global/theme";
import { styles } from "./styles";
const labels = { available: "REGULAR", low: "BAIXO", empty: "ZERADO" };
export function ProductCard({ product }: { product: Product }) {
  const status = stockStatus(product.quantity);
  return (
    <View style={styles.row}>
      <View style={styles.identity}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{money(product.priceCents)} / un.</Text>
        <Text
          style={[
            styles.status,
            status === "low" && styles.low,
            status === "empty" && styles.empty,
          ]}
        >
          ● {labels[status]}
        </Text>
      </View>
      <View style={styles.balance}>
        <Text style={styles.quantity}>{product.quantity}</Text>
        <Text style={styles.units}>UNIDADES</Text>
        <Text style={styles.subtotal}>
          {money(product.quantity * product.priceCents)}
        </Text>
      </View>
    </View>
  );
}
