// Tradutores de Strings para Numero:
// Foco na eficiência de processamento onde comparar valores inteiros é mais rapido que comparar strings literais.
export enum Posicao {
    Desconhecida = -1, // Tratamento de erro.
    Goleiro = 1,
    Zagueiro = 2,
    Lateral = 3,
    Meia = 4,
    Atacante = 5
}

export enum Habilidade {
    Desconhecida = -1, // Tratamento de erro.
    // De goleiro vão de 1 a 4:
    Colocacao = 1,
    Defesa_Penalty = 2,
    Reflexo = 3,
    Saida_gol = 4,
    // Do geral vai de 5 a :
    Armacao = 5,
    Cabeceio = 6,
    Cruzamento = 7,
    Desarme = 8,
    Drible = 9,
    Finalizacao = 10,
    Marcacao = 11,
    Passe = 12,
    Resistencia = 13,
    Velocidade = 14
}

export enum Lado {
    Desconhecido = -1, // Tratamento de erro.
    Esquerdo = 1,
    Direito = 2,
    // Ambidestro = 3. // Futuramente.
}

export enum Reputacao {
    Municipal = 1,
    Estadual = 2,
    Regional = 3,
    Nacional = 4,
    Continental = 5,
    Mundial = 6
}

