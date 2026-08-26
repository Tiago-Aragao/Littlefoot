function valor_aleatorio(minimo:number, maximo:number):number {
    /*
    Função para gerar um numero aleatorio de de x a y.
    */
    return Math.floor(Math.random() * (maximo - minimo + 1) + minimo)
}
