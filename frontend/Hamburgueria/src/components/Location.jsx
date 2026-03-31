import { motion } from "framer-motion"
import { FaMapMarkerAlt, FaDirections } from "react-icons/fa"

function Location() {
  return (
    <section id="localizacao" className="relative py-20 px-4 overflow-hidden">

      {/* FUNDO */}
      <div className="absolute inset-0 bg-linear-to-b from-zinc-900 via-black to-zinc-900" />

      <div className="relative z-10 max-w-5xl mx-auto text-center text-white">

        {/* TÍTULO */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          Venha Nos Visitar
        </motion.h2>

        <p className="text-gray-400 mb-10">
          Estamos te esperando com o melhor hambúrguer da região
        </p>

        {/* MAPA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        >
          <iframe
            className="w-full h-72 md:h-96"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126418.2018706715!2d-34.934217049999994!3d-8.043311199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab196f94e5408b%3A0xe5800ef782bde3a6!2sRecife%2C%20PE!5e0!3m2!1spt-BR!2sbr!4v1774981770382!5m2!1spt-BR!2sbr"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>

        {/* INFO */}
        <div className="mt-8 space-y-2 text-gray-300">

          <div className="flex items-center justify-center gap-2">
            <FaMapMarkerAlt />
            <span>Hamburgueria</span>
          </div>

          <p className="text-sm">
            Recife - PE
          </p>

        </div>

        {/* BOTÃO DIREÇÕES */}
        <motion.a
          href="https://maps.app.goo.gl/gtZnFi1wDG14AbSs8"
          target="_blank"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 mt-6 bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition"
        >
          <FaDirections />
          Como chegar
        </motion.a>

      </div>
    </section>
  )
}

export default Location