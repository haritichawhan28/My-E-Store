import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteItem = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/warehouse/allItems')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/warehouse/deleteItem/${_id}`);
      if (response.status === 200) {
        setProducts(products.filter(product => product._id !== _id));
      } else {
        setDeleteError('Error deleting item.');
      }
    } catch (error) {
      setDeleteError('Error deleting item.');
      console.error("There was an error deleting the item!", error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">Error loading items.</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      {deleteError && <div className="text-red-500 mb-4">{deleteError}</div>}
      <h2 className="text-2xl font-bold mb-4">Delete Item</h2>
      <ul>
        {products.map(product => (
          <li key={product._id} className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-md">
            <span>{product.name}</span>
            <button
              onClick={() => handleDelete(product._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteItem;