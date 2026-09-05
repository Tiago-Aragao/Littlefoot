import os
import json

MAPA_SIGLAS = {
    "AFG": "Afeganistão", "AFS": "Africa do Sul", "AGO": "Angola", "AIA": "Anguilla", 
    "ALB": "Albânia", "ALE": "Alemanha", "ALG": "Argélia", "AND": "Andorra", 
    "ARG": "Argentina", "ARM": "Armênia", "ARS": "Arábia Saudita", "ARU": "Aruba", 
    "ATG": "Antígua", "AUS": "Austrália", "AUT": "Áustria", "AZE": "Azerbaijão", 
    "BAH": "Bahamas", "BAN": "Bangladesh", "BAR": "Barbados", "BEL": "Bélgica", 
    "BEN": "Benin", "BER": "Bermudas", "BHR": "Bahrain", "BIE": "Belarus", 
    "BKF": "Burkina Faso", "BLZ": "Belize", "BOL": "Bolivia", "BOS": "Bósnia", 
    "BOT": "Botsuana", "BRA": "Brasil", "BRU": "Brunei", "BUL": "Bulgária", 
    "BUR": "Burundi", "BUT": "Butão", "CAM": "Camarões", "CAN": "Canadá", 
    "CAT": "Catar", "CAV": "Cabo Verde", "CAZ": "Cazaquistão", "CHA": "Chade", 
    "CHI": "Chile", "CHN": "China", "CMJ": "Camboja", "CNG": "Congo", 
    "COL": "Colômbia", "COM": "Comores", "CPR": "Coreia do Norte", "CRN": "Coreia do Norte", 
    "CRO": "Croácia", "CRS": "Coreia do Sul", "CSR": "Costa Rica", "CUB": "Cuba", 
    "CUR": "Curaçao", "DIN": "Dinamarca", "DJI": "Djibouti", "DOM": "Dominica", 
    "EGI": "Egito", "ELQ": "Guiné Equatorial", "ELS": "El Salvador", "EMI": "Emirados Árabes", 
    "EQU": "Equador", "ERI": "Eritréia", "ESC": "Escócia", "ESP": "Espanha", 
    "EST": "Estônia", "ESV": "Eslováquia", "ETI": "Etiópia", "EUA": "EUA", 
    "FIJ": "Fiji", "FIL": "Filipinas", "FIN": "Finlândia", "FRA": "França", 
    "GAB": "Gabão", "GAM": "Gâmbia", "GAN": "Gana", "GDA": "Granada", 
    "GEO": "Geórgia", "GFR": "Guiana Francesa", "GIB": "Gibraltar", "GMA": "Guatemala", 
    "GNB": "Guiné-Bissau", "GNE": "Guiné Equatorial", "GRA": "Granada", "GRE": "Grécia", 
    "GUA": "Guiana", "GUI": "Guiné", "GUN": "Guam", "HAI": "Haiti", 
    "HKG": "Hong Kong", "HOL": "Holanda", "HON": "Honduras", "HUN": "Hungria", 
    "ICA": "Ilhas Cayman", "ICM": "Ilhas Virgens Britânicas", "ICO": "Ilhas Cook", "IDO": "Indonésia", 
    "IEM": "Iêmen", "IFA": "Ilhas Faroe", "IMA": "Ilhas Marshall", "IMR": "Maurício", 
    "IND": "Índia", "ING": "Inglaterra", "IRA": "Irã", "IRL": "Irlanda", 
    "IRN": "Irã", "IRQ": "Iraque", "ISA": "Ilhas Salomão", "ISL": "Islândia", 
    "ISR": "Israel", "ITA": "Itália", "ITC": "Ilhas Turcas e Caicos", "IVA": "Vanuatu", 
    "IVB": "Ilhas Virgens Britânicas", "JAM": "Jamaica", "JAP": "Japão", "JOR": "Jordânia", 
    "KIR": "Kiribati", "KOS": "Kosovo", "KUW": "Kuwait", "LAO": "Laos", 
    "LBN": "Líbano", "LES": "Lesoto", "LET": "Letônia", "LIB": "Líbia", 
    "LIE": "Liechtenstein", "LIT": "Lituânia", "LRI": "Libéria", "LUX": "Luxemburgo", 
    "MAC": "Macau", "MAD": "Madagascar", "MAL": "Malásia", "MAR": "Marrocos", 
    "MAU": "Mauritânia", "MCD": "Macedônia do Norte", "MEX": "México", "MGL": "Mongólia", 
    "MIA": "Mianmar", "MIC": "Micronésia", "MLD": "Moldávia", "MLI": "Mali", 
    "MNC": "Mônaco", "MOC": "Moçambique", "MOL": "Moldávia", "MON": "Montenegro", 
    "MST": "Montserrat", "MTA": "Malta", "MTI": "Maurício", "MWI": "Malawi", 
    "NAM": "Namíbia", "NAU": "Nauru", "NCA": "Nicarágua", "NEP": "Nepal", 
    "NIC": "Nicarágua", "NIG": "Nigéria", "NIR": "Irlanda do Norte", "NOR": "Noruega", 
    "NOZ": "Nova Zelândia", "OMA": "Omã", "PAL": "Palestina", "PAN": "Panamá", 
    "PAQ": "Paquistão", "PAR": "Paraguai", "PER": "Peru", "PGA": "País de Gales", 
    "PLU": "Palau", "PNG": "Papua Nova Guiné", "POL": "Polônia", "POR": "Portugal", 
    "PRI": "Porto Rico", "QUE": "Quênia", "QUI": "Quirguistão", "RCA": "Rep. Centro-Africana", 
    "RDG": "Rep. Dem. Congo", "RDO": "Rep. Dominicana", "ROM": "Romênia", "RTC": "República Tcheca", 
    "RUA": "Ruanda", "RUS": "Rússia", "SAM": "Samoa", "SAN": "San Marino", 
    "SCN": "São Cristovão e Neves", "SEN": "Senegal", "SER": "Sérvia", "SEY": "Seychelles", 
    "SIN": "Singapura", "SIR": "Síria", "SLE": "Serra Leoa", "SME": "São Tomé e Príncipe", 
    "SOM": "Somália", "SRI": "Sri Lanka", "STL": "Santa Lúcia", "STP": "São Tomé e Príncipe", 
    "SUA": "Essuatíni", "SUD": "Sudão", "SUE": "Suécia", "SUI": "Suíça", 
    "SUR": "Suriname", "SUS": "Sudão do Sul", "SVG": "São Vicente e Granadinas", "TAD": "Tadjiquistão", 
    "TAI": "Tailândia", "TAN": "Tanzânia", "TAW": "Taiwan", "TCM": "Turcomenistão", 
    "TGO": "Togo", "TML": "Timor-Leste", "TON": "Tonga", "TRT": "Trinidad e Tobago", 
    "TTI": "Tahiti", "TUN": "Tunísia", "TUR": "Turquia", "TUV": "Tuvalu", 
    "UCR": "Ucrânia", "UGA": "Uganda", "URU": "Uruguai", "UZB": "Uzbequistão", 
    "VAN": "Vanuatu", "VEN": "Venezuela", "VIE": "Vietnã", "ZAM": "Zâmbia", 
    "ZIM": "Zimbábue"
}

