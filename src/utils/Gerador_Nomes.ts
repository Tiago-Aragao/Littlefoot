import * as fs from 'fs';
import * as path from 'path';
import { valor_aleatorio } from './valor_aleatorio.js';

export class Gerador_Nomes {
    // O cofre na memória RAM
    private static banco_nomes: Record<string, { nomes: string[], sobrenomes: string[] }> = {};
    private static carregado: boolean = false;

    public static inicializar(): void {
        // Trava de segurança para não ler o arquivo duas vezes:
        if (this.carregado) {
            return; // encerro a inicialização.
        }

        // Lê o JSON do HD:
        const caminho = path.resolve('./data/nomes/banco_de_nomes.json');
        const arquivo = fs.readFileSync(caminho, 'utf-8');
        
        // Transforma o texto em objeto TypeScript:
        this.banco_nomes = JSON.parse(arquivo);
        this.carregado = true;
    }

    public static gerar_nome(pais_do_time: string): string {
        // Busca a nacionalidade. Se o time for de um país sem lista (ex: "Vaticano"), usa o Brasil como fallback seguro.
        const dados_pais = this.banco_nomes[pais_do_time] || this.banco_nomes["Brasil"] || {nomes: [], sobrenomes: []}; // Ultima opção apenas por segurança
        const lista_nomes = dados_pais.nomes;
        const lista_sobrenomes = dados_pais.sobrenomes;
        
        // Tratamento de erro caso realmente retorne um objeto vazio:
        if (lista_nomes.length === 0) {
            return "Jogador Desconhecido";
        }

        // Sorteia os índices
        const index_nome = valor_aleatorio(0, lista_nomes.length - 1);
        if (valor_aleatorio(1,100) > 70) {
            const index_sobrenome = valor_aleatorio(0, lista_sobrenomes.length - 1);
            return `${lista_nomes[index_nome]} ${lista_sobrenomes[index_sobrenome]}`;
        } else {
            return `${lista_nomes[index_nome]}`;
        }
    }
}