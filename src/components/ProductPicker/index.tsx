import { useMemo, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Field } from "../Field";
import { searchKey, type Product } from "../../domain/stock";
import { colors } from "../../global/theme";
import { styles } from "./styles";
import { KeyboardFocus } from "../KeyboardFocus";
interface ProductPickerProps {
  products: Product[];
  selected?: Product;
  onSelect: (id: string) => void;
  disabled?: boolean;
}

export function ProductPicker({
  products,
  selected,
  onSelect,
  disabled,
}: ProductPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      products.filter((item) =>
        searchKey(item.name).includes(searchKey(query.trim())),
      ),
    [products, query],
  );
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Produto para retirada</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Selecionar produto"
        accessibilityState={{ expanded: open, disabled }}
        disabled={disabled}
        onPress={() => {
          Keyboard.dismiss();
          setQuery("");
          setOpen(true);
        }}
        style={styles.trigger}
      >
        <Text style={[styles.triggerText, !selected && styles.placeholder]}>
          {selected?.name ?? "Selecione um produto"}
        </Text>
        <Feather name="chevron-down" size={19} color={colors.primary} />
      </Pressable>
      <Modal
        visible={open}
        animationType="slide"
        onRequestClose={() => setOpen(false)}
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modal}>
          <KeyboardAvoidingView
            style={styles.keyboardArea}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={Platform.OS !== "web"}
          >
            <KeyboardFocus>
              <View style={styles.modalContent}>
                <View style={styles.heading}>
                  <Text accessibilityRole="header" style={styles.title}>
                    Escolha um produto
                  </Text>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Fechar seleção"
                    onPress={() => setOpen(false)}
                    style={styles.close}
                  >
                    <Feather name="x" size={24} color={colors.primary} />
                  </Pressable>
                </View>
                <Field
                  label="Buscar na seleção"
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Nome do produto"
                />
                <FlatList
                  data={filtered}
                  keyExtractor={(item) => item.id}
                  keyboardShouldPersistTaps="handled"
                  keyboardDismissMode="on-drag"
                  renderItem={({ item }) => (
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Escolher ${item.name}`}
                      accessibilityState={{
                        selected: selected?.id === item.id,
                      }}
                      style={[
                        styles.option,
                        selected?.id === item.id && styles.selected,
                      ]}
                      onPress={() => {
                        Keyboard.dismiss();
                        onSelect(item.id);
                        setOpen(false);
                      }}
                    >
                      <View style={styles.optionCopy}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.balance}>
                          {item.quantity} unidade(s) disponíveis
                        </Text>
                      </View>
                      <Feather
                        name={
                          selected?.id === item.id ? "check-circle" : "circle"
                        }
                        size={22}
                        color={colors.primary}
                      />
                    </Pressable>
                  )}
                  ListEmptyComponent={
                    <Text style={styles.empty}>
                      Nenhum produto encontrado. Tente outra busca.
                    </Text>
                  }
                />
              </View>
            </KeyboardFocus>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
