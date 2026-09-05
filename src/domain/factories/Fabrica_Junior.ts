import { Junior } from "../entities/Junior.js";
import { Time } from "../entities/Time.js";
import { Posicao, Habilidade, Lado } from "../types/Enums.js";
import { valor_aleatorio } from "../../utils/valor_aleatorio.js";
import type { IDadosJunior } from "../interfaces/IDadosJunior.js";

export class Fabrica_Junior {

    public static gerar_junior(time: Time): Junior {
        
        const juninho: IDadosJunior = {
            nome: this.gerar_nome(time.pais);


        }
    }

    public gerar_nome (nacionalidade: string): string {
        

    }

}