# Lastro Estoque

Terceira versão do trabalho de gestão de estoque: identidade em vinho, marfim e dourado discreto, marca geométrica e uma interface operacional. O projeto tem pasta, Git e dados próprios. Os outros dois aplicativos foram preservados.

## Rodar com Expo Go

Requer Node.js 24 LTS, npm e Expo Go SDK 58.

```powershell
cd C:\Users\isaque\Documents\coisas-da-faculdade\lastro-estoque
npm ci
npm start
```

Neste computador as dependências já foram instaladas. Leia o QR Code no celular. Se outro app estiver usando a porta padrão: `npm start -- --port 8083`. Para limpar o cache: `npm start -- --clear`.

Se o nvm estiver sem versão ativa, selecione uma versão instalada com `nvm use 24.21.0`. Computador e celular precisam se alcançar pela rede. Redes de faculdade podem isolar dispositivos; uma alternativa é conectar o computador ao hotspot do celular. O comando `npm run start:tunnel` usa ngrok e cria um link público temporário para o bundle de desenvolvimento; encerre com `Ctrl+C`. Nenhum túnel é iniciado automaticamente.

## Login de demonstração

- E-mail: `demo@lastro.app`
- Senha: `Lastro123`

O botão **Preencher acesso demo** prepara o formulário. A sessão é simulada e fica em memória. O estoque permanece salvo após fechar o aplicativo.

## Organização das telas

1. **Cadastrar**: abre após o login. Primeiro informe o nome; depois, quantidade inicial e preço. É possível voltar à identificação sem perder os valores. A segunda etapa exibe o valor inicial do estoque antes de salvar.
2. **Dar baixa**: busque um produto, abra o seletor, informe a quantidade ou ajuste pelos botões +/−. O saldo projetado aparece antes da confirmação. Retiradas acima do saldo são recusadas.
3. **Inventário**: posição geral em vinho, indicadores de referências/unidades/alertas e linhas de produtos com preço, situação, saldo e valor total. Inclui busca sem distinção de acentos e filtros de estoque baixo ou zerado.

São as mesmas funcionalidades do enunciado: login com feedback e carregamento, cadastro tipado, inventário reativo com alertas, saída com busca e seletor, Context API, Stack protegido e abas. O estoque inicia vazio; os dados das capturas pertencem somente aos testes.

## Diferenças visuais

O Lastro usa títulos sem serifa, números monoespaçados, cantos discretos, marca de camadas e ícones operacionais MaterialCommunityIcons. O cadastro guiado, as linhas de inventário e a ordem de saída com saldo projetado mudam a disposição dos conteúdos em relação ao Estoque Local e ao Pétala. O login combina um painel vinho com formulário aberto, sem o cartão floral do Pétala.

## Estrutura e persistência

```text
src/app/          Rotas do Expo Router
src/routes/       Stack protegido e três abas
src/pages/        Login, cadastro, inventário e baixa
src/components/   Componentes reutilizáveis e estilos isolados
src/context/      Sessão e estoque com Context API
src/domain/       Tipos, validações e operações de estoque
src/global/       Paleta, tipografia e moeda
assets/           Ícone geométrico
tests/            Regras de negócio
docs/             Validação e capturas
```

AsyncStorage é a única persistência, na chave exclusiva `@lastro/products/v1`. Sem backend ou banco externo. Valores monetários são armazenados em centavos; nomes duplicados, valores inválidos e saldo insuficiente são recusados. Atualizações só aparecem como concluídas depois de salvar no aparelho.

Estoque baixo: 1 a 5 unidades. Zero: zerado. A quantidade inicial aceita zero; a baixa exige um inteiro positivo. Preços aceitam `24,90` ou `24.90`, sem milhar.

Todos os estilos ficam em arquivos separados `styles.ts`. Foram preservados o ajuste do teclado, a rolagem até o campo focado, a área segura inferior das abas e os inputs sem contorno preto.

## Verificação

```powershell
npm run typecheck
npm test
npx expo install --check
npx expo export --platform android --platform web
npm run web
```

Consulte [o registro de validação](docs/validacao.md). As imagens são capturas reais da versão web em tamanho de celular; a execução com teclado nativo ainda precisa ser conferida no Expo Go.

O Git é independente, com pequenos commits Conventional Commits em português. O repositório ainda não foi publicado no GitHub. O ícone pode ser recriado por `python scripts/generate-icon.py` com Pillow instalado; o aplicativo usa o PNG pronto.
