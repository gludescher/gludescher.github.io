---
title: Possum
summary: Um app de ponto de venda offline-first para pequenos negócios, com foco em restaurantes, já testado em eventos reais e em food trucks. Feito em Flutter para Android, Windows e Linux sobre um banco SQLite local, com impressão de comprovantes, dados de vendas, custos e precificação, e backup no Google Drive.
kind: Multiplataforma · PDV offline-first
stack: [Flutter, Dart, Drift, SQLite, Riverpod, ESC/POS, Google Drive API, GitHub Actions]
order: 2
images:
  - { src: "/projects/possum/checkout.png", alt: "Tela de pedido do Possum com um pedido em andamento no painel lateral" }
  - { src: "/projects/possum/item-options.png", alt: "Opções de um hambúrguer, com o ponto da carne e os adicionais" }
  - { src: "/projects/possum/sales.png", alt: "Lista de vendas com filtros e totais, e uma venda aberta no painel lateral" }
  - { src: "/projects/possum/events.png", alt: "Tela de eventos com os números do evento ativo" }
  - { src: "/projects/possum/product-form.png", alt: "Formulário do produto com a receita, o preço sugerido e o custo e a margem resultantes" }
---

## O problema

Vender em uma feira ou festival significa atender muitos pedidos pequenos rapidamente, em um único tablet, muitas vezes com internet fraca ou sem internet. O Possum cobre exatamente esse fluxo de venda no balcão: selecionar os produtos, ajustá-los, finalizar o pedido, imprimir o comprovante automaticamente e saber os totais no fim do evento. Ele já foi testado em campo, em eventos reais, e deu conta do recado.

## O que já construí

Um app Flutter multiplataforma, pensado para tablet Android e que também pode rodar no Windows e no Linux, em que **o armazenamento local é a fonte da verdade**, então não é preciso conta, login nem internet para vender.

- **Venda rápida.** Produtos filtrados por categoria, grupos de opções configuráveis por categoria (escolha única ou múltipla, extras e remoções) e o total atualizado na hora.
- **Eventos e histórico de vendas.** Cada evento mostra os totais, o ticket médio, o caixa esperado e a divisão por categoria. A lista de vendas filtra por evento, período, cliente e status (um fluxo opcional *Vendido → Preparado → Entregue*), com totais que acompanham os filtros.
- **Custos e precificação.** Os insumos e suas compras dão a cada ingrediente um custo por unidade, pela última compra ou pela média ponderada das últimas. As receitas dos produtos somam um custo, o app sugere um preço por margem, markup ou acréscimo fixo, e cada venda guarda o custo com que foi vendida.
- **Impressão de comprovantes.** Impressoras de rede ESC/POS conectadas, cada uma com seus próprios modelos de comprovante personalizáveis e número de cópias, para que cada área do negócio receba só a informação relevante quando a velocidade é essencial. Uma venda nunca é interrompida por uma impressora com falha, e qualquer comprovante pode ser reimpresso sob demanda.
- **Backup de dados.** O banco de dados inteiro pode ser salvo e restaurado, localmente ou no Google Drive via Google OAuth.

## Decisões de engenharia

- **Dinheiro é sempre em centavos inteiros, e porcentagens em centésimos inteiros.** Nada de ponto flutuante perto de um preço: uma margem de 60% é guardada como `6000`, e as contas de preço, margem e markup ficam em uma camada de domínio pura, com testes unitários.
- **Vendas são histórico imutável.** Cada item da venda guarda uma cópia do nome, do preço e do custo do produto no momento da venda, então editar o catálogo ou uma receita nunca reescreve as margens do passado.
- **Migrações de schema de verdade, e backups que sobrevivem a elas.** Cada alteração na estrutura do banco de dados gera uma nova versão do schema do Drift, cada uma salva e nunca editada, com um teste de migração gerado para cada etapa de atualização. A restauração copia pelo nome das colunas, então um backup feito antes de uma migração volta no banco mais novo, e o contrário também.
- **Um núcleo pronto para uso, com recursos opcionais desligados por padrão.** Uma tag e um branch de release guardam uma versão estável enquanto o trabalho novo acontece em branches de funcionalidade. Custos, status da venda e imagens ficam cada um atrás de uma configuração que começa desligada, então o núcleo continua simples para quem não precisa deles. Um workflow manual no GitHub Actions gera a versão para Windows.
- **Arquitetura por funcionalidade e uma suíte de testes ampla.** Camadas bem definidas (`domain` não importa Flutter, Riverpod nem Drift), com os fluxos em ações compartilhadas abaixo dos widgets. Testes automatizados cobrem todos os fluxos, com repositórios falsos que se comportam como o armazenamento real (inclusive salvamentos que falham ou demoram) e testes de widget em vários tamanhos de tela e escalas de texto.
