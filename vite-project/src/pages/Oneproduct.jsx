import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
const Oneproduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/singleProduct/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
  <div className="bg-gray-50 min-h-screen">
    <Navbar />

    <div className="max-w-5xl mx-auto py-10 px-5">
      {product ? (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-transform transform hover:scale-[1.02] duration-300">
          
          {/* Product Image */}
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-5">
            <img
              src={product.image || "https://via.placeholder.com/400"}
              alt={product.name || "Product Image"}
              className="h-96 w-full object-cover rounded-2xl"
            />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name || "Product Name"}
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description || "No description available for this product."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6">
              <span className="text-2xl font-extrabold text-green-600 mb-4 sm:mb-0">
                ₹{product.price ?? "N/A"}
              </span>
              <button className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-xl shadow-lg hover:bg-blue-700 transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 text-lg animate-pulse">
          Loading product details...
        </div>
      )}
    </div>
  </div>
);

};


export default Oneproduct