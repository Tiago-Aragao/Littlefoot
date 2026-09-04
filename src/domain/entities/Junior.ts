import type { IDadosJunior } from "../interfaces/IDadosJunior.js"
import type { Posicao, Habilidade, Lado } from "../types/Enums.js"
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
    private forca: number;
    private forca_maxima: number;
    private desenvolvimento: number; // 0 á 100 em %.
    public potencial: number; // Indicativo de qualidade esperada.
    
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
        this.forca = forca_inicial;
        this.forca_maxima = forca_maxima;
        this.potencial = potencial;
        this.desenvolvimento = desenvolvimento;
    }

    // Getters:
    public get salario_junior(): number {
        return this.salario;
    }

    public get desenvolvimento_junior(){
        return this.desenvolvimento;
    }

    // Setters:
    public set salario_junior(valor: number) {
        if (valor > 0) {
            this.salario = valor;
        }
    }

    public set forca_junior(forca_inicial: number) {
        if (forca_inicial > 0) {
            this.forca = forca_inicial;
        }
    }

    public set forca_maxima_junior(forca_maxima: number) {
        if (forca_maxima > 0) {
            this.forca_maxima = forca_maxima;
        }
    }

    // Metodos:
    public aumentar_forca() {
        /*
        Metodo que permite aumentar a força do jogador.
        */
        if (this.forca < this.forca_maxima) {
            this.forca++;
        }
    }

    public envelhecer ():void {
        /*
        Metodo sem retorno que quando chamado modifica a idade do jogador.
        */
        this.idade += 1;
    }

}