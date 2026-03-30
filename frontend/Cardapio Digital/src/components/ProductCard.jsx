import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { ToastContext } from "../context/ToastContext"

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext)

  const { showToast } = useContext(ToastContext)

  return (
    <div className="bg-zinc-900/60 backdrop-blur-md rounded-2xl overflow-hidden 
shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-zinc-800">

  <img
    src={product.image}
    alt={product.name}
    className="w-full h-40 object-cover"
  />

  <div className="p-4">
    <h2 className="font-medium text-base text-zinc-100 mb-1">
      {product.name}
    </h2>

    <p className="text-zinc-400 text-sm mb-4">
      {product.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}
    </p>

    <button
      onClick={() => {
        addToCart(product)
        showToast(`${product.name} adicionado`)
      }}
      className="w-full bg-white text-zinc-900 py-2 rounded-lg 
      font-medium hover:bg-zinc-200 active:scale-95 transition"
    >
      Adicionar
    </button>
  </div>
</div>
  )
}

export default ProductCard