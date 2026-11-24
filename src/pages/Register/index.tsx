import { useState } from "react";
import { Keyboard, Text, View } from "react-native";
import { Button } from "../../components/Button";
import { Field } from "../../components/Field";
import { Notice } from "../../components/Notice";
import { PageHeader } from "../../components/PageHeader";
import { Screen } from "../../components/Screen";
import { useStock } from "../../context/StockContext";
import {
  normalizeName,
  parsePrice,
  parseQuantity,
  validateProduct,
  type FieldErrors,
  type ProductInput,
} from "../../domain/stock";
import { money } from "../../global/theme";
import { styles } from "./styles";
const blank: ProductInput = { name: "", price: "", quantity: "" };
export default function RegisterPage() {
  const { addProduct, saving } = useStock();
  const [input, setInput] = useState<ProductInput>(blank);
  const [step, setStep] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [feedback, setFeedback] = useState<{
    message: string;
    tone: "success" | "error";
  } | null>(null);
  function update(field: keyof ProductInput, value: string) {
    setInput((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setFeedback(null);
  }
  function next() {
    if (
      normalizeName(input.name).length < 2 ||
      normalizeName(input.name).length > 80
    ) {
      setErrors({ name: "Use entre 2 e 80 caracteres." });
      return;
    }
    Keyboard.dismiss();
    setStep(2);
    setErrors({});
    setFeedback(null);
  }
  async function save() {
    const nextErrors = validateProduct(input);
    setErrors(nextErrors);
    setFeedback(null);
    if (Object.keys(nextErrors).length) {
      if (nextErrors.name) setStep(1);
      return;
    }
    try {
      await addProduct(input);
      setInput(blank);
      setStep(1);
      Keyboard.dismiss();
      setFeedback({
        message: "Produto cadastrado. O inventário já está atualizado.",
        tone: "success",
      });
    } catch (error) {
      setFeedback({
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível cadastrar.",
        tone: "error",
      });
    }
  }
  const price = parsePrice(input.price);
  const qty = parseQuantity(input.quantity);
  return (
    <Screen>
      <PageHeader
        eyebrow="01 / Entrada de produto"
        title="Cadastro assistido"
        description="Uma ficha em duas etapas. Primeiro identifique, depois informe os valores."
      />
      <View style={styles.steps}>
        <View style={[styles.step, step === 1 && styles.activeStep]}>
          <Text style={[styles.stepText, step === 1 && styles.activeText]}>
            01 IDENTIFICAÇÃO
          </Text>
        </View>
        <View style={[styles.step, step === 2 && styles.activeStep]}>
          <Text style={[styles.stepText, step === 2 && styles.activeText]}>
            02 VALORES
          </Text>
        </View>
      </View>
      <View style={styles.sheet}>
        <Text style={styles.sheetLabel}>
          FICHA DE PRODUTO / {step === 1 ? "01" : "02"}
        </Text>
        {step === 1 ? (
          <>
            <Text style={styles.sectionTitle}>Qual produto vai entrar?</Text>
            <Field
              label="Nome do produto"
              placeholder="Ex.: Cabo USB-C 1 m"
              value={input.name}
              onChangeText={(v) => update("name", v)}
              maxLength={80}
              error={errors.name}
              editable={!saving}
              onSubmitEditing={next}
            />
            <Text style={styles.note}>
              Use um nome que facilite a busca. Cada produto deve ter uma
              identificação única.
            </Text>
            <Button
              title="Continuar para valores"
              icon="arrow-right"
              onPress={next}
            />
          </>
        ) : (
          <>
            <Text style={styles.productName}>{input.name}</Text>
            <Field
              label="Quantidade inicial"
              placeholder="0"
              value={input.quantity}
              onChangeText={(v) => update("quantity", v)}
              keyboardType="number-pad"
              maxLength={6}
              error={errors.quantity}
              hint="Unidades inteiras. Zero também é permitido."
              editable={!saving}
            />
            <Field
              label="Preço unitário"
              prefix="R$"
              placeholder="0,00"
              value={input.price}
              onChangeText={(v) => update("price", v)}
              keyboardType="decimal-pad"
              maxLength={12}
              error={errors.price}
              editable={!saving}
            />
            <View style={styles.total}>
              <Text style={styles.totalLabel}>VALOR INICIAL DO ESTOQUE</Text>
              <Text style={styles.totalValue}>
                {price !== null && qty !== null ? money(price * qty) : "—"}
              </Text>
            </View>
            <Button
              title="Salvar produto"
              icon="check"
              onPress={() => void save()}
              loading={saving}
            />
            <Button
              secondary
              title="Voltar à identificação"
              onPress={() => {
                setStep(1);
                setFeedback(null);
              }}
              disabled={saving}
            />
          </>
        )}
      </View>
      {feedback && <Notice {...feedback} />}
      <Text style={styles.footer}>CADASTRO LOCAL · ATUALIZAÇÃO IMEDIATA</Text>
    </Screen>
  );
}
