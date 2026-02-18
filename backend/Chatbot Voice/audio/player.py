import pygame
import time
from gtts import gTTS

def falar(texto):
    if pygame.mixer.music.get_busy():
        pygame.mixer.music.stop()
    
    pygame.mixer.music.unload()
    time.sleep(0.2)
        
    tts = gTTS(text=texto, lang="pt-br")
    tts.save("data/output.mp3")
    
    pygame.mixer.music.load("data/output.mp3")
    pygame.mixer.music.play()
    while pygame.mixer.music.get_busy():
        time.sleep(0.3)