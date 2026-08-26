import { Estadio } from "./Estadio.js";
import { Jogador } from "./Jogador.js";
import { Reputacao } from "../types/Enums.js";
import type { Cores_Time } from "../values_objects/Cores_Time.js";

export class Time {
    id_time: number;
    nome: string;
    pais: string;
    estado: string | null;
    nivel: number;
    tecnico: string;
    estadio: Estadio;
    cores:  Cores_Time;
    // Dado Otimizado:
    reputacao: Reputacao;
    //Plantel de Jogadores:
    plantel: Jogador[];
    plantel_juniores: Jogador[];
    dinheiro_em_caixa: number;

    constructor (dados_otimizados:any) {
      this.id_time = dados_otimizados.id_time;
      this.nome = dados_otimizados.nome;
      this.pais = dados_otimizados.pais;
      this.estado = dados_otimizados.estado;
      this.nivel = dados_otimizados.nivel;
      this.tecnico = dados_otimizados.tecnico;
      // Declarando o estadio:
      this.estadio = new Estadio(dados_otimizados.estadio);
      // Cores:
      this.cores = dados_otimizados.cores;
      this.reputacao = dados_otimizados.reputacao;
      // Plantel:
      this.plantel = [];
      this.plantel_juniores = [];
      // Dinheiro em caixa: 
      this.dinheiro_em_caixa = 0.0; // Inicia em 0
    }

    
}