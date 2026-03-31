import { motion } from "framer-motion"
import { FaStar } from "react-icons/fa"

function Testimonials() {
  const reviews = [
    {
      name: "Carlos Silva",
      text: "Melhor hambúrguer que já comi, chegou rápido demais!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Ana Souza",
      text: "Muito top, pedi pelo WhatsApp e foi super fácil!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "João Pedro",
      text: "Preço justo e qualidade absurda, virei cliente!",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
    },
  ]

  return (
    <section className="relative bg-black py-20 px-4 overflow-hidden">

      {/* FUNDO */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-zinc-900 to-black opacity-80" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* TÍTULO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Clientes <span className="text-yellow-400">Apaixonados</span>
          </h2>

          <p className="text-gray-400 mt-3">
            Quem prova, sempre volta
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-zinc-900/80 backdrop-blur p-6 rounded-2xl border border-white/5 shadow-xl"
            >

              {/* HEADER */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-white">
                    {review.name}
                  </p>

                  <div className="flex text-yellow-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>

              {/* TEXTO */}
              <p className="text-gray-300 text-sm leading-relaxed">
                “{review.text}”
              </p>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Testimonials