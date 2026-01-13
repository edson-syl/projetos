import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});


export const getProducts = () => api.get("/products");
export const createProduct = (product) => api.post("/products", product);
export const uploadCSV = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/products/upload-csv", formData);
};
export const updateProduct = (id, product) => api.put(`/products/${id}`, product);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export const getCategories = () => api.get("/categories");
export const createCategory = (category) => api.post("/categories", category);
export const deleteCategory = (categoryId) => api.delete(`/categories/${categoryId}`);

export const getSales = () => api.get("/sales");
export const createSale = (sale) => api.post("/sales", sale);