banco_final = {}

def processar_pasta(caminho_pasta, tipo_dado):
    """ Lê os arquivos .txt e agrupa no banco final sob o nome do país """
    if not os.path.exists(caminho_pasta):
        print(f"⚠️ Erro: Pasta '{caminho_pasta}' não encontrada.")
        return

    for arquivo in os.listdir(caminho_pasta):
        if arquivo.endswith(".txt"):
            sigla = arquivo.replace(".txt", "")
            
            nome_pais = MAPA_SIGLAS.get(sigla)
            
            if not nome_pais:
                print(f"⚠️ AVISO: Sigla '{sigla}' não mapeada. Salvando como '{sigla}'.")
                nome_pais = sigla

            if nome_pais not in banco_final:
                banco_final[nome_pais] = {"nomes": [], "sobrenomes": []}
                
            caminho_completo = os.path.join(caminho_pasta, arquivo)
            with open(caminho_completo, 'r', encoding='utf-8', errors='ignore') as f:
                # Remove espaços em branco e linhas vazias
                linhas = [linha.strip() for linha in f.readlines() if linha.strip()]
                banco_final[nome_pais][tipo_dado].extend(linhas)

# Ajuste esses caminhos se suas pastas estiverem em outro diretório
processar_pasta(r'C:\Users\Tiago\Desktop\Littlefoot\data\nomes\nomes_pais', 'nomes')
processar_pasta(r'C:\Users\Tiago\Desktop\Littlefoot\data\nomes\sobrenome_pais', 'sobrenomes')

# Exporta o JSON consolidado
caminho_saida = './data/nomes/banco_de_nomes.json'
with open(caminho_saida, 'w', encoding='utf-8') as f:
    json.dump(banco_final, f, ensure_ascii=False, indent=2)

print(f"✅ Sucesso! Arquivo gerado em: {caminho_saida}")