//TODO: MAKE REMOVER FOR LEADING ZEROES ON NUMBER INPUT

"use client"

import { useState } from "react";
import { createNinja } from "../actions/dbActions";

const Home = () => {
  const [name, setName] = useState("")
  const [bucks, setBucks] = useState(0)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    setError("")
    setIsLoading(true)
    try {
      await createNinja(name, bucks)
      setName("")
      setBucks(0)
      // Optionally, add a success message here
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-1/2 bg-gray-100 flex items-center justify-center my-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">Enter New Ninja's Info</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            id="name"
            type="text"
            value={name} 
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
        <label htmlFor="bucks" className="block text-lg font-medium text-gray-700 mb-2">Ninja Bucks</label>
  <input 
    id="bucks"
    type="number" 
    value={bucks} 
    onChange={(e) => setBucks(parseInt(e.target.value) || 0)}
    min="0"
    className="w-20 px-4 py-3 text-xl font-semibold text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
  />
        </div>
        <button 
          onClick={onSubmit} 
          disabled={isLoading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? "Adding..." : "Add Ninja"}
        </button>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
 
export default Home;