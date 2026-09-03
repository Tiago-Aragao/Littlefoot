import { Reputacao } from "../types/Enums.js";
import type { Cores_Time } from "../values_objects/Cores_Time.js";

export interface IDadosTime {
    id_time: number;
    nome: string;
    pais: string;
    estado: string | null;
    nivel: number;
    tecnico: string;
    estadio: any; // Mantido como 'any' ou 'Record<string, any>' pois será repassado ao construtor da classe Estadio
    cores: Cores_Time;
    reputacao: Reputacao;
}