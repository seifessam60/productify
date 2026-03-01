import { useParams, Link } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
import { useProduct, useUpdateProduct } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import EditProductForm from "../components/EditProductForm";

function EditProduct() {
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();

  const { data: product, isLoading } = useProduct(id);
  const updateProduct = useUpdateProduct();

  if (isLoading) return <LoadingSpinner />;

  if (!product || product.user.id !== userId) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/" className="btn btn-primary mt-4">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <EditProductForm
      product={product}
      isPending={updateProduct.isPending}
      isError={updateProduct.isError}
      onSubmit={(formData) => {
        updateProduct.mutate(
          { id, ...formData },
          {
            onSuccess: () => navigate(`/product/${id}`),
          },
        );
      }}
    />
  );
}

export default EditProduct;
