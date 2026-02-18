import ollama

def perguntar_ia(texto):
    resposta = ollama.chat(
        model="phi3:mini",
        messages=[
        {"role": "system", "content" : "Responda sempre em português do Brasil. Seja direto, objetivo e use no máximo uma frase curta."},
        {"role": "user", "content": texto}],
        stream= True
    )

    resposta_completa = ""

    for r in resposta:
        parte = r["message"]["content"]
        print(parte, end="")
        resposta_completa += parte
        
    print()
    return resposta_completa