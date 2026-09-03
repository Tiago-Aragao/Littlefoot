import { Jogador } from "../entities/Jogador.js";
import { Time } from "../entities/Time.js";
import { Reputacao, Posicao, Titularidade } from "../types/Enums.js";
import { Vantagem } from "../entities/Vantagem.js";
import { valor_aleatorio } from "../../utils/valor_aleatorio.js";
import { JogadorMapper } from "../mappers/JogadorMapper.js";

export class Fabrica_Jogador {

    public static criar_jogador_do_mapper(dados_json: any, time: Time, ano_atual: number): Jogador {
        const dados_otimizados = JogadorMapper.json_dto(dados_json);
        const jogador = new Jogador(dados_otimizados, ano_atual, time.id_time);
        jogador.forca = this.forca_inicial(jogador, time);
        jogador.valor_mercado = this.calcular_valor_mercado(jogador, time);
        jogador.salario_jogador = this.calcular_salario(jogador, time);
        // jogador.vantagens.push(this.sortear_vantagem());
        return jogador;
    }

    private static forca_inicial(jogador: Jogador, time: Time): number {
        /*
            Calculo de força de jogadores.
        */
        let base = time.nivel * 1.5;
        let bonus_titular = 0;

        if (jogador.titularidade) {
            bonus_titular = valor_aleatorio(0,2);
        }

        // Colocando uma base de reputação na força:
        let valor_reputacao = 0; // inicializando.
        switch (time.reputacao) {
            case Reputacao.Mundial: valor_reputacao = valor_aleatorio(10,13); break;
            case Reputacao.Continental: valor_reputacao = valor_aleatorio(8,11); break;
            case Reputacao.Nacional: valor_reputacao = valor_aleatorio(5,8);
            default: valor_reputacao = valor_aleatorio(0,3); break;
        }

        if (jogador.craque) {
            base += valor_aleatorio(10,15);
        }
        else if (jogador.craque_mundial) {
            base += valor_aleatorio(15,20);
        }
        const variacao = valor_aleatorio(-1, 5);

        let forca_final = base + variacao + valor_reputacao + bonus_titular;
        // Arredonda a força para o próximo número inteiro (ex: 75.5 vira 76)
        forca_final = Math.ceil(forca_final);
        
        // Validação de valores:
        if (forca_final < 1) {
            forca_final = 1;
        }
        if (forca_final > 100) {
            forca_final = 100;
        }

        return forca_final;
    }

    private static calcular_valor_mercado(jogador: Jogador, time: Time): number {
        /*
            Metodo feito para tentar simular o valor de jogadores reais no mercado.
        */
        
        // Valor base:
        let multiplicador_reputacao = 366;
        switch(time.reputacao) {
            case Reputacao.Mundial: multiplicador_reputacao = 750; break;
            case Reputacao.Continental: multiplicador_reputacao = 600; break;
            case Reputacao.Nacional: multiplicador_reputacao = 500; break;
            case Reputacao.Regional: multiplicador_reputacao = 400; break;
            // Tratamento de erro e set de segurança no valor base:
            default: multiplicador_reputacao = 366; break;
        }

        if (jogador.craque || jogador.craque_mundial) {
            // Sorteia um multiplicador alto para simular a variação entre Vini Jr e Dembélé
            // no código original isso era atrelado àquela função gg() que não temos
            const multiplicador_estrela = valor_aleatorio(17, 30) / 10; // Gera entre 1.7x e 3.0x
            multiplicador_reputacao = Math.floor(multiplicador_reputacao * multiplicador_estrela);
        }

        if (jogador.craque_mundial) {
            multiplicador_reputacao = Math.floor(multiplicador_reputacao * 1.6);
        }

        // Bloco que define bonus de valor com base na idade:
        let idade = jogador.idade;
        if (idade < 16){
            idade = 16;
        }
        
        let bonus_idade = 0;
        if (idade < 20) {
            bonus_idade = (32 - idade) * 27;
        } else if (idade <= 25) {
            bonus_idade = (32 - idade) * 22;
        } else if (idade < 32) {
            bonus_idade = (32 - idade) * 15;
        } else if (idade < 34) {
            bonus_idade = (34 - idade) * 10;
        } else {
            bonus_idade -= (idade - 34) * 50; 
        }

        multiplicador_reputacao += bonus_idade;

        if (multiplicador_reputacao <= 0) {
            multiplicador_reputacao = 60; // Piso
        } 

        // Aplicando multiplicação no valor pela força:
        let multiplicador_forca = jogador.forca * 2;
        multiplicador_forca *= multiplicador_forca; 

        // Penalidade para Força muito baixa:
        let valor = multiplicador_forca * multiplicador_reputacao;
        
        // Foguetar os valores dos carniças mortas:
        if (jogador.forca <= 5) {
            valor = Math.floor(valor * 0.03);
        }

        // Retornando o valor:
        return Math.floor(valor);
    }

