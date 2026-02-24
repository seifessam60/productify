import { useUser } from "@clerk/clerk-react";
import { useMyProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router";
import {
  PackageIcon,
  LayoutGridIcon,
  MailIcon,
  CalendarIcon,
  PlusIcon,
} from "lucide-react";

function Profile() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const {
    data: products,
    isLoading: isProductsLoading,
    error,
  } = useMyProducts();

  if (!isUserLoaded || isProductsLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-base-300 p-6 rounded-full mb-6">
          <LayoutGridIcon className="size-12 opacity-20" />
        </div>
        <h2 className="text-3xl font-black mb-2">Not signed in</h2>
        <p className="text-base-content/60 max-w-sm">
          Please sign in to access your profile and manage your products.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* PROFILE HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-base-300 via-base-200 to-base-300 p-8 lg:p-12 border border-base-content/5 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 size-80 bg-primary/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-80 bg-secondary/10 blur-3xl rounded-full" />

        <div className="relative flex flex-col md:flex-row items-center gap-8 lg:gap-10">
          <div className="avatar">
            <div className="w-32 lg:w-40 rounded-3xl ring-4 ring-primary/20 ring-offset-4 ring-offset-base-300 shadow-2xl overflow-hidden transform transition-transform hover:scale-105 duration-500">
              <img src={user.imageUrl} alt={user.fullName} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight bg-linear-to-r from-base-content to-base-content/60 bg-clip-text text-transparent">
                {user.fullName}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
                <div className="badge badge-neutral gap-2 py-3 px-4">
                  <MailIcon className="size-3.5 opacity-60" />
                  {user.primaryEmailAddress?.emailAddress}
                </div>
                <div className="badge badge-primary badge-outline gap-2 py-3 px-4">
                  <CalendarIcon className="size-3.5" />
                  Joined{" "}
                  {new Date(user.createdAt).toLocaleDateString(undefined, {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/create"
                className="btn btn-primary shadow-lg shadow-primary/20 hover:scale-105 transition-all"
              >
                <PlusIcon className="size-4" />
                Post New Product
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-base-100/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 text-center">
              <div className="text-3xl font-black text-primary">
                {products?.length || 0}
              </div>
              <div className="text-[10px] uppercase font-bold tracking-widest opacity-40 mt-1">
                Products
              </div>
            </div>
            <div className="bg-base-100/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 text-center">
              <div className="text-3xl font-black text-secondary">0</div>
              <div className="text-[10px] uppercase font-bold tracking-widest opacity-40 mt-1">
                Sales
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black flex items-center gap-3">
            <PackageIcon className="size-6 text-primary" />
            Your Showcase
          </h2>
          <div className="text-sm font-medium opacity-40">
            {products?.length || 0} items published
          </div>
        </div>

        {error ? (
          <div className="alert alert-error shadow-lg">
            <span>Failed to load your products. Please try again.</span>
          </div>
        ) : products?.length === 0 ? (
          <div className="card bg-base-300/50 border border-dashed border-base-content/10 py-20">
            <div className="card-body items-center text-center">
              <PackageIcon className="size-16 opacity-10 mb-4" />
              <h3 className="card-title text-base-content/50">
                Your gallery is empty
              </h3>
              <p className="text-base-content/40 text-sm max-w-xs mb-6">
                Ready to share your creations with the world? Start by posting
                your first product.
              </p>
              <Link
                to="/create"
                className="btn btn-primary btn-outline btn-wide hover:scale-105 transition-all"
              >
                Create First Product
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
