import { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../../components/Button";
import { Field } from "../../components/Field";
import { Notice } from "../../components/Notice";
import { PageHeader } from "../../components/PageHeader";
import { ProductCard } from "../../components/ProductCard";
import { Screen } from "../../components/Screen";
import { KeyboardFocus } from "../../components/KeyboardFocus";
import { useStock } from "../../context/StockContext";
import { searchKey, LOW_STOCK_LIMIT, type Product } from "../../domain/stock";
import { money } from "../../global/theme";
import { styles } from "./styles";
type Filter = "all" | "low" | "empty";
const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "low", label: "Estoque baixo" },
  { key: "empty", label: "Zerados" },
];
export default function InventoryPage() {
  const { products } = useStock();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const listRef = useRef<FlatList<Product>>(null);
  const getScrollResponder = useCallback(
    () => listRef.current?.getScrollResponder(),
    [],
  );
  const totals = useMemo(
    () =>
      products.reduce(
        (t, p) => ({
          units: t.units + p.quantity,
          value: t.value + p.priceCents * p.quantity,
          attention: t.attention + (p.quantity <= LOW_STOCK_LIMIT ? 1 : 0),
        }),
        { units: 0, value: 0, attention: 0 },
      ),
    [products],
  );
  const filtered = useMemo(
    () =>
      products
        .filter(
          (p) =>
            searchKey(p.name).includes(searchKey(query.trim())) &&
            (filter === "all" ||
              (filter === "empty"
                ? p.quantity === 0
                : p.quantity > 0 && p.quantity <= LOW_STOCK_LIMIT)),
        )
        .sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),
    [products, query, filter],
  );
  return (
    <Screen scroll={false}>
      <KeyboardFocus getScrollResponder={getScrollResponder}>
        <FlatList
          ref={listRef}
          data={filtered}
          keyExtractor={(p) => p.id}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.header}>
              <PageHeader
                eyebrow="02 / Inventário"
                title="Posição do estoque"
                description="Acompanhe o saldo e o valor de cada produto."
              />
              <View style={styles.summary}>
                <Text style={styles.summaryLabel}>CAPITAL EM PRODUTOS</Text>
                <Text style={styles.summaryValue}>{money(totals.value)}</Text>
                <View style={styles.metrics}>
                  <View style={styles.metric}>
                    <Text style={styles.metricNumber}>{products.length}</Text>
                    <Text style={styles.metricLabel}>REFERÊNCIAS</Text>
                  </View>
                  <View style={styles.metric}>
                    <Text style={styles.metricNumber}>{totals.units}</Text>
                    <Text style={styles.metricLabel}>UNIDADES</Text>
                  </View>
                  <View style={styles.metric}>
                    <Text style={styles.metricNumber}>{totals.attention}</Text>
                    <Text style={styles.metricLabel}>EM ALERTA</Text>
                  </View>
                </View>
              </View>
              <View style={styles.actions}>
                <Text style={styles.actionText}>Precisa incluir um item?</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Novo cadastro"
                  onPress={() => router.push("/")}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionLabel}>+ NOVO CADASTRO</Text>
                </Pressable>
              </View>
              <Field
                label="Localizar produto"
                placeholder="Busque pelo nome"
                value={query}
                onChangeText={setQuery}
              />
              <View style={styles.filters}>
                {filters.map((f) => (
                  <Pressable
                    key={f.key}
                    accessibilityRole="button"
                    accessibilityState={{ selected: filter === f.key }}
                    style={[styles.filter, filter === f.key && styles.selected]}
                    onPress={() => setFilter(f.key)}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        filter === f.key && styles.selectedText,
                      ]}
                    >
                      {f.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {totals.attention > 0 && (
                <Notice
                  message={`${totals.attention} produto(s) com até ${LOW_STOCK_LIMIT} unidades, incluindo zerados.`}
                />
              )}
              <View style={styles.tableHead}>
                <Text style={styles.tableLabel}>PRODUTO / SITUAÇÃO</Text>
                <Text style={styles.tableLabel}>SALDO / TOTAL</Text>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>
                {products.length
                  ? "Nenhuma correspondência"
                  : "Inventário sem registros"}
              </Text>
              <Text style={styles.emptyText}>
                {products.length
                  ? "Altere a busca ou o filtro."
                  : "Comece pelo cadastro de um produto para montar sua posição de estoque."}
              </Text>
              {!products.length && (
                <Button
                  title="Cadastrar primeiro produto"
                  onPress={() => router.push("/")}
                  icon="plus"
                />
              )}
            </View>
          }
        />
      </KeyboardFocus>
    </Screen>
  );
}
