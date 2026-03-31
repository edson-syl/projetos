import { motion } from "framer-motion"
import { FaWhatsapp, FaStar } from "react-icons/fa"

function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">

      {/* IMAGEM */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1550547660-d9450f859349"
          alt="Hambúrguer"
          className="w-full h-full object-cover scale-110 brightness-75 contrast-110 saturate-150"
        />

        {/* OVERLAY GRADIENTE */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/50 to-black/90" />
      </div>

      {/* CONTEÚDO */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-2xl"
      >

        {/* BADGE */}
        <div className="flex items-center justify-center gap-2 mb-4 text-yellow-400 text-sm">
          <FaStar />
          <span className="text">Mais bem avaliado da cidade</span>
        </div>

        {/* TÍTULO */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight text-white">
          O Hambúrguer <span className="text-yellow-400">Perfeito</span> Existe
        </h1>

        {/* DESCRIÇÃO */}
        <p className="text-gray-300 text-base md:text-lg mb-8">
          Pão selado na manteiga, carne suculenta e aquele sabor que vicia.
        </p>

        {/* BOTÃO */}
        <motion.a
          href="https://wa.me/5581999999999?text=Quero%20fazer%20um%20pedido"
          target="_blank"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 bg-green-500 px-8 py-4 rounded-xl text-lg font-bold shadow-[0_0_25px_rgba(34,197,94,0.6)] hover:bg-green-600 transition"
        >
          <FaWhatsapp size={22} />
          Pedir no WhatsApp
        </motion.a>
      </motion.div>

    </section>
  )
}

export default Hero