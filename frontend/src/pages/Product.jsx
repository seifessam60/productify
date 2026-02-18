import { useParams, Link } from "react-router";

function Product() {
  const { id } = useParams();

  return (
    <div>
      <div className="flex items-center gap-2 text-sm breadcrumbs mb-6">
        <Link to="/" className="link link-hover">
          Home
        </Link>
        <span>/</span>
        <span>Product {id}</span>
      </div>

      <div className="card bg-base-200 shadow-md">
        <div className="card-body">
          <h2 className="card-title text-2xl">Product Title</h2>
          <p className="text-base-content/70">Product description goes here.</p>

          <div className="card-actions justify-end mt-4">
            <Link to={`/product/${id}/edit`} className="btn btn-primary btn-sm">
              Edit
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        <p className="text-base-content/70">No comments yet.</p>
      </div>
    </div>
  );
}

export default Product;
