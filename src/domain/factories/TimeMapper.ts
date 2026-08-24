import { Reputacao } from '../types/Enums.js';

export class TimeMapper {
    
    public static json_dto(json: any) {
        return {
            nome: json.nome,
            pais: json.pais,
            estado: json.estado,
            tecnico: json.tecnico,
            cores: json.cores,
            // Dado Otimizado:
            reputacao: this.Mapear_Reputacao(json.reputacao)
        }
    }
    private static Mapear_Reputacao(reputacao_string: string): Reputacao {
        switch(reputacao_string?.toLowerCase()) {
            case "municipal": return Reputacao.Municipal;
            case "estadual": return Reputacao.Estadual;
            case "regional": return Reputacao.Regional;
            case "nacional": return Reputacao.Nacional;
            case "continental": return Reputacao.Continental;
            case "mundial": return Reputacao.Mundial;
            // Tratamento de erro passa a reputação mais baixa, não precisa ter tratamento complexo igual aos outros:
            default: return Reputacao.Municipal;
        }
    }
}