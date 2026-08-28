import os
import json
from concurrent.futures import ProcessPoolExecutor
from tradutor_base_dados import dict_reputacao

def traduzir_arquivo(caminho_arquivo):
    try:
        with open(caminho_arquivo, 'r', encoding='utf-8') as f:
            dados = json.load(f)
            
        if 'reputacao' in dados and isinstance(dados['reputacao'], int):
            numero_reputacao = dados['reputacao']
            dados['reputacao'] = dict_reputacao.get(numero_reputacao, numero_reputacao)
            
            # Salva o arquivo sobrescrevendo o antigo
            with open(caminho_arquivo, 'w', encoding='utf-8') as f:
                json.dump(dados, f, ensure_ascii=False, indent=2)
            
            return 1
            
    except Exception as e:
        print(f"Erro no arquivo {caminho_arquivo}: {e}")
        
    return 0

def traduzir_base_de_dados(pasta_jsons):
    print("Iniciando conversão em massa...")
    
    arquivos = [os.path.join(pasta_jsons, f) for f in os.listdir(pasta_jsons) if f.endswith('.json')]
    
    with ProcessPoolExecutor() as executor:
        resultados = list(executor.map(traduzir_arquivo, arquivos))
        
    total_sucesso = sum(resultados)
    print(f"✅ Sucesso! {total_sucesso} times tiveram a reputação traduzida.")

if __name__ == "__main__":
    pasta_alvo = r'C:\Users\A CRIATIVA\Desktop\Littlefoot\teams_json'
    traduzir_base_de_dados(pasta_alvo)