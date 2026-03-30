import Home from "./pages/Home"
import { CartProvider } from "./context/CartContext"
import Cart from "./components/Cart"
import { ToastProvider } from "./context/ToastContext"

function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <Home />
        <Cart />
      </ToastProvider>
    </CartProvider>
    
  )
}

export default App