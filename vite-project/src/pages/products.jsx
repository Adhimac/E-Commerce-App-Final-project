import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Plus } from "lucide-react"; // for modern icon
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getProduct");
      setProducts(response.data.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Failed to fetch products");
      } else {
        alert("Products not found");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
              >
                <div className="h-48 bg-gray-100 rounded-t-2xl flex items-center justify-center">
                  <img
                    src="https://cdn.mos.cms.futurecdn.net/FUi2wwNdyFSwShZZ7LaqWf.jpg"
                    alt={p.name}
                    className="h-full object-cover rounded-t-2xl"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-700 truncate">
                    {p.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {p.description || "No description available"}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-green-600">
                      ₹{p.price}
                    </span>
                    <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg shadow hover:bg-blue-600">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Product Button */}
      <button
        onClick={() => navigate("/addProduct")}
        className="fixed bottom-8 right-8 flex items-center gap-2 px-5 py-3 
                   bg-gradient-to-r from-blue-500 to-purple-600 
                   text-white font-semibold rounded-full shadow-lg 
                   hover:scale-105 hover:shadow-2xl transform transition duration-300"
      >
        <Plus size={20} />
        Add Product
      </button>
    </div>
  );
};

export default Products;
