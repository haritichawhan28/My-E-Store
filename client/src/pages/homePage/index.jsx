import { AiOutlineShoppingCart } from "react-icons/ai"; 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddItem from '../../components/AddItem';
import AllItems from '../../components/AllItems';
import DeleteItem from '../../components/DeleteItem';
import UpdateItem from '../../components/UpdateItem';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Items = () => {
  const [activeComponent, setActiveComponent] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case 'all':
        return <AllItems searchTerm={searchTerm} />;
      case 'add':
        return <AddItem />;
      case 'update':
        return <UpdateItem />;
      case 'delete':
        return <DeleteItem />;
      default:
        return <AllItems searchTerm={searchTerm} />;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    console.clear();
  }

  const handleClickCart = () => {
    navigate('/cart');
  }

  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-2xl font-bold text-gray-800">
            <Link to="/home">MyStore</Link>
          </div>
          <nav className="space-x-4">
            <button onClick={() => setActiveComponent('all')} className="text-gray-800 hover:text-gray-600">
              All Products
            </button>
            <button onClick={() => setActiveComponent('add')} className="text-gray-800 hover:text-gray-600">
              Add Product
            </button>
            <button onClick={() => setActiveComponent('update')} className="text-gray-800 hover:text-gray-600">
              Update Product
            </button>
            <button onClick={() => setActiveComponent('delete')} className="text-gray-800 hover:text-gray-600">
              Delete Product
            </button>
          </nav> 
          <div className="relative">
            <input
              type="text"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-gray-600"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-0 top-0 mt-2 mr-2 text-gray-600 hover:text-gray-800">
              🔍
            </button>
          </div>
          <button className='bg-blue-500 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition duration-300' onClick={handleClickCart}>
            <div className="flex items-center">
              <AiOutlineShoppingCart size={24} className="mr-2" /> {cartItems.length}
            </div>
          </button>
          <button 
            onClick={handleLogout}
            className='bg-red-500 text-white px-6 py-3 rounded-full text-lg hover:bg-red-700 transition duration-300'
          >
            Logout
          </button>
        </div>
      </header>
      <div className="container mx-auto p-4">
        {renderComponent()}
      </div> 
    </div>
  );
};

export default Items;
