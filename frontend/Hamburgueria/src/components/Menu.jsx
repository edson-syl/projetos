import { menu } from "../data/menu"
import MenuCard from "./MenuCard"
import { motion } from "framer-motion"

function Menu() {
  return (
    <section
      id="cardapio"
      className="relative py-20 px-4 bg-black overflow-hidden"
    >

      {/* FUNDO */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-zinc-900 to-black opacity-80" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* TÍTULO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Escolha Seu <span className="text-yellow-400">Favorito</span>
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto">
            Feitos na hora, com ingredientes selecionados e muito sabor.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {menu.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <MenuCard item={item} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Menu