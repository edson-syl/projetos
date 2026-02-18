from audio.recorder import gravar_audio
from audio.player import falar
from audio.model import carregar_modelo
from speech.transcriber import transcrever_audio
from core.assistant import perguntar_ia
import pygame
import warnings 
warnings.filterwarnings("ignore")

print("Sistema iniciado")

def iniciar():
    print("Assistente pronto")

if __name__ == "__main__":
    iniciar()

    pygame.mixer.init()
    modelo = carregar_modelo("base") # Carregar modelo

    while True:
        gravar_audio()
        texto = transcrever_audio(modelo) # Modelo passado e transcrito\
        print(f"You: {texto}" )
        if texto.upper().strip() in ["SAIR", "SAI", "SAI.", "SAI!"]:
            print("Assistente encerrado!")
            break
        if not texto.strip():
            print("Não entendi, tente novamente.")
            continue

        resposta = perguntar_ia(texto)
        falar(resposta)
