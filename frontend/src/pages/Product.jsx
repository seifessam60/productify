import { useParams, Link } from "react-router";
import { useProduct, useDeleteProduct } from "../hooks/useProducts";
import CommentsSection from "../components/CommentsSection";
import LoadingSpinner from "../components/LoadingSpinner";
import { CalendarIcon, UserIcon, ShoppingCartIcon } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

function Product() {
  const { id } = useParams();
  const { userId } = useAuth();
  const { data: product, isLoading, error } = useProduct(id);
  const deleteMutation = useDeleteProduct();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error loading product. Please try again later.</span>
        </div>
      </div>
    );
  }

  if (!product) {
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
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between gap-2 text-sm breadcrumbs mb-8">
        <ul>
          <li>
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li className="text-base-content/50">{product.name}</li>
        </ul>
        <div className="flex gap-2 items-center">
          <Link to={`/product/${id}/edit`} className="btn btn-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-error text-white"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <figure className="relative aspect-square overflow-hidden rounded-2xl bg-base-200">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
          </figure>
        </div>

        <div className="card bg-base-300/50 backdrop-blur-md border border-base-content/5 shadow-2xl overflow-hidden">
          <div className="card-body gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-black bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 leading-tight">
                {product.title}
              </h1>

              <div className="flex flex-wrap gap-2">
                <div className="badge badge-neutral gap-1.5 py-3 px-4">
                  <CalendarIcon className="size-3.5 opacity-70" />
                  {new Date(product.createdAt).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                {product.user && (
                  <div className="badge badge-primary badge-outline gap-1.5 py-3 px-4">
                    <UserIcon className="size-3.5" />
                    {product.user.name}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-base-content/5 h-px w-full" />

            <div className="prose prose-sm max-w-none">
              <p className="text-base-content/70 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.user && (
              <div className="mt-4 pt-6 border-t border-base-content/5">
                <div className="flex items-center gap-4 group cursor-pointer transition-all hover:translate-x-1">
                  <div className="avatar relative">
                    <div className="w-14 h-14 rounded-2xl ring-2 ring-primary/20 ring-offset-2 ring-offset-base-300 group-hover:ring-primary/50 transition-all overflow-hidden shadow-xl">
                      <img
                        src={product.user.imageUrl}
                        alt={product.user.name}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                      {product.user.name}
                    </h4>
                    <span className="badge badge-sm badge-secondary badge-outline font-medium tracking-wide">
                      VERIFIED CREATOR
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button className="btn btn-primary btn-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4 gap-2">
              <ShoppingCartIcon className="size-5" />
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <CommentsSection
        productId={id}
        userId={userId}
        comments={product.comments || []}
      />
    </div>
  );
}

export default Product;
