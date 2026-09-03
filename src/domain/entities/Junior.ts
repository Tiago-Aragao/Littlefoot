import type { IDadosJunior } from "../interfaces/IDadosJunior.js"
import type { Posicao, Habilidade, Lado } from "../types/Enums.js"
import type { Registro_Desempenho } from "../types/Estatisticas.js"
import { Vantagem } from "./Vantagem.js"

export class Junior {
    // Dados recebidos do Fabrica_Junior:
    nome: string;
    idade: number;
    nacionalidade: string;
    posicao: Posicao;
    hab_principal: Habilidade;
    hab_secundaria: Habilidade;
    lado: Lado;
    vantagens: Vantagem[];
    private salario: number;
    public valor_estimado: number;
    // Dados externos a interface:
    private forca_inicial: number;
    private forca_maxima: number;
    private desenvolvimento: number; // 0 á 100 em %.
    public potencial: number; // Indicativo de qualidade esperada.
    // Dados internos da classe:
    private craque: boolean; // Estrelinha ou não.

    
    constructor(dados_gerados: IDadosJunior, forca_inicial: number, forca_maxima: number, potencial: number, desenvolvimento: number) {
        // Dados auditados pela interface :
        this.nome = dados_gerados.nome;
        this.idade = dados_gerados.idade;
        this.nacionalidade = dados_gerados.nacionalidade;
        this.posicao = dados_gerados.posicao;
        this.hab_principal = dados_gerados.hab_principal;
        this.hab_secundaria = dados_gerados.hab_secundaria;
        this.lado = dados_gerados.lado;
        this.vantagens = dados_gerados.vantagens || [];
        this.salario = dados_gerados.salario;
        this.valor_estimado = dados_gerados.valor_estimado;
        // Dados criados pelo Fabrica_Junior:
        this.forca_inicial = forca_inicial;
        this.forca_maxima = forca_maxima;
        this.potencial = potencial;
        this.desenvolvimento = desenvolvimento;
        // Dados inicializados no construtor:
        this.craque = false; // inicializa em false para receber esse status em uma chance aleatoria a depender do desenvolvimento.
    }
}