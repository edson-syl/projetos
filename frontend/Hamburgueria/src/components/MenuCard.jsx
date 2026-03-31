import { motion } from "framer-motion"

function MenuCard({ item }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-zinc-900/80 backdrop-blur rounded-2xl overflow-hidden shadow-xl border border-white/5"
    >

      {/* IMAGEM */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition duration-500 hover:scale-110"
        />

        {/* TAG */}
        {item.tag && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-md">
            {item.tag}
          </span>
        )}
      </div>

      {/* CONTEÚDO */}
      <div className="p-4">

        <h2 className="text-lg font-bold mb-1 text-white">
          {item.name}
        </h2>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* PREÇO */}
        <div className="flex justify-center">
          <span className="text-yellow-400 text-xl font-extrabold">
            R$ {item.price}
          </span>
        </div>

      </div>
    </motion.div>
  )
}

export default MenuCard