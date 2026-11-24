import { useState } from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BrandMark } from "../../components/BrandMark";
import { Button } from "../../components/Button";
import { Field } from "../../components/Field";
import { Notice } from "../../components/Notice";
import { Screen } from "../../components/Screen";
import { DEMO_EMAIL, DEMO_PASSWORD, useAuth } from "../../context/AuthContext";
import { colors } from "../../global/theme";
import { styles } from "./styles";
export default function LoginPage() {
  const router = useRouter();
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [message, setMessage] = useState("");
  async function submit() {
    const next = {
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ? "Informe um e-mail válido."
        : undefined,
      password: !password ? "Informe sua senha." : undefined,
    };
    setErrors(next);
    setMessage("");
    if (next.email || next.password) return;
    try {
      await signIn(email, password);
      router.replace("/");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Não foi possível entrar.",
      );
    }
  }
  return (
    <Screen includeBottomInset>
      <View style={styles.brand}>
        <BrandMark />
        <View>
          <Text style={styles.wordmark}>LASTRO</Text>
          <Text style={styles.caption}>GESTÃO LOCAL / MOBILE</Text>
        </View>
      </View>
      <View style={styles.poster}>
        <Text style={styles.kicker}>PRECISÃO EM CADA UNIDADE</Text>
        <Text style={styles.headline}>Seu estoque.{"\n"}Na medida.</Text>
        <View style={styles.posterBottom}>
          <Text style={styles.posterText}>Cadastre. Confira. Movimente.</Text>
          <MaterialCommunityIcons
            name="barcode"
            size={40}
            color={colors.accent}
          />
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.formHeading}>
          <Text style={styles.number}>01</Text>
          <View style={styles.formHeadingCopy}>
            <Text style={styles.title}>Acesso ao painel</Text>
            <Text style={styles.description}>
              Identifique-se para começar a operar.
            </Text>
          </View>
        </View>
        <Field
          label="E-mail"
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          error={errors.email}
          editable={!loading}
        />
        <Field
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="current-password"
          error={errors.password}
          editable={!loading}
          onSubmitEditing={() => void submit()}
        />
        {!!message && <Notice message={message} tone="error" />}
        <Button
          title="Abrir painel"
          icon="arrow-right"
          loading={loading}
          onPress={() => void submit()}
        />
      </View>
      <View style={styles.demo}>
        <Text style={styles.demoTitle}>AMBIENTE DE DEMONSTRAÇÃO</Text>
        <Text selectable style={styles.demoText}>
          {DEMO_EMAIL} / {DEMO_PASSWORD}
        </Text>
        <Button
          secondary
          title="Preencher acesso demo"
          onPress={() => {
            setEmail(DEMO_EMAIL);
            setPassword(DEMO_PASSWORD);
            setErrors({});
            setMessage("");
          }}
          disabled={loading}
        />
      </View>
      <Text style={styles.footer}>SESSÃO LOCAL · DADOS NO APARELHO</Text>
    </Screen>
  );
}
