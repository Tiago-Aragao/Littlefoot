export class Estadio {
    nome: string;
    capacidade_atual: number;
    capacidade_maxima: number;

    constructor(dados:any){
        this.nome = dados.nome;
        this.capacidade_atual = dados.capacidade;
        this.capacidade_maxima = 132000;
    } 

    // Criar depois os metodos de expandir estadio, gerar valores, ingressos, lugares, etc.
}