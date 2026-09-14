import { Junior } from "../entities/Junior.js";
import { Time } from "../entities/Time.js";
import { Posicao, Habilidade, Lado } from "../types/Enums.js";
import { valor_aleatorio } from "../../utils/valor_aleatorio.js";
import { Gerador_Nomes } from "../../utils/Gerador_Nomes.js";
import type { IDadosJunior } from "../interfaces/IDadosJunior.js";

export class Fabrica_Junior {

    public static gerar_junior(time: Time): Junior {
        
        const juninho: IDadosJunior = {
            nome: Gerador_Nomes.gerar_nome(time.pais),
            idade: this.idade_junior(),
            nacionalidade: time.pais,
            posicao: this.gerar_posicao(),
            hab_principal: this.gerar_habilidade_primaria(),




        }
    }

    public static idade_junior(): number {
        return valor_aleatorio(16,20);
    }

    public static gerar_posicao(): Posicao {
        const posicoes = Object.values(Posicao).filter((valor): valor is number => typeof valor === 'number' && valor !== Posicao.Desconhecida);
        const posicao_sorteada = valor_aleatorio(0, posicoes.length - 1);
        
        return posicoes[posicao_sorteada] as Posicao;
    }

    
    public static gerar_habilidade_primaria(posicao: Posicao): Habilidade {
        return as Habilidade
    }

    // Metodo auxiliar para sortear as habilidades por peso imitando o choices do python:
    private static sorteio_por_peso_para_habilidades(opcoes: { habilidade: Habilidade, peso: number }[]): Habilidade {
        // Somo os pesos:
        const peso_total = opcoes.reduce((soma, op) => soma + op.peso, 0);
        
        let valor_sorteado = valor_aleatorio(1, peso_total);
        
        // Descobre em qual opção o valor sorteado caiu:
        for (const opcao of opcoes) {
            if (valor_sorteado <= opcao.peso) {
                return opcao.habilidade;
            }
            valor_sorteado -= opcao.peso;
        }
        
        return opcoes[0].habilidade as Habilidade; // Fallback de segurança
    }

}