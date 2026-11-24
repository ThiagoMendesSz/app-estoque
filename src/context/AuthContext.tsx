import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

export const DEMO_EMAIL = "demo@lastro.app";
export const DEMO_PASSWORD = "Lastro123";

interface AuthContextValue {
  signedIn: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signIn(email: string, password: string) {
    setLoading(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 600));
      if (
        email.trim().toLowerCase() !== DEMO_EMAIL ||
        password !== DEMO_PASSWORD
      ) {
        throw new Error(
          "E-mail ou senha incorretos. Confira o acesso de demonstração.",
        );
      }
      setSignedIn(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{ signedIn, loading, signIn, signOut: () => setSignedIn(false) }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth precisa de AuthProvider.");
  return value;
}