    private static calcular_salario(jogador: Jogador, time: Time): number {
        /*
        Calculo do salario do jogador mensalmente (não usarei semanais).
        */
        
        // Base salarial por reputação do time:
        let base_reputacao = 350;
        switch(time.reputacao) {
            case Reputacao.Mundial: base_reputacao = 750; break;
            case Reputacao.Continental: base_reputacao = 600; break;
            case Reputacao.Nacional: base_reputacao = 500; break;
            case Reputacao.Regional: base_reputacao = 450; break;
            default: base_reputacao = 400; break;
        }

        // Ajuste por posição:
        switch(jogador.posicao) {
            case Posicao.Goleiro: base_reputacao -= 70; break;
            case Posicao.Atacante: base_reputacao -= 30; break;
            case Posicao.Meia: base_reputacao -= 40; break;
            case Posicao.Zagueiro: base_reputacao -= 45; break;
            case Posicao.Lateral: base_reputacao -= 50; break;
        }

        base_reputacao = Math.round(0.5 * base_reputacao);

        // Validação para evitar bugs de força zero (caso ocorra algum, dificil mas é bom ter XD):
        let multiplicador_forca = jogador.forca > 0 ? jogador.forca : 1;
        // Calculando o salario bruto  :
        let salario = multiplicador_forca * 2 * base_reputacao;

        // Bônus no multiplicador caso sejam carques ou craques mundiais:
        let bonus_estrela = 0;
        if (jogador.craque || jogador.craque_mundial) {
            bonus_estrela = multiplicador_forca * 250;
        }

        // Jogadores mais velhos sem nennhum renome (não é craque) aceitam um salario menor:
        let penalidade_idade = 0;
        if (jogador.idade >= 32  && jogador.craque == false && jogador.craque_mundial == false) {
            penalidade_idade = (jogador.idade - 32) * 300;
        }

        // Unindo todos os bônus:
        salario = salario - penalidade_idade + bonus_estrela;

        // Multiplicador final para o Craque Mundial:
        if (jogador.craque_mundial) {
            salario = Math.round(salario * 1.4);
        }

        // Piso salarial mensal (não vou usar semanal):
        if (salario < 500) {
            salario = 500;
        }

        // Variação aleatoria para dar uma diferenciada nos salarios:
        let variacao_percentual = valor_aleatorio(-5, 5);
        let modificador = 1 + (variacao_percentual / 100);
        
        // Calculando o salario final:
        const salario_final = Math.floor(salario * modificador); 
        
        return salario_final;
    }

    /*
    private static sortear_vantagens (): Vantagem {
        /*
        metodo que sorteia vantagem para o jogador, se o jogador for normal (sem ser craque ou craque mundial) tem uma chance baixa de receber uma vantagem apenas,
        caso seja craque recebe uma chance maior de ter uma vantagem e uma chance pequena de receber uma segunda vantagem
        por fim se for craque mundial recebe uma vantagem, uma chance de recebr uma segunda e uma chance pequena de recebr uma terceira           
        */
        
        // return new Vantagem;
    //}

}