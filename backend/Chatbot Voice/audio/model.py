import whisper as wp

def carregar_modelo(nome_modelo="base"):
    return wp.load_model(nome_modelo)