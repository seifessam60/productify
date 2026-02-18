import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import EditProduct from "./pages/EditProduct";
import CreateProduct from "./pages/CreateProduct";
import Profile from "./pages/Profile";
import useUserSync from "./hooks/useUserSync";
import useAuthReq from "./hooks/useAuthReq";

function App() {
  const { isClerkLoaded, isSignedIn } = useAuthReq();
  useUserSync();

  if (!isClerkLoaded) return null;

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/product/:id/edit" element={<EditProduct />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
