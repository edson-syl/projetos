import { motion } from "framer-motion"

function Navbar() {
  const menuItems = [
    { label: "Cardápio", id: "cardapio" },
    { label: "Promoções", id: "promocoes" },
    { label: "Localização", id: "localizacao" }
  ]

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 md:px-6 py-4">

        {/* LOGO */}
        <motion.h1
          whileHover={{ scale: 1.03 }}
          onClick={() => {
          const el = document.querySelector("#home");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
          className="text-2xl md:text-3xl font-black tracking-wider text-white cursor-pointer"
        >
          Burger<span className="bg-linear-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,200,0,0.6)]">Top</span>
        </motion.h1>

        {/* MENU */}
        <nav className="hidden md:flex gap-10 text-sm font-medium">
          {menuItems.map((item, index) => (
            <motion.a
              key={index}
              href={`#${item.id}`}
              whileHover={{ y: -2 }}
              className="relative text-white/70 hover:text-white transition duration-300 group tracking-wide"
            >
              {item.label}

              <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </motion.a>
          ))}
        </nav>

      </div>
    </motion.header>
  )
}

export default Navbar