# CHATBOT VOICE 🤖🎙️
### Assistente de Voz com IA (Whisper + Ollama + gTTS)

Um assistente de voz em Python que:

🎙 Grava áudio do microfone
📝 Transcreve usando Whisper
🤖 Envia o texto para um modelo LLM via Ollama
🔊 Converte a resposta para voz usando gTTS
▶ Reproduz o áudio com pygame

## ⚙️ Requisitos

Python 3.10+ 
Microfone funcionando
Internet (para gTTS)
Ollama instalado


## 📦 Instalando Dependências

Instale todas as bibliotecas necessárias:

pip install sounddevice
pip install soundfile
pip install openai-whisper
pip install ollama
pip install gtts
pip install pygame


Ou tudo de uma vez:

pip install sounddevice soundfile openai-whisper ollama gtts pygame

## 🤖 Instalando o Ollama

Baixe e instale o Ollama:

👉 https://ollama.com/download

Depois rode no terminal:

ollama pull llama3