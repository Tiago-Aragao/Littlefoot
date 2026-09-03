import {Posicao, Habilidade, Lado, Titularidade } from "../types/Enums.js";

export class JogadorMapper {
    public static json_dto (dados_json:any) {
        return {
            // Dados JSON:
            nome: dados_json.nome,
            idade: dados_json.idade,
            nacionalidade: dados_json.nacionalidade,
            craque: dados_json.craque,
            craque_mundial: dados_json.craque_mundial,
            // Dados Otimizados:
            titularidade: this.mapear_titularidade(dados_json.titularidade),
            posicao: this.mapear_posicao(dados_json.posicao),
            caracteristica_primaria: this.mapear_habilidade(dados_json.caracteristica_primaria),
            caracteristica_secundaria: this.mapear_habilidade(dados_json.caracteristica_secundaria),
            lado: this.mapear_lado(dados_json.lado)
        }
    }

    
    private static mapear_titularidade(titularidade_string: string) {
        switch (titularidade_string?.toLowerCase()) {
            case "titular": return Titularidade.Titular;
            case "banco": return Titularidade.Banco;
            // Tratamento de erro:
            default: return Titularidade.Banco;
        }
    }
    
    private static mapear_posicao(posicao_string: string) {
        switch(posicao_string?.toLowerCase()) {
            case "goleiro": return Posicao.Goleiro;
            case "zagueiro": return Posicao.Zagueiro;
            case "lateral": return Posicao.Lateral;
            case "meia": return Posicao.Meia;
            case "atacante": return Posicao.Atacante;
            // Tratamento de erro:
            default: return Posicao.Desconhecida;
        }
    }

    private static mapear_habilidade(habilidade_string: string) {
        switch(habilidade_string?.toLocaleLowerCase()) {
            // Habilidade de Goleiro:
            case "colocacao": return Habilidade.Colocacao;
            case "defesa penalty": return Habilidade.Defesa_Penalty;
            case "reflexo": return Habilidade.Reflexo;
            case "saída do gol": return Habilidade.Saida_gol;
            // Habilidades gerais:
            case "armação": return Habilidade.Armacao;
            case "cabeceio": return Habilidade.Cabeceio;
            case "cruzamento": return Habilidade.Cruzamento;
            case "desarme": return Habilidade.Desarme;
            case "drible": return Habilidade.Drible;
            case "finalização": return Habilidade.Finalizacao;
            case "marcação": return Habilidade.Marcacao;
            case "passe": return Habilidade.Passe;
            case "resistência": return Habilidade.Resistencia;
            case "velocidade": return Habilidade.Velocidade;
            // Tratamento de erro:
            default: return Habilidade.Desconhecida;
        }
    }

    private static mapear_lado(lado_string: string) {
        switch(lado_string?.toLocaleLowerCase()) {
            case "esquerdo": return Lado.Esquerdo;
            case "direito": return Lado.Direito;
            // Tratamento de erro:
            default: return Lado.Desconhecido;
        }
    }
}