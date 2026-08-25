import type { Posicao, Habilidade, Lado } from "../types/Enums.js"

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
    habilidade1: Habilidade;
    habilidade2: Habilidade;
    lado: Lado;
    // Dados internos:
    forca: number;
    vantagens: string[]; // Futuramente será public vantagens: Vantagem[]; Onde as vantagens que o jogador terá também serão objetos.
    salario: number;
    energia: number;
    
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
        this.habilidade1 = dados_mapeados.caracteristica_primaria;
        this.habilidade2 = dados_mapeados.caracteristica_secundaria;
        this.lado = dados_mapeados.lado;
        // Dados internos:
        this.forca = 0;
        this.vantagens = [];
        this.salario = 0.0;
        this.energia = 100.00;
    }

    // Metodo para alterar idade:
    public envelhecer ():void {
        /*
        Metodo sem retorno que quando chamado modifica a idade do jogador.
        */
       this.idade += 1;
    }
}