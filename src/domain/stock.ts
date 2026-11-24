export interface Product {
  id: string;
  name: string;
  priceCents: number;
  quantity: number;
}

export interface ProductInput {
  name: string;
  price: string;
  quantity: string;
}

export type FieldErrors = Partial<Record<keyof ProductInput, string>>;
export type StockStatus = "available" | "low" | "empty";
export const LOW_STOCK_LIMIT = 5;

export function parseQuantity(value: string): number | null {
  if (!/^\d+$/.test(value.trim())) return null;
  const quantity = Number(value.trim());
  return Number.isSafeInteger(quantity) && quantity <= 999999 ? quantity : null;
}

export function parsePrice(value: string): number | null {
  const normalized = value.trim();
  if (!/^\d+(?:[,.]\d{1,2})?$/.test(normalized)) return null;
  const cents = Math.round(Number(normalized.replace(",", ".")) * 100);
  return Number.isSafeInteger(cents) && cents > 0 && cents <= 99999999
    ? cents
    : null;
}

export function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

export function searchKey(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

export function validateProduct(input: ProductInput): FieldErrors {
  const errors: FieldErrors = {};
  const name = normalizeName(input.name);
  if (name.length < 2 || name.length > 80)
    errors.name = "Use entre 2 e 80 caracteres.";
  if (parsePrice(input.price) === null)
    errors.price = "Informe um preço de R$ 0,01 a R$ 999.999,99, sem milhar.";
  if (parseQuantity(input.quantity) === null)
    errors.quantity = "Informe um número inteiro de 0 a 999999.";
  return errors;
}

export function createProduct(
  products: Product[],
  input: ProductInput,
  id: string,
): Product[] {
  if (Object.keys(validateProduct(input)).length)
    throw new Error("Revise os campos do produto.");
  const name = normalizeName(input.name);
  if (products.some((product) => searchKey(product.name) === searchKey(name))) {
    throw new Error("Já existe um produto com esse nome.");
  }
  return [
    ...products,
    {
      id,
      name,
      priceCents: parsePrice(input.price)!,
      quantity: parseQuantity(input.quantity)!,
    },
  ];
}

export function withdrawProduct(
  products: Product[],
  id: string,
  rawQuantity: string,
): Product[] {
  const quantity = parseQuantity(rawQuantity);
  if (quantity === null || quantity < 1)
    throw new Error("Informe uma quantidade inteira maior que zero.");
  const product = products.find((item) => item.id === id);
  if (!product) throw new Error("Selecione um produto válido.");
  if (quantity > product.quantity)
    throw new Error(
      `Saldo insuficiente. Disponível: ${product.quantity} unidade(s).`,
    );
  return products.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity - quantity } : item,
  );
}

export function stockStatus(quantity: number): StockStatus {
  return quantity === 0
    ? "empty"
    : quantity <= LOW_STOCK_LIMIT
      ? "low"
      : "available";
}

export function decodeProducts(raw: string | null): Product[] {
  if (raw === null) return [];
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed))
    throw new Error("Formato de inventário inválido.");
  const ids = new Set<string>();
  const names = new Set<string>();
  for (const item of parsed) {
    if (
      typeof item !== "object" ||
      item === null ||
      typeof item.id !== "string" ||
      !item.id ||
      ids.has(item.id) ||
      typeof item.name !== "string" ||
      normalizeName(item.name).length < 2 ||
      item.name.length > 80 ||
      names.has(searchKey(normalizeName(item.name))) ||
      !Number.isSafeInteger(item.priceCents) ||
      item.priceCents <= 0 ||
      item.priceCents > 99999999 ||
      !Number.isSafeInteger(item.quantity) ||
      item.quantity < 0 ||
      item.quantity > 999999
    ) {
      throw new Error("O inventário salvo contém dados inválidos.");
    }
    ids.add(item.id);
    names.add(searchKey(normalizeName(item.name)));
  }
  return parsed as Product[];
}
