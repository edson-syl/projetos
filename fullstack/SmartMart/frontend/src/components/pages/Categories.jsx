import React, { useEffect, useState } from "react";
import { getCategories, deleteCategory, createCategory } from "../services/api";
import { FaTrash } from "react-icons/fa";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const confirmDelete = (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    try {
      await deleteCategory(selectedCategory.id);
      setModalOpen(false);
      setSelectedCategory(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar categoria");
    }
  };

  return (
    <div className="space-y-12 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
      <CategoryForm onSuccess={fetchCategories} />

      {/*Categories*/}
      {loading ? (
        <p className="text-center text-gray-500">Carregando categorias...</p>
      ) : (
        <TransitionGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c) => (
            <CSSTransition
              key={c.id}
              timeout={300}
              classNames={{
                enter: "opacity-0",
                enterActive: "opacity-100 transition-opacity duration-300",
                exit: "opacity-100",
                exitActive: "opacity-0 transition-opacity duration-300",
              }}
            >
              <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition relative">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {c.name}
                </h3>

                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  <button
                    onClick={() => confirmDelete(c)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}

      {/*Delete*/}
      {modalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <p className="mb-4 text-gray-800">
              Deseja realmente excluir{" "}
              <strong>{selectedCategory.name}</strong>?
            </p>
            <div className="flex justify-around">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setSelectedCategory(null);
                }}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function CategoryForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Digite o nome da categoria!");
      return;
    }

    setLoading(true);
    try {
      await createCategory({ name: name.trim() });
      setName("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert("Erro ao criar categoria");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 items-center"
    >
      <input
        type="text"
        className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Category"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className={`bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Adding..." : "+ Add Category"}
      </button>
    </form>
  );
}
