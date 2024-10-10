import React from 'react';
import { useCart } from '../context/CartContext';

const ItemCard = ({ image, name, price }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ image, name, price });
  };

  return (
    <div className="w-64 h-80 m-4 rounded overflow-hidden shadow-lg flex flex-col justify-between">
      <div>
        <div className="h-40 overflow-hidden">
          <img className="object-cover w-full h-full" src={image} alt={name} />
        </div>
        <div className="px-4 py-4">
          <div className="font-bold text-xl mb-2 line-clamp-1">{name}</div>
          <div className="font-bold text-xl mt-4">${price}</div>
        </div>
      </div>
      <div className="px-4 pb-4 flex justify-center">
        <button 
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
