import type { Posicao, Habilidade, Lado } from "../types/Enums.js";
import { Vantagem } from "../entities/Vantagem.js";

export interface IDadosJunior {
    nome: string;
    idade: number;
    nacionalidade: string;
    posicao: Posicao;
    hab_principal: Habilidade;
    hab_secundaria: Habilidade;
    lado: Lado;
    vantagens?: Vantagem[];
    salario: number;
    valor_estimado: number;
}