# ⚽ Littlefoot 
Um motor moderno, limpo e ultra-rápido para jogos de gerenciamento de futebol, construído do zero com TypeScript. Nascido a partir da engenharia reversa de simuladores clássicos, o projeto foca em lógica de programação bruta, arquitetura limpa e alta performance, abandonando limitações legadas.
## 🏗️ Filosofia e Arquitetura
O coração do projeto funciona sob uma **Arquitetura Híbrida**, projetada para rodar de forma 100% local, na memória, garantindo processamento instantâneo sem depender de conexões com a internet ou bancos de dados externos:
*   **Conteúdo Data-Driven (A Base de Dados):** Times, jogadores, países e estádios são consumidos via arquivos `.json` estruturados. Isso torna o jogo infinitamente expansível e "moddable" pela comunidade, sem necessidade de alterar uma única linha do núcleo do jogo.
*   **Regras Code-Driven (O Motor):** A simulação das partidas, o cálculo dinâmico de forças, cronômetros e regras táticas não ficam à mercê de arquivos de configuração. Tudo é rigidamente codificado em TypeScript puro (POO), garantindo segurança de tipagem, prevenção de bugs silenciosos e facilidade de manutenção.
## ⚙️ O Pipeline de ETL (Extração, Transformação e Carga)
A base de dados inicial (composta por mais de 8.000 times) foi construída através de um rigoroso processo de Data Cleansing utilizando Python.
Os scripts desenvolvidos (`/scripts_etl`) leem objetos serializados em Java (`.ban`), decodificam IDs obscuros, mapeiam atributos através de dicionários complexos, filtram dados não estruturados (ex: estados de times internacionais) e utilizam `multiprocessing` para exportar a base inteira para JSON em questão de segundos.

## 🚀 Próximos Passos (Roadmap)
- [x] Extraindo a base de dados de times e jogadores de arquivo .ban para .json.
- [x] Script de extração unitária e mapeamento de dicionários (Python).
- [x] Processamento paralelo em massa gerando os JSONs.
- [ ] Criação dos Contratos e Tipagens no TypeScript (`interfaces.ts`).
- [ ] Desenvolvimento do sistema de carregamento de memória (JSON -> POO).
- [ ] Construção do motor de simulação matemática das partidas.
- [ ] Modelagem das classes de Táticas, Jogadores e Times.

## 🛠️ Tecnologias Utilizadas
*   **TypeScript:** Para o desenvolvimento do motor principal e segurança de tipos.
*   **Python:** Para a criação dos scripts de mineração e sanitização de dados.
---
*Desenvolvido por Tiago Aragão.*
