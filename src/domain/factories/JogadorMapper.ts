import {Posicao, Habilidade, Lado } from "../types/Enums.js";

export class JogadorMapper {
    public static json_dto (dados_json:any) {
        return {
            // Dados JSON:
            nome: dados_json.nome,
            idade: dados_json.idade,
            nacionalidade: dados_json.nacionalidade,
            titularidade: dados_json.titularidade,
            craque: dados_json.craque,
            craque_mundial: dados_json.craque_mundial,
            // Dados Otimizados:
            posicao: this.Mapear_Posicao(dados_json.posicao),
            habilidade1: this.Mapear_Habilidade(dados_json.caracteristica_primaria),
            habilidade2: this.Mapear_Habilidade(dados_json.caracteristica_secundaria),
            lado: this.Mapear_Lado(dados_json.lado)
        }
    }

    private static Mapear_Posicao(posicao_string: String){
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

    private static Mapear_Habilidade(habilidade_string: String) {
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

    private static Mapear_Lado(lado_string:String) {
        switch(lado_string?.toLocaleLowerCase()) {
            case "esquerdo": return Lado.Esquerdo;
            case "direito": return Lado.Direito;
            // Tratamento de erro:
            default: return Lado.Desconhecido;
        }
    }
}