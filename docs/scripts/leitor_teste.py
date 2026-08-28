import javaobj
import json
from pathlib import Path
from tradutor_base_dados import *

def testar_extracao_time(arquivo_ban):
    try:
        print(f"Lendo o arquivo: {arquivo_ban}...")
        with open(arquivo_ban, "rb") as f:
            obj = javaobj.load(f)
            
        # Caso o pais não seja brasil torna o estado None:
        pais_id = getattr(obj, 'a', 0)
        
        # 1. Extração dos dados do Time
        time_json = {
            "nome": getattr(obj, 'e', 'Desconhecido'),
            "pais": dict_paises.get(getattr(obj, 'a', 0), "Desconhecido"),
            "estado": dict_estados.get(getattr(obj, 'b', 0), "Desconhecido") if pais_id == 29 else None,
            "nivel inicial": getattr(obj, 'c', 1),
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
                "nacionalidade": dict_paises.get(getattr(jog, 'c', 0), "Desconhecido"),
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
    caminho_teste = r"C:\Users\Tiago\Desktop\Littlefoot\1deagosto_ang.ban"
    testar_extracao_time(caminho_teste)