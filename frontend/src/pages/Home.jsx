function Home() {
  return (
    <div className="hero min-h-[calc(100vh-64px)] bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to Productify</h1>
          <p className="py-6">
            Discover, share, and discuss the best products with the community.
          </p>
          <a href="/products" className="btn btn-primary">
            Browse Products
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
