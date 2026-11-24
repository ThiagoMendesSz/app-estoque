import test from 'node:test';
import assert from 'node:assert/strict';
import { createProduct, decodeProducts, parsePrice, parseQuantity, searchKey, stockStatus, validateProduct, withdrawProduct } from '../src/domain/stock.ts';

const input = { name: ' Café especial ', price: '29,90', quantity: '10' };

test('cadastro e baixa preservam preço em centavos e não alteram o estado anterior', () => {
  const products = createProduct([], input, '1');
  assert.deepEqual(products[0], { id: '1', name: 'Café especial', priceCents: 2990, quantity: 10 });
  const next = withdrawProduct(products, '1', '6');
  assert.equal(next[0].quantity, 4);
  assert.equal(products[0].quantity, 10);
  assert.equal(stockStatus(next[0].quantity), 'low');
  assert.equal(stockStatus(withdrawProduct(next, '1', '4')[0].quantity), 'empty');
});

test('valida valores monetários e quantidades sem coerção permissiva', () => {
  assert.equal(parsePrice('0,01'), 1);
  assert.equal(parsePrice('12.30'), 1230);
  assert.equal(parseQuantity('0'), 0);
  for (const value of ['', '-1', '0', 'NaN', '1,234', '1.000,00', '1e3', '1000000']) assert.equal(parsePrice(value), null);
  for (const value of ['', '-1', '1.5', '1,5', '1e2', '1000000', 'Infinity']) assert.equal(parseQuantity(value), null);
  assert.equal(Object.keys(validateProduct({ name: '', price: '', quantity: '' })).length, 3);
});

test('impede nomes duplicados desconsiderando acentos, espaços e caixa', () => {
  const products = createProduct([], input, '1');
  assert.throws(() => createProduct(products, { ...input, name: '  CAFE   ESPECIAL ' }, '2'), /Já existe/);
  assert.equal(searchKey('Café'), searchKey('CAFE'));
});

test('impede saldo negativo, quantidade zero e produtos inexistentes', () => {
  const products = createProduct([], input, '1');
  for (const value of ['11', '0', '-2', '1.5', '', '1e2']) assert.throws(() => withdrawProduct(products, '1', value));
  assert.throws(() => withdrawProduct(products, 'outro', '1'), /Selecione/);
  assert.equal(products[0].quantity, 10);
});

test('hidrata os dados salvos e recusa conteúdo corrompido', () => {
  const products = createProduct([], input, '1');
  assert.deepEqual(decodeProducts(JSON.stringify(products)), products);
  assert.deepEqual(decodeProducts(null), []);
  for (const value of ['{', '{}', 'null', '[null]', JSON.stringify([{ ...products[0], quantity: -1 }]), JSON.stringify([products[0], products[0]])]) {
    assert.throws(() => decodeProducts(value));
  }
});

test('limites de estoque incluem cinco unidades no alerta', () => {
  assert.equal(stockStatus(0), 'empty');
  assert.equal(stockStatus(1), 'low');
  assert.equal(stockStatus(5), 'low');
  assert.equal(stockStatus(6), 'available');
});
