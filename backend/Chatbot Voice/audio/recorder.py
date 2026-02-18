import sounddevice as sd
import soundfile as sf

def gravar_audio(fs=16000, duracao=3, channels=1, arquivo="data/input.wav"):
    print("Fale agora...")
    record = sd.rec(int(duracao * fs), samplerate=fs, channels=channels)
    sd.wait()
    sf.write(arquivo, record, fs)
    print("Gravou!")