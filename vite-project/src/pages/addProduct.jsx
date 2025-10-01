import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';

const addProduct = () => {
    const [name,setName] = useState("")
    const[specification,setSpecification] = useState("")
    const[desc,setDesc] = useState("")
    const[price, setPrice] = useState("")
    const[stocks,setStocks] = useState("")

    let handleSubmit = async(e)=>{
      e.preventDefault()

   const data = {
  name: name,
  specification: specification,   // NOT 'spec'
  description: desc,
  price: price, 
  stocks: stocks, 
};

      let token = localStorage.getItem("token")
      
    try {
        const response = await axios.post("http://localhost:4000/addProduct", data, {
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
      
    },
  }); 

  
     if(response.status === 200){
        alert("Product Added Successfully")
     }
      else{
        alert("Something Went Wrong")
      }  
    } catch (error) {
        
    }
    }
return (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="flex justify-center items-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Add New Product
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Product Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            required
          />

          <textarea
            name="description"
            value={desc}
            onChange={(e)=>setDesc(e.target.value)}
            placeholder="Product Description"
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm resize-none"
            required
          ></textarea>

          <input
            type="text"
            name="specification"
            value={specification}
            onChange={(e)=>setSpecification(e.target.value)}
            placeholder="Product Specification"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />

          <input
            type="number"
            name="price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            placeholder="Product Price"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            required
          />

          <input
            type="number"
            name="stock"
            value={stocks}
            onChange={(e)=>setStocks(e.target.value)}
            placeholder="Stock"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  </div>
);

}

export default addProduct