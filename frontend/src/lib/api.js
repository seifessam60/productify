import axiosInstance from "./axios";

// Users
export const syncUser = async (userData) => {
  const response = await axiosInstance.post("/users/sync", userData);
  return response.data;
};

// Products
export const getProducts = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const getMyProducts = async () => {
  const response = await axiosInstance.get("/products/my");
  return response.data;
};

export const getProduct = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axiosInstance.post("/products", productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axiosInstance.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
};

// Comments
export const addComment = async (commentData) => {
  const response = await axiosInstance.post("/comments", commentData);
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await axiosInstance.delete(`/comments/${id}`);
  return response.data;
};
