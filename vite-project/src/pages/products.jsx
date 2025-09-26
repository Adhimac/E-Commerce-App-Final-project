import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      let response = await fetch("http://localhost:4000/getProduct");
      let result = await response.json();
      console.log(result);
      
      console.log(result.data);
      

      if (response.ok) {
        setProducts(result.data);
      } else {
        alert(result.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error(error);
      alert("Products not found");
    }
  };

  // Run once when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
  <div className="min-h-screen bg-gray-50">
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
              {/* Placeholder image */}
              <div className="h-48 bg-gray-100 rounded-t-2xl flex items-center justify-center">
                <img src="https://cdn.mos.cms.futurecdn.net/FUi2wwNdyFSwShZZ7LaqWf.jpg" alt="" />
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
  </div>
);

};

export default Products;
