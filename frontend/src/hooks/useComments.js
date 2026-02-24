import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment, deleteComment } from "../lib/api";

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onSuccess: (_, variables) => {
      // Invalidate both the products list and the specific product
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", variables.productId],
      });
    },
    onError: (error) => {
      console.error("Failed to add comment:", error);
    },
  });
};

export const useDeleteComment = (productId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (productId) {
        queryClient.invalidateQueries({ queryKey: ["product", productId] });
      }
    },
    onError: (error) => {
      console.error("Failed to delete comment:", error);
    },
  });
};
