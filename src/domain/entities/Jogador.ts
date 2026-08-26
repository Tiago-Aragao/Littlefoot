import type { Posicao, Habilidade, Lado } from "../types/Enums.js"
import type { Registro_Desempenho } from "../types/Estatisticas.js"

// Classe Jogador:
export class Jogador {
    // Dados Padrão:
    nome: string
    idade: number
    nacionalidade: string
    titularidade: string
    craque: boolean
    craque_mundial: boolean
    // Dados Otimizados:
    posicao: Posicao;
    hab_principal: Habilidade;
    hab_secundaria: Habilidade;
    lado: Lado;
    // Dados internos:
    forca: number;
    vantagens: string[]; // Futuramente será vantagens: Vantagem[]; Onde as vantagens que o jogador terá também serão objetos.
    salario: number;
    energia: number;
    historico_notas: Registro_Desempenho[]; // Irá guardar desempenho geral do jogador, gols, notas, assistencias, cartões, etc.
    desempenho_atual: Registro_Desempenho; // Registro do ano vigente.
    notas_atuais: [number, number][]; // Tupla que guarda: [id_partida, nota]

    // Metodo Construtor: 
    constructor (dados_mapeados: any) {
        // Dados Padrão:
        this.nome = dados_mapeados.nome;
        this.idade = dados_mapeados.idade;
        this.nacionalidade = dados_mapeados.nacionalidade;
        this.titularidade = dados_mapeados.titularidade;
        this.craque = dados_mapeados.craque;
        this.craque_mundial = dados_mapeados.craque_mundial;
        // Dados Mapeados:
        this.posicao = dados_mapeados.posicao;
        this.hab_principal = dados_mapeados.caracteristica_primaria;
        this.hab_secundaria = dados_mapeados.caracteristica_secundaria;
        this.lado = dados_mapeados.lado;
        // Dados internos:
        this.forca = 0;
        this.vantagens = [];
        this.salario = 0.0;
        this.energia = 100.00;
        this.historico_notas = [];
        this.desempenho_atual = //gerar_estatistica_zerada(ano_atual, id_time_atual); Finalizar amanha
        this.notas_atuais = [];
    }

    // Metodo para alterar idade:
    public envelhecer ():void {
        /*
        Metodo sem retorno que quando chamado modifica a idade do jogador.
        */
       this.idade += 1;
    }

    // Finalizar amanhã
    // public gerar_estatistica_zerada(ano_atual, id_atual_time) {
        
    }

}