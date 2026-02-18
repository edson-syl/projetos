def transcrever_audio(modelo, arquivo="data/input.wav"):
    resultado = modelo.transcribe(arquivo, language = "pt")
    return resultado["text"]
