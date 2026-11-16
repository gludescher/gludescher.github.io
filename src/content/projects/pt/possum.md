---
title: Possum
summary: Um app de ponto de venda offline-first para restaurantes que vendem em eventos. Feito em Flutter sobre um banco SQLite local, com impressão de comprovantes, numeração por evento e backup no Google Drive.
kind: Mobile · PDV offline-first
stack: [Flutter, Dart, Drift, SQLite, Riverpod, ESC/POS, Google Drive API]
order: 2
repos:
  - { label: Código-fonte, url: "https://github.com/gludescher/possum" }
images:
  - { src: "/projects/possum/checkout.png", alt: "Tela de venda do Possum com um pedido em andamento" }
  - { src: "/projects/possum/item-options.png", alt: "Diálogo de opções de um hambúrguer" }
  - { src: "/projects/possum/events.png", alt: "Tela de eventos com os totais do evento ativo" }
  - { src: "/projects/possum/sales.png", alt: "Histórico de vendas com filtros e totais" }
  - { src: "/projects/possum/catalog.png", alt: "Gestão do catálogo" }
  - { src: "/projects/possum/receipt-models.png", alt: "Configuração de modelos de comprovante" }
---

## O problema

Vender em uma feira ou festival significa atender muitos pedidos pequenos rapidamente, em um único tablet, muitas vezes com internet fraca ou sem internet. O Possum cobre exatamente esse fluxo de venda no balcão: tocar nos produtos, ajustá-los, finalizar em um passo, imprimir o comprovante e saber os totais no fim do evento.

## O que eu construí

Um app Flutter pensado para tablet (Android, paisagem) em que **o armazenamento local é a fonte da verdade**, então não é preciso conta, login nem rede para vender.

- **Venda rápida** com grupos de opções por categoria (escolha única ou múltipla, com quantidades e preços) e o total do item atualizado na hora.
- **Eventos** com números de venda sequenciais que reiniciam a cada evento, além de totais, ticket médio, caixa esperado e quebra por categoria.
- **Impressão de comprovantes** em uma ou mais impressoras de rede ESC/POS de 58 mm, com modelos de comprovante configuráveis. Uma falha de impressão nunca bloqueia uma venda.
- **Backup e restauração** do banco de dados inteiro em um arquivo ou no Google Drive.

## Decisões de engenharia

- **Dinheiro é sempre em centavos inteiros.** Nada de ponto flutuante perto de um preço, e a camada de domínio não depende de UI nem de armazenamento.
- **Vendas são histórico imutável.** Os itens da venda guardam uma cópia do nome e do preço do produto, e as exclusões são lógicas, então mudar o catálogo nunca reescreve o passado e números de venda nunca são reaproveitados.
- **Arquitetura por funcionalidade** com camadas bem definidas (`domain` não importa Flutter, Riverpod nem Drift; `core` não importa nenhuma funcionalidade), documentada no `STRUCTURE.md`.
- **Migrações de schema de verdade.** As versões do schema do Drift são salvas e nunca editadas, com testes de migração gerados para cada etapa de atualização.
- **Escopo disciplinado.** Um plano escrito, uma lista de ideias adiadas para depois da v0 e a regra de perguntar antes de inferir requisitos. É uma ferramenta pequena de propósito.
