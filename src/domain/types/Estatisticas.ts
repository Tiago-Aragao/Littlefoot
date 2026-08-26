export interface Registro_Desempenho {
    /* 
    Interface que irá ser o molde do desempenho de cada objeto Jogador.
    */
    ano: number;
    id_time: number;
    jogos: number;
    gols: number;
    assistencias: number;
    cartoes_amarelos: number;
    cartoes_vermelhos: number;
    nota_media: number;
}