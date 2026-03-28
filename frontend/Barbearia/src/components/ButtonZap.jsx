import "../styles/global.css"
import "../styles/button-zap.css"

import ImgWhatsapp from "../assets/whatsapp.png"

function ButtonZap() {
    return (
        <>
            <a
            href="https://wa.me/5581992281271?text=Olá,%20quero%20agendar%20um%20corte!"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
            >
            <img src={ImgWhatsapp}></img>
            </a>
        </>
    )
}

export default ButtonZap