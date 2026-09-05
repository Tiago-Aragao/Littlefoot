import json
from pathlib import Path
"""
Script para pegar os nomes de arquivos que tinha sigla de paises para eu transformar em nomes de paises completos para
criar o gerar_nomes para meu metodo Fabrica_Junior.    
"""

#caminho_nomes = Path(r"C:\Users\Tiago\Desktop\Littlefoot\data\nomes\nomes_pais")
caminho_sobrenomes = Path(r"C:\Users\Tiago\Desktop\Littlefoot\data\nomes\sobrenome_pais")
nomes_arquivos = [arquivo.stem for arquivo in caminho_sobrenomes.iterdir() if arquivo.is_file()]
arquivo_saida = "sobrenomes_arquivos.json"

with open(arquivo_saida, "w", encoding="utf-8") as f:
    json.dump(nomes_arquivos, f, ensure_ascii=False, indent=4)

print(f"Arquivo '{arquivo_saida}' foi criado com {len(nomes_arquivos)} nomes salvos.")