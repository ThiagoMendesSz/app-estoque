import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import {
  createProduct,
  decodeProducts,
  withdrawProduct,
  type Product,
  type ProductInput,
} from "../domain/stock";

const STORAGE_KEY = "@lastro/products/v1";

interface StockContextValue {
  products: Product[];
  loading: boolean;
  saving: boolean;
  error: string | null;
  reload: () => Promise<void>;
  addProduct: (input: ProductInput) => Promise<void>;
  withdraw: (id: string, quantity: string) => Promise<void>;
}

const StockContext = createContext<StockContextValue | undefined>(undefined);

export function StockProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const current = useRef<Product[]>([]);
  const busy = useRef(false);
  const ready = useRef(false);
  const sequence = useRef(0);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    ready.current = false;
    try {
      const restored = decodeProducts(await AsyncStorage.getItem(STORAGE_KEY));
      current.current = restored;
      setProducts(restored);
      ready.current = true;
    } catch {
      setError(
        "Não foi possível abrir o estoque salvo. Seus dados foram preservados. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  async function commit(change: (items: Product[]) => Product[]) {
    if (!ready.current) throw new Error("Aguarde o carregamento do estoque.");
    if (busy.current) throw new Error("Aguarde a operação anterior terminar.");
    busy.current = true;
    setSaving(true);
    try {
      const next = change(current.current);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        throw new Error(
          "Não foi possível salvar no aparelho. Tente novamente.",
        );
      }
      current.current = next;
      setProducts(next);
    } finally {
      busy.current = false;
      setSaving(false);
    }
  }

  async function addProduct(input: ProductInput) {
    sequence.current += 1;
    const id = `${Date.now()}-${sequence.current}`;
    await commit((items) => createProduct(items, input, id));
  }

  async function withdraw(id: string, quantity: string) {
    await commit((items) => withdrawProduct(items, id, quantity));
  }

  return (
    <StockContext.Provider
      value={{ products, loading, saving, error, reload, addProduct, withdraw }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStock(): StockContextValue {
  const value = useContext(StockContext);
  if (!value) throw new Error("useStock precisa de StockProvider.");
  return value;
}
