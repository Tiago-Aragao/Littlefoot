import { Estadio } from "./Estadio.js";
import { Jogador } from "./Jogador.js";
import { Junior } from "./Junior.js";
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
    private plantel: Jogador[];
    private plantel_juniores: Junior[];
    // Finança do time:
    private dinheiro: number;
    // Indicadores gerais:
    confianca_diretoria: number; // irá de 0 a 100
    confianca_torcida: number; // ira de 0 a 100
    // Dentro da partida:
    private titulares: Jogador[]; // Quem vai pro jogo.
    private bancos: Jogador[]; // Quem pode entrar na partida.
    formacao: string; // Qual a formação.

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
      this.dinheiro = 0.0; // Inicia em 0
      // indicadores:
      this.confianca_diretoria = 0;
      this.confianca_torcida = 0;
      // Para partida:
      this.titulares = new Array(11);
      this.bancos = new Array(11);
      this.formacao = '';
    }

    // Financeiro:
    // getter da grana:
    public get dinheiro_em_caixa(): number {
      return this.dinheiro;
    }

    // setter da grana:
    public set dinheiro_em_caixa (valor: number) {
      this.dinheiro = valor;
    }

    // getters para o meu motor de partidas:
    public get titulares_time(): Jogador[] {
      return [...this.titulares];
    }
    public get banco_time():Jogador[] {
      return [...this.bancos];
    }

    public receber_dinheiro(valor: number) {
      if (valor > 0) {
        this.dinheiro += valor;
      }
    }

    public remover_dinheiro(valor: number): boolean {
      /*
      Metodo para remover valor do time. fazendo ele ter a possibilidade de ficar devendo apenas
      para pagar os jogadores. Não é possivel comprar nada com valor negativo.
      */
      if (valor > 0) {
        this.dinheiro -= valor;
        return true;
      }
      return false;
    }
    
    public calcular_salario_mensal(): number {
      let salario_total = 0;
      for(const jogador of this.plantel) {
        salario_total += jogador.salario_jogador;
      }
      //for (const junior of this.plantel_juniores) {
      //  salario_total += junior.salario;
      //}
      return salario_total;
    }

    public pagar_salario_jogadores(): boolean {
        let salario_jogadores = this.calcular_salario_mensal();
        if (salario_jogadores > 0) {
          return this.remover_dinheiro(salario_jogadores);
        }
        return false
    }

    public adicionar_jogador (jogador: Jogador): void {
      this.plantel.push(jogador);
    }

    public adicionar_junior (junior: Junior): void {
      this.plantel_juniores.push(junior);
    }

    public adicionar_titular_partida(posicao: number, jogador: Jogador): void {
      // Limita para serem adicionados apenas 11 jogadores:
      if (posicao >= 0 && posicao < 11) {
          this.titulares[posicao] = jogador;
      }
    }

    public adicionar_banco_partida(posicao: number, jogador: Jogador): void {
      // Limita para serem adicionados apenas 11 jogadores:
      if (posicao >= 0 && posicao < 11) {
          this.bancos[posicao] = jogador;
      }
    }

    public remover_jogador(jogador_a_remover: Jogador): boolean {
      const index_jogador = this.plantel.indexOf(jogador_a_remover);
      
      if (index_jogador !== -1) {
        this.plantel.splice(index_jogador, 1);
        return true;
      }
      return false;
    }

    public dispensar_junior(junior_a_dispensar: Junior): boolean {
      const index_jogador = this.plantel_juniores.indexOf(junior_a_dispensar);
      
      if (index_jogador !== -1) {
        this.plantel_juniores.splice(index_jogador, 1);
        return true;
      }
      return false;
    }

    
}