import os
import json

diretorio = r'C:\Users\A CRIATIVA\Desktop\Littlefoot\teams_json' 

def injetar_id():
    id_atual = 1
    
    for nome_arquivo in os.listdir(diretorio):
        if nome_arquivo.endswith('.json'):
            caminho_completo = os.path.join(diretorio, nome_arquivo)
            
            with open(caminho_completo, 'r', encoding='utf-8') as f:
                dados_time = json.load(f)
            
            dados_time = {'id_time': id_atual, **dados_time}
            
            with open(caminho_completo, 'w', encoding='utf-8') as f:
                json.dump(dados_time, f, ensure_ascii=False, indent=4)
                
            id_atual += 1
            
    quant_times = id_atual - 1 
    print(f"Operação concluída. {quant_times} times receberam seus IDs na raiz.")

if __name__ == '__main__':
    injetar_id()