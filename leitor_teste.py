import javaobj
import json
from pathlib import Path
from tradutor_base_dados import *

def testar_extracao_time(arquivo_ban):
    try:
        print(f"Lendo o arquivo: {arquivo_ban}...")
        with open(arquivo_ban, "rb") as f:
            obj = javaobj.load(f)
            
        # 1. Extração dos dados do Time
        time_json = {
            "nome": getattr(obj, 'e', 'Desconhecido'),
            "pais_id": getattr(obj, 'a', 0), # Manteremos o ID até você plugar o XML de países
            "estado_id": getattr(obj, 'b', 0), # Manteremos o ID até acharmos a lista de estados
            "reputacao": getattr(obj, 'n', 1),
            "tecnico": getattr(obj, 'h', 'Sem Técnico'),
            "estadio": {
                "nome": getattr(obj, 'f', 'Desconhecido'),
                "capacidade": getattr(obj, 'g', 0)
            },
            "cores": {
                "primaria": getattr(obj, 'cor1', '#000000'),
                "secundaria": getattr(obj, 'cor2', '#FFFFFF')
            },
            "plantel": []
        }
        
        # 2. Extração dos Jogadores
        lista_jogadores = getattr(obj, 'l', [])
        for jog in lista_jogadores:
            jogador_limpo = {
                "nome": getattr(jog, 'a', 'Desconhecido'),
                "idade": getattr(jog, 'd', 16),
                "posicao": dict_posicoes.get(getattr(jog, 'e', 0), "Desconhecido"),
                "caracteristica_primaria": dict_habs.get(getattr(jog, 'g', -1), "Nenhuma"),
                "caracteristica_secundaria": dict_habs.get(getattr(jog, 'h', -1), "Nenhuma"),
                "lado": dict_lados.get(getattr(jog, 'i', 0), str(getattr(jog, 'i', 0))),
                "titularidade": dict_titularidade.get(getattr(jog, 'f', 0), str(getattr(jog, 'f', 0))),
                "craque": getattr(jog, 'b', False),
                "craque_mundial": getattr(jog, 'j', False)
            }
            time_json["plantel"].append(jogador_limpo)
            
        # 3. Salvar JSON de teste
        caminho_out = Path(arquivo_ban).with_suffix('.json')
        with open(caminho_out, 'w', encoding='utf-8') as f_out:
            json.dump(time_json, f_out, ensure_ascii=False, indent=2)
            
        print(f"Sucesso! JSON estruturado salvo em:\n-> {caminho_out}")
        
    except Exception as e:
        print(f"Erro ao processar o arquivo: {e}")

if __name__ == '__main__':
    # Cole aqui o caminho completo de um único arquivo .ban para teste
    caminho_teste = r"C:\caminho\para\o\seu\4dejulho_pi.ban"
    testar_extracao_time(caminho_teste)