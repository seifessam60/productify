import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProducts } from "../lib/api";
import { useNavigate } from "react-router";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useCreateProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/");
    },
    onError: (error) => {
      console.error("Failed to create product:", error);
      alert("Failed to create product. Please try again.");
    },
  });
};
