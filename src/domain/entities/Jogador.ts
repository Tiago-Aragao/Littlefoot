import type { Posicao, Habilidade, Lado } from "../types/Enums.js"
import type { Registro_Desempenho } from "../types/Estatisticas.js"
import { Vantagem } from "./Vantagem.js"

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
    vantagens: Vantagem[];
    salario: number;
    valor_mercado: number;
    energia: number;
    historico_notas: Registro_Desempenho[]; // Irá guardar desempenho geral do jogador, gols, notas, assistencias, cartões, etc.
    desempenho_atual: Registro_Desempenho; // Registro do ano vigente.
    notas_atuais: [number, number][]; // Tupla que guarda: [id_partida, nota]

    // Metodo Construtor: 
    constructor (dados_mapeados: any, ano_atual: number, id_time_atual:number) {
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
        this.valor_mercado = 0;
        this.energia = 100.00;
        this.historico_notas = [];
        this.desempenho_atual = this.gerar_estatistica_zerada(ano_atual, id_time_atual);
        this.notas_atuais = [];
    }

    // Metodo para alterar idade:
    public envelhecer ():void {
        /*
            Metodo sem retorno que quando chamado modifica a idade do jogador.
        */
       this.idade += 1;
    }

    public registrar_partida(id_partida:number, nota:number): void {
        /*
            Registrando a partida com notas, ano e id:
        */
        this.notas_atuais.push([id_partida,nota]);
        this.desempenho_atual.jogos += 1;
        const num_jogos = this.desempenho_atual.jogos;
        const media_antiga = this.desempenho_atual.nota_media;

        if (this.desempenho_atual.jogos === 1) {
            this.desempenho_atual.nota_media = nota;
        }
        else {
            const nova_media = ((media_antiga * (num_jogos - 1)) + nota) / num_jogos;
            this.desempenho_atual.nota_media = Number(nova_media.toFixed(2)); // usando toFixed para fixar em duas casas decimais.
        }
    }
    
    public encerrar_ciclo(novo_ano:number, id_time: number): void {
        /*
            Metodo para quando o ano acabar ou para quando o jogador for transferido para um novo time.
        */
        // Caso exista partida:
        if (this.desempenho_atual.jogos > 0) {
            this.historico_notas.push(  {...this.desempenho_atual});
        }
        // Limpa a RAM para começar um nobo ano ou em um novo time:
        this.desempenho_atual = this.gerar_estatistica_zerada(novo_ano, id_time);
        this.notas_atuais = [];
    }

    // Metodos para o controle estatistico do jogador:
    public aumentar_gol(): void {
        this.desempenho_atual.gols += 1;
    }
    public aumentar_assistencias(): void {
        this.desempenho_atual.assistencias += 1;
    }
    public aumentar_amarelos(): void {
        this.desempenho_atual.cartoes_amarelos += 1;
    }
    public aumentar_vermelhos(): void {
        this.desempenho_atual.cartoes_vermelhos += 1;
    }

    // Metodo privado auxiliar: 
    private gerar_estatistica_zerada(ano: number, id_time: number): Registro_Desempenho {
        /*
            Metodo feito para iniciar a estatistica de cada jogador.
        */
        return {
            ano: ano,
            id_time: id_time,
            jogos: 0,
            gols: 0,
            assistencias: 0,
            cartoes_amarelos: 0,
            cartoes_vermelhos: 0,
            nota_media: 0
        };
    }

}