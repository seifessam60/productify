import { useState } from "react";
import { Link } from "react-router";
import { useCreateProduct } from "../hooks/useProducts";
import { PackagePlus, Image, FileText, ArrowLeft } from "lucide-react";

function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const { mutate, isPending } = useCreateProduct();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.imageUrl) {
      alert("Please fill in all fields.");
      return;
    }
    mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Link
        to="/"
        className="btn btn-ghost btn-sm mb-6 flex items-center gap-2 w-fit"
      >
        <ArrowLeft className="size-4" />
        Back to Products
      </Link>

      <div className="card bg-base-200 shadow-xl overflow-hidden">
        <div className="bg-primary p-6 text-primary-content flex items-center gap-3">
          <PackagePlus className="size-8" />
          <div>
            <h1 className="text-2xl font-bold">Submit a Product</h1>
            <p className="text-sm opacity-80">
              Share your creation with the community
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-body gap-6 bg-base-100">
          {/* Product Name */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <FileText className="size-4" /> Product Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Wireless Noise-Cancelling Headphones"
              className="input input-bordered w-full focus:input-primary transition-all"
              required
            />
          </div>

          {/* Description */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <FileText className="size-4" /> Description
              </span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What makes this product special?"
              className="textarea textarea-bordered h-32 w-full focus:textarea-primary transition-all resize-none"
              required
            />
          </div>

          {/* Image URL */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <Image className="size-4" /> Image URL
              </span>
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="input input-bordered w-full focus:input-primary transition-all"
              required
            />
            {formData.imageUrl && (
              <div className="mt-4 rounded-lg overflow-hidden border border-base-300 h-48 bg-base-200 flex items-center justify-center">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="max-h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                  }}
                />
              </div>
            )}
          </div>

          <div className="card-actions justify-end mt-4">
            <button
              type="submit"
              className={`btn btn-primary btn-lg w-full sm:w-auto shadow-lg hover:shadow-primary/20 ${
                isPending ? "loading" : ""
              }`}
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                <>
                  <PackagePlus className="size-5 mr-2" /> Share Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
