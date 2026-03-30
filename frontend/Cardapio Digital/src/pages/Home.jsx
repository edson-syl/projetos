import { products } from "../data/products"
import ProductCard from "../components/ProductCard"

function Home() {
const params = new URLSearchParams(window.location.search)
const mesa = params.get("mesa")

return ( 
  <div className="bg-zinc-950 min-h-screen text-zinc-100 px-5 py-6 pb-26">
    <header className="mb-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Cardápio
      </h1>

      {mesa && (
        <p className="text-zinc-400 text-sm mt-1">
          Mesa {mesa}
        </p>
      )}

      <p className="text-zinc-500 text-sm">
        Faça seu pedido
      </p>
    </header>

    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>

  </div>

  )
}

export default Home
