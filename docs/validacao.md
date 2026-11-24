# Validação do Lastro

Realizada em 24/11/2026, com Node.js 24.21.0 e Expo SDK 58.

## Verificações

- Instalação npm com `npm ci` concluída.
- TypeScript estrito: sem erros.
- Seis testes das regras de estoque aprovados.
- Dependências compatíveis com o mapa local do SDK 58. A consulta online estava desativada nesse processo.
- Bundles Android (Hermes) e web gerados.
- Árvore completa de dependências verificada com `npm ls --all`, sem conflitos.
- Inspeção visual em 390 × 1000 e 320 × 640.

## Fluxo de interface

Um harness Playwright externo ao aplicativo verificou a exportação web no Chrome:

1. Login vazio e credenciais incorretas foram recusados; o acesso demo abriu Cadastrar.
2. Nome vazio impediu avançar. A segunda etapa validou preço e quantidade.
3. Voltar à identificação e avançar preservou os dados preenchidos.
4. Cadastro de Cabo USB-C 1 m (R$ 24,90, 12 un.), Adaptador HDMI (R$ 39,00, 3 un.) e Mouse óptico (R$ 49,90, 0 un.).
5. Nome duplicado em maiúsculas foi recusado.
6. Inventário exibiu 3 referências, 15 unidades e R$ 415,80; filtros de baixo/zerado e busca `OPTICO` funcionaram.
7. Busca e seletor pesquisável encontraram o cabo. Botões +/− alteraram a quantidade.
8. Baixa de 13 unidades foi recusada. Baixa de 7 deixou saldo 5 e atualizou o inventário para R$ 241,50.
9. Recarregar e entrar novamente preservou o saldo e os produtos.
10. A única chave de inventário foi `@lastro/products/v1`, sem chaves dos outros apps.
11. Em 320 pixels, abas permaneceram dentro da tela e o input focado teve contorno de largura zero.
12. Logout e acesso direto à rota de saída levaram ao login. Nenhuma exceção de página foi registrada.

## Capturas

- [Login](evidencias/01-login.png)
- [Cadastro: identificação](evidencias/02-cadastro-identificacao.png)
- [Cadastro: valores](evidencias/03-cadastro-valores.png)
- [Inventário](evidencias/04-inventario.png)
- [Seletor pesquisável](evidencias/05-seletor.png)
- [Baixa: conferência](evidencias/06-baixa-conferencia.png)
- [Baixa registrada](evidencias/07-baixa-registrada.png)
- [Cadastro em 320 pixels](evidencias/08-cadastro-320.png)

## Limites

As capturas são da versão web. O bundle Android compila, mas não foi executado no Expo Go do aparelho. Conferir teclado nativo, áreas seguras, navegação por gestos/três botões e Voltar. iOS não foi executado. A publicação no GitHub não foi realizada.

Os projetos anteriores não foram alterados. O Lastro usa nome, identificadores, marca, pasta, Git e armazenamento próprios.
