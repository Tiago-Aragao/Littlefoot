import javaobj
import json
from pathlib import Path
from multiprocessing import Pool, cpu_count
from tradutor_base_dados import *

def processar_arquivo(args):
    arquivo_ban, pasta_destino = args
    
    try:
        with open(arquivo_ban, "rb") as f:
            obj = javaobj.load(f)
            
        pais_id = getattr(obj, 'a', 0) 
        
        time_json = {
            "nome": getattr(obj, 'e', 'Desconhecido'),
            "pais": dict_paises.get(pais_id, "Desconhecido"),
            "estado": dict_estados.get(getattr(obj, 'b', 0), "Desconhecido") if pais_id == 29 else None,
            "nivel": getattr(obj, 'c', 1),
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
            
        
        nome_arquivo = arquivo_ban.stem + '.json'
        caminho_out = pasta_destino / nome_arquivo
        
        with open(caminho_out, 'w', encoding='utf-8') as f_out:
            json.dump(time_json, f_out, ensure_ascii=False, indent=2)
            
        return True
        
    except Exception as e:
        print(f"Erro no arquivo {arquivo_ban.name}: {e}")
        return False

def converter_bans(pasta_origem, pasta_destino):
    origem = Path(pasta_origem)
    destino = Path(pasta_destino)

    destino.mkdir(parents=True, exist_ok=True)
    
    arquivos_ban = list(origem.glob("*.ban"))
    total = len(arquivos_ban)
    print(f"Encontrados {total} times. Iniciando extração com todos os núcleos...\n")
    
    argumentos = [(arq, destino) for arq in arquivos_ban]
    
    nucleos = cpu_count()
    
    with Pool(processes=nucleos) as pool:
        resultados = pool.map(processar_arquivo, argumentos)
        
    sucessos = sum(1 for r in resultados if r is True)
    print(f"\nFinalizado! {sucessos} de {total} times convertidos para JSON em '{destino.name}'.")

if __name__ == '__main__':
    pasta_teams = r"C:\Users\Tiago\Desktop\Littlefoot\teams_ban"
    pasta_json = r"C:\Users\Tiago\Desktop\Littlefoot\teams_json"
    converter_bans(pasta_teams, pasta_json)