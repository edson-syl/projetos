import { motion } from "framer-motion"

function Promo() {
  return (
    <section id="promocoes" className="relative py-20 px-4 text-center overflow-hidden">

      {/* FUNDO GRADIENTE */}
      <div className="absolute inset-0 bg-linear-to-br from-yellow-400 via-orange-500 to-red-500 animate-pulse" />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* CONTEÚDO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl mx-auto text-white"
      >

        {/* BADGE */}
        <div className="inline-block bg-red-600 px-4 py-1 rounded-full text-sm mb-4 font-semibold shadow-lg">
          🔥 OFERTA RELÂMPAGO
        </div>

        {/* TÍTULO */}
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg">
          X-Tudo Monstro
        </h2>

        {/* DESCRIÇÃO */}
        <p className="text-lg text-white/90 mb-6">
          🍔 + 🍟 + 🥤 Combo completo pra matar sua fome
        </p>

        {/* PREÇO */}
        <div className="mb-8">
          <span className="text-sm line-through text-white/70 mr-2">
            R$ 39,90
          </span>

          <span className="text-6xl font-extrabold text-yellow-300 drop-shadow-[0_0_20px_rgba(255,255,0,0.8)]">
            R$ 29,90
          </span>
        </div>

        {/* BOTÃO */}
        <motion.a
          href="https://wa.me/5581999999999?text=Quero%20a%20promoção%20do%20dia"
          target="_blank"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-green-500 px-10 py-4 rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(34,197,94,0.8)] hover:bg-green-400 transition-all"
        >
          💥 Garantir Meu Combo
        </motion.a>

        {/* URGÊNCIA */}
        <p className="text-sm text-white/80 mt-6 animate-pulse">
          ⚡ Restam poucas unidades • acaba hoje
        </p>

      </motion.div>
    </section>
  )
}

export default Promo 