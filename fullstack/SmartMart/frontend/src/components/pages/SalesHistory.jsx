import React, { useEffect, useState } from "react";
import { getSales, getProducts, createSale } from "../services/api"

export default function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(true);

  const [newSale, setNewSale] = useState({
    product_id: "",
    quantity: "",
    date: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        const map = {};
        res.data.forEach((p) => (map[p.id] = { name: p.name, price: p.price }));
        setProductsMap(map);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const res = await getSales();
      setSales(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const totalPrice = newSale.product_id
    ? newSale.quantity
      ? productsMap[newSale.product_id].price * parseInt(newSale.quantity)
      : 0
    : 0;

  const sortedSales = [...sales].sort((a, b) => {
    if (sortField === "date") {
      return sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    } else if (sortField === "total_price") {
      return sortOrder === "asc"
        ? a.total_price - b.total_price
        : b.total_price - a.total_price;
    }
    return 0;
  });

  const handleExportCSV = () => {
    if (!sales.length) {
      alert("Nenhuma venda para exportar!");
      return;
    }


    const orderedSales = [...sales].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    const header = [
      "product",
      "quantity",
      "total_price",
      "date",
    ];

    const rows = orderedSales.map((s) => [
      productsMap[s.product_id]?.name || "Produto desconhecido",
      s.quantity,
      s.total_price,
      s.date,
    ]);

    const csvContent = [
      header.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sales_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add sale
  const handleAddSale = async (e) => {
    e.preventDefault();
    const { product_id, quantity, date } = newSale;

    if (!product_id || !quantity || !date) {
      setMessage("Preencha todos os campos!");
      return;
    }

    try {
      await createSale({
        product_id: parseInt(product_id),
        quantity: parseInt(quantity),
        total_price: totalPrice,
        date,
      });
      setMessage("Venda adicionada com sucesso!");
      setNewSale({ product_id: "", quantity: "", date: "" });
      fetchSales();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Erro ao adicionar venda");
    }
  };

  if (loading)
    return <p className="text-center mt-4 text-gray-600">Carregando histórico de vendas...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sale History</h2>

      {/*Form*/}
      <form
        onSubmit={handleAddSale}
        className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end"
      >
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Product</label>
          <select
            className="border rounded p-2 w-full"
            value={newSale.product_id}
            onChange={(e) => setNewSale({ ...newSale, product_id: e.target.value })}
          >
            <option value="">Select the product</option>
            {Object.entries(productsMap).map(([id, p]) => (
              <option key={id} value={id}>
                {p.name} - R$ {p.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            className="border rounded p-2 w-full"
            value={newSale.quantity}
            onChange={(e) => setNewSale({ ...newSale, quantity: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Date</label>
          <input
            type="date"
            className="border rounded p-2 w-full"
            value={newSale.date}
            onChange={(e) => setNewSale({ ...newSale, date: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Total</label>
          <input
            type="text"
            className="border rounded p-2 w-full bg-gray-100"
            value={`R$ ${totalPrice.toFixed(2)}`}
            disabled
          />
        </div>

        <button
          type="submit"
          className="sm:col-span-4 bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Sale
        </button>
      </form>

      {message && <p className="mb-4 text-center text-sm font-medium text-green-600">{message}</p>}

      {/* Filter*/}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-end justify-between">
        <div className="flex gap-4">
          <div>
            <label className="mr-2 font-semibold text-gray-700">Order by:</label>
            <select
              className="border rounded p-2"
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="total_price">Total Value</option>
            </select>
          </div>
          <div>
            <label className="mr-2 font-semibold text-gray-700">Order:</label>
            <select
              className="border rounded p-2"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Crescent</option>
              <option value="desc">Decrescent</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleExportCSV}
          className="border px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Export CSV
        </button>
      </div>

      {/*Cards*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedSales.map((s) => (
          <div
            key={s.id}
            className="p-4 bg-white rounded-xl shadow hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <h3 className="font-semibold text-gray-800 text-lg mb-1">
              {productsMap[s.product_id]?.name || "Produto desconhecido"}
            </h3>
            <p className="text-gray-600 text-sm mb-1">Quantidade: {s.quantity}</p>
            <p className="text-gray-600 text-sm mb-1">
              Total: R$ {s.total_price.toFixed(2)}
            </p>
            <p className="text-gray-500 text-xs">Data: {s.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
