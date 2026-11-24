import { useMemo, useState } from "react";
import { Keyboard, Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button } from "../../components/Button";
import { Field } from "../../components/Field";
import { Notice } from "../../components/Notice";
import { PageHeader } from "../../components/PageHeader";
import { ProductPicker } from "../../components/ProductPicker";
import { Screen } from "../../components/Screen";
import { useStock } from "../../context/StockContext";
import { parseQuantity, searchKey } from "../../domain/stock";
import { colors, money } from "../../global/theme";
import { styles } from "./styles";
export default function WithdrawPage() {
  const { products, withdraw, saving } = useStock();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [feedback, setFeedback] = useState<{
    message: string;
    tone: "success" | "error";
  } | null>(null);
  const filtered = useMemo(
    () =>
      products
        .filter((p) => searchKey(p.name).includes(searchKey(query.trim())))
        .sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),
    [products, query],
  );
  const selected = products.find((p) => p.id === selectedId);
  const parsed = parseQuantity(quantity);
  const preview =
    selected && parsed !== null && parsed > 0 && parsed <= selected.quantity
      ? selected.quantity - parsed
      : null;
  function adjust(delta: number) {
    setQuantity(String(Math.max(1, Math.min(999999, (parsed ?? 0) + delta))));
    setFeedback(null);
  }
  async function submit() {
    setFeedback(null);
    if (!selected) {
      setFeedback({
        message: "Selecione um produto para registrar a baixa.",
        tone: "error",
      });
      return;
    }
    try {
      await withdraw(selected.id, quantity);
      setFeedback({
        message: `Baixa registrada: ${quantity} unidade(s) de ${selected.name}. Saldo: ${selected.quantity - Number(quantity)}.`,
        tone: "success",
      });
      setQuantity("");
      Keyboard.dismiss();
    } catch (error) {
      setFeedback({
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível registrar.",
        tone: "error",
      });
    }
  }
  return (
    <Screen>
      <PageHeader
        eyebrow="03 / Movimentação"
        title="Ordem de saída"
        description="Localize a referência e informe a quantidade a retirar."
      />
      {!products.length ? (
        <View style={styles.empty}>
          <MaterialCommunityIcons
            name="package-variant"
            size={38}
            color={colors.primary}
          />
          <Text style={styles.emptyTitle}>Sem produtos para movimentar</Text>
          <Text style={styles.emptyText}>
            Faça o primeiro cadastro para liberar a baixa de estoque.
          </Text>
          <Button title="Ir para cadastro" onPress={() => router.push("/")} />
        </View>
      ) : (
        <>
          <View style={styles.selectPanel}>
            <Text style={styles.panelLabel}>A / LOCALIZAR REFERÊNCIA</Text>
            <Field
              label="Buscar produto para saída"
              placeholder="Nome do produto"
              value={query}
              onChangeText={(v) => {
                setQuery(v);
                setSelectedId("");
                setQuantity("");
                setFeedback(null);
              }}
              editable={!saving}
            />
            <ProductPicker
              products={filtered}
              selected={selected}
              onSelect={(id) => {
                setSelectedId(id);
                setQuantity("1");
                setFeedback(null);
              }}
              disabled={saving || !filtered.length}
            />
            {!filtered.length && (
              <Notice message="Nenhum produto encontrado. Altere a busca." />
            )}
          </View>
          <View style={styles.operation}>
            <Text style={styles.panelLabel}>B / QUANTIDADE E CONFERÊNCIA</Text>
            <View style={styles.stockLine}>
              <Text style={styles.stockLabel}>Saldo atual</Text>
              <Text style={styles.stockValue}>
                {selected ? `${selected.quantity} un.` : "—"}
              </Text>
            </View>
            <View style={styles.quantityRow}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Diminuir quantidade"
                disabled={saving || !selected}
                style={styles.adjust}
                onPress={() => adjust(-1)}
              >
                <Text style={styles.adjustText}>−</Text>
              </Pressable>
              <View style={styles.quantityField}>
                <Field
                  label="Quantidade de saída"
                  placeholder="0"
                  value={quantity}
                  onChangeText={(v) => {
                    setQuantity(v);
                    setFeedback(null);
                  }}
                  keyboardType="number-pad"
                  maxLength={6}
                  editable={!saving && !!selected}
                />
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Aumentar quantidade"
                disabled={saving || !selected}
                style={styles.adjust}
                onPress={() => adjust(1)}
              >
                <Text style={styles.adjustText}>+</Text>
              </Pressable>
            </View>
            <View style={styles.after}>
              <View style={styles.afterCopy}>
                <Text style={styles.afterLabel}>SALDO PROJETADO</Text>
                <Text style={styles.afterHint}>Após confirmar esta saída</Text>
              </View>
              <Text style={styles.afterValue}>
                {preview === null ? "—" : preview}
              </Text>
            </View>
            <Text style={styles.price}>
              Valor unitário: {selected ? money(selected.priceCents) : "—"}
            </Text>
            {feedback && <Notice {...feedback} />}
            <Button
              title="Confirmar baixa"
              icon="check"
              onPress={() => void submit()}
              loading={saving}
              disabled={!selected}
            />
          </View>
          <Text style={styles.footer}>O SALDO SÓ MUDA APÓS A CONFIRMAÇÃO.</Text>
        </>
      )}
    </Screen>
  );
}
