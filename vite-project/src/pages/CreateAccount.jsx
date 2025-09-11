import React from 'react'
import { Link } from 'react-router-dom'

const CreateAccount = () => {
  return (
<div className="flex justify-center items-center min-h-screen bg-amber-100 px-4">
  <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
    <h2 className="text-2xl sm:text-3xl font-bold text-center text-amber-600 mb-6">
      Sign Up
    </h2>
    <form action="submit" className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
      />
      <button
        type="submit"
        className="w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition-colors text-base font-semibold"
      >
        Create Account
      </button>
      <p className='text-center text-[14px]'>already have account? <Link to='/login'>login</Link></p>
    </form>
  </div>
</div>

  )
}

export default CreateAccount