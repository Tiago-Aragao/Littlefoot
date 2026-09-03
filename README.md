<div align="center">

  <h1><b>⚽ Littlefoot</b></h1>

  <p>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
    </a>
    <a href="https://nodejs.org/">
      <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
    </a>
    <a href="https://www.python.org/">
      <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
    </a>
  </p>

</div>

---

# 💡 Ideiologia
Um motor moderno, limpo e ultra-rápido para jogos de gerenciamento de futebol, construído do zero com TypeScript. Nascido a partir da engenharia reversa de simuladores clássicos, o projeto foca em lógica de programação bruta, arquitetura limpa e alta performance, abandonando limitações legadas.

## 🏗️ Filosofia e Arquitetura (Domain-Driven Design)
O coração do projeto funciona sob uma **Arquitetura Híbrida** e estritamente tipada, projetada para rodar de forma 100% local e em memória, garantindo processamento instantâneo. Adotamos os princípios rigorosos do **Domain-Driven Design (DDD)** e **Orientação a Objetos (POO)** para blindar o motor:

*   **Entidades e Separação de Responsabilidades:** Classes como `Time`, `Jogador` e `Junior` são entidades de domínio. Elas gerenciam seu próprio estado (encapsulamento estrito, matrizes de slots táticos) e não conhecem bancos de dados ou regras externas.
*   **Fábricas e Mapeadores (A Alfândega):** O consumo da base de dados é mediado por `Mappers` (que sanitizam a sujeira externa e convertem strings em Enums) e `Factories` (que orquestram a matemática de criação). O cofre do motor nunca interage com tipagens flexíveis (`any`).
*   **Contratos Rígidos (DTOs):** O fluxo de dados entre o carregamento dos JSONs e a instanciação das classes é protegido por Interfaces explícitas (`IDadosTime`, `IDadosJogador`), atuando como um escudo contra bugs silenciosos e garantindo escalabilidade segura.
*   **Conteúdo Data-Driven:** Clubes, atletas e estádios repousam em arquivos `.json` estruturados, tornando o jogo infinitamente expansível e preparado para receber *mods* da comunidade sem necessidade de recompilar o núcleo.

## ⚙️ O Pipeline de ETL (Extração, Transformação e Carga)
A base de dados inicial (composta por mais de 8.000 times) foi construída através de um rigoroso processo de Data Cleansing utilizando Python.
Os scripts desenvolvidos (`/scripts_etl`) leem objetos serializados em Java (`.ban`), decodificam IDs obscuros, mapeiam atributos através de dicionários complexos, filtram dados não estruturados (ex: estados de times internacionais) e utilizam `multiprocessing` para exportar a base inteira para JSON em questão de segundos.

## 🚀 Roadmap e Progresso
- [x] Extração da base de dados de times e jogadores de arquivos legados `.ban` para `.json`.
- [x] Script de extração unitária e mapeamento de dicionários (Python).
- [x] Processamento paralelo em massa gerando os JSONs.
- [x] **Modelagem de Domínio:** Criação das entidades base (`Time`, `Jogador`) e da mecânica arquitetural de Força Oculta para atletas da base (`Junior`).
- [x] **Blindagem de Tipagem:** Criação dos Contratos/Interfaces de transferência de dados (DTOs) e Enums do ecossistema.
- [x] **Pipeline de Memória (JSON -> POO):** Implementação da esteira de `Mappers` e `Factories` para injeção de dependência segura e inicialização de atributos dinâmicos (Valor de Mercado, Salário, Nível).
- [ ] Desenvolvimento do Serviço de Base (`MotorDaBase`) e Geração Procedural de Juniores via W-RNG (Sorteio com pesos).
- [ ] Construção do motor de simulação matemática das partidas (Ainda sobre pesquisa qual a melhor forma de calcular. **Preferida atualmente:** cálculo de densidade zonal).
- [ ] Gestão de IA Tática e Escalação Autônoma (`TreinadorIA`).

## 🛠️ Tecnologias e Padrões Utilizados
*   **TypeScript:** Motor principal, garantindo segurança de tipos, Interfaces e implementação de Design Patterns.
*   **Node.js:** Ambiente de execução local de alta performance.
*   **Python:** Pipeline de mineração, ETL e sanitização de dados brutos.
*   **Domain-Driven Design (DDD):** Padrão arquitetural orientando a separação entre Entidades, Fábricas, Mappers e Serviços de Domínio.

---
## 👨‍💻 Autor
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Tiago-Aragao">
        <img src="https://github.com/Tiago-Aragao.png" width="100px;" alt="Tiago Aragão" style="border-radius: 50%;"/><br />
        <sub><i>Desenvolvido por Tiago Aragão</i></sub>
      </a>
    </td>
  </tr>
</table>