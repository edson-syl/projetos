import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"

import { Html5Qrcode } from "html5-qrcode"


function Cart() {

  function handleScanMesa() {
    const qr = new Html5Qrcode("reader")

    qr.start(
      { facingMode: "environment" }, // câmera traseira
      { fps: 10, qrbox: 250 },
      (decodedText) => {
        // exemplo de QR: ?mesa=5
        const url = new URL(decodedText, window.location.origin)
        const mesaParam = url.searchParams.get("mesa")

        if (mesaParam) {
          window.location.search = `?mesa=${mesaParam}`
          qr.stop()
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  function handleCheckout() {
  if (cart.length === 0) return

  const message = cart
    .map(
      (item) =>
        `• ${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`
    )
    .join("\n")

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )


  const finalMessage = `Pedido ${
  mesa ? `(Mesa ${mesa})` : ""
  }:\n\n${message}\n\nTotal: R$ ${total.toFixed(2)}`

  const phone = "558192281271" // num de contato
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`

  window.open(url, "_blank")
}

  const { cart, removeFromCart, decreaseQuantity } = useContext(CartContext)
  const [isOpen, setIsOpen] = useState(false)

   const params = new URLSearchParams(window.location.search)
  const mesa = params.get("mesa")

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 
        backdrop-blur-md bg-zinc-800/70 text-white 
        px-4 py-3 rounded-full shadow-lg 
        flex items-center gap-2 
        hover:scale-105 active:scale-95 transition"
      >
        <span>🛒</span>
        <span className="text-sm font-medium">{cart.length}</span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 w-full 
    bg-zinc-900/70 backdrop-blur-xl 
    p-4 text-zinc-100 rounded-t-3xl 
    shadow-2xl border-t border-zinc-800 transition-all duration-300">

      <button
        onClick={() => setIsOpen(false)}
        className="mb-3 text-xs text-zinc-400 hover:text-zinc-200 transition"
      >
        Fechar
      </button>

      <h2 className="font-semibold text-lg mb-3">
        Carrinho
      </h2>

      {cart.length === 0 ? (
        <p className="text-zinc-500 text-sm">Carrinho vazio</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-3"
            >
              <div>
                <p className="text-sm">{item.name}</p>
                <p className="text-xs text-zinc-500">
                  x{item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="w-7 h-7 flex items-center justify-center 
                  rounded-md border border-zinc-700 
                  hover:bg-zinc-800 transition"
                >
                  −
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-7 h-7 flex items-center justify-center 
                  rounded-md border border-zinc-700 
                  hover:bg-zinc-800 transition"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 border-t border-zinc-800 pt-3 flex justify-between font-medium">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          <button
            onClick={mesa ? handleCheckout : handleScanMesa}
            className={`mt-4 w-full py-3 rounded-xl font-medium transition
            bg-white text-zinc-900 hover:bg-zinc-200 active:scale-95"  
            `}
          >
            {mesa ? "Finalizar Pedido" : "Informe a mesa"}
          </button>
        </>
      )}

      <div id="reader" className="mt-4 rounded-lg overflow-hidden" />
    </div>
  )
}

export default Cart