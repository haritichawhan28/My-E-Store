import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <div className="container mx-auto p-4">Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cartItems.map((item, index) => (
          <div key={index} className="w-64 h-80 m-4 rounded overflow-hidden shadow-lg flex flex-col justify-between">
            <div>
              <div className="h-40 overflow-hidden">
                <img className="object-cover w-full h-full" src={item.image} alt={item.name} />
              </div>
              <div className="px-4 py-4">
                <div className="font-bold text-xl mb-2">{item.name}</div>
                <div className="font-bold text-xl mt-4">${item.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300">
          Buy
        </button>
      </div>
      <div className="mt-4">
        <Link to="/home" className="text-blue-500 hover:underline">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default Cart;
