import { Link } from "react-router";

function CreateProduct() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Submit a Product</h1>

      <form className="space-y-4 max-w-lg">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Product title"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            placeholder="Describe the product..."
            className="textarea textarea-bordered w-full h-32"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">URL</span>
          </label>
          <input
            type="url"
            placeholder="https://..."
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button type="submit" className="btn btn-primary">
            Submit Product
          </button>
          <Link to="/" className="btn btn-ghost">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
