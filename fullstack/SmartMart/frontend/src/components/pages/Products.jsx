import React, { useEffect, useRef, useState } from "react";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getCategories,
  uploadCSV,
} from "../services/api";
import { FaTrash, FaEdit, FaUpload, FaFileExport } from "react-icons/fa";

export default function Products() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filterCategory, setFilterCategory] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProductData, setEditProductData] = useState({
    id: null,
    name: "",
    price: "",
    brand: "",
    category_id: "",
  });

 
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  
  const fetchProducts = async () => {
    setLoading(true);
    const res = await getProducts();
    setProducts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !brand || !categoryId) {
      alert("Preencha todos os campos!");
      return;
    }

    await createProduct({
      name,
      price: parseFloat(price),
      brand,
      category_id: parseInt(categoryId),
    });

    setName("");
    setPrice("");
    setBrand("");
    setCategoryId("");
    fetchProducts();
  };


  const handleCSVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    await uploadCSV(file);
    setUploading(false);
    fetchProducts();
    alert("CSV importado com sucesso!");
    e.target.value = "";
  };


  const handleExportCSV = () => {
    if (!products.length) {
      alert("Nenhum produto para exportar!");
      return;
    }

    const header = ["name", "brand", "price", "category_id"];
    const rows = products.map((p) => [
      p.name,
      p.brand,
      p.price,
      p.category_id,
    ]);

    const csvContent = [
      header.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const confirmDelete = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    await deleteProduct(selectedProduct.id);
    setModalOpen(false);
    setSelectedProduct(null);
    fetchProducts();
  };


  const openEditModal = (product) => {
    setEditProductData(product);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditProductData({
      ...editProductData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    await updateProduct(editProductData.id, {
      name: editProductData.name,
      price: parseFloat(editProductData.price),
      brand: editProductData.brand,
      category_id: parseInt(editProductData.category_id),
    });

    setEditModalOpen(false);
    fetchProducts();
  };

  {/*Filter Products*/}
  const filteredProducts = filterCategory
    ? products.filter((p) => p.category_id === Number(filterCategory))
    : products;

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 bg-white outline-none transition-colors focus:border-blue-500";

  return (
    <div className="space-y-14">
      {/*Add Product*/}
      <section>
        <div className="p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-1">New Product</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input className={inputClass} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className={inputClass} placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <input type="number" step="0.01" className={inputClass} placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />

            <select className={inputClass} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <div className="md:col-span-2 flex justify-between items-center gap-4">
              <div className="flex gap-3">
                <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} />

                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300"
                >
                  <FaUpload /> {uploading ? "Uploading..." : "Upload CSV"}
                </button>

                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300"
                >
                  <FaFileExport />
                  Export CSV
                </button>
              </div>

              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                + Add Product
              </button>
            </div>
          </form>
        </div>
      </section>

      {/*Filtro*/}
      <div className="max-w-4xl mx-auto px-8 flex items-center gap-4">
        <span className="font-medium">Filter by:</span>
        <select
          className="w-64 h-11 border border-gray-300 rounded-lg px-4"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/*Produtos*/}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8 max-w-6xl mx-auto">
          {filteredProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow-md p-4 relative">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-sm text-gray-600">Marca: {p.brand}</p>
              <p className="text-sm text-gray-600">Price: {p.price.toFixed(2)}</p>

              <div className="absolute top-3 right-3 flex gap-2">
                <button onClick={() => openEditModal(p)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit size={16} />
                </button>
                <button onClick={() => confirmDelete(p)} className="text-red-500 hover:text-red-700">
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* Modal Delete*/}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl">
            <p>Delete <strong>{selectedProduct?.name}</strong>?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setModalOpen(false)}>Cancel</button>
              <button onClick={handleDelete} className="text-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit*/}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <form onSubmit={handleUpdateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" className={inputClass} value={editProductData.name} onChange={handleEditChange} />
              <input name="brand" className={inputClass} value={editProductData.brand} onChange={handleEditChange} />
              <input name="price" type="number" step="0.01" className={inputClass} value={editProductData.price} onChange={handleEditChange} />
              <select name="category_id" className={inputClass} value={editProductData.category_id} onChange={handleEditChange}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>

              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setEditModalOpen(false)}>Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
