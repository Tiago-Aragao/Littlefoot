import type { Posicao, Habilidade, Lado } from "../types/Enums.js"

// Classe Jogador:
export class Jogador {
    // Dados Padrão:
    public nome: string
    public idade: number
    public nacionalidade: string
    public titularidade: string
    public craque: boolean
    public craque_mundial: boolean
    // Dados Otimizados:
    public posicao: Posicao;
    public habilidade1: Habilidade;
    public habilidade2: Habilidade;
    public lado: Lado;
    // Dados internos:
    public forca: number;
    public vantagens: string[]; // Futuramente será public vantagens: Vantagem[]; Onde as vantagens que o jogador terá também serão objetos.

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
    }

    // Metodo para alterar idade:
    public envelhecer ():void {
        /*
        Metodo sem retorno que quando chamado modifica a idade do jogador.
        */
       this.idade += 1;
    }
}