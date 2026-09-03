import type { Posicao, Habilidade, Lado, Titularidade } from "../types/Enums.js";

export interface IDadosJogador {
    nome: string;
    idade: number;
    nacionalidade: string;
    titularidade: Titularidade;
    craque: boolean;
    craque_mundial: boolean;
    posicao: Posicao;
    caracteristica_primaria: Habilidade;
    caracteristica_secundaria: Habilidade;
    lado: Lado;
}