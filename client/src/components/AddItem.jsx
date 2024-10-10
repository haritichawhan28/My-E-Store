import React, { useState } from 'react';

const AddItem = () => {
  const [itemData, setItemData] = useState({
    name: '',
    price: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/warehouse/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData)
      });
      if (response.ok) {
        alert('Item added successfully');
        setItemData({
          name: '',
          price: '',
          image: ''
        });
      } else {
        alert('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="flex items-center justify-center my-10 bg-gray-100">
      <div className="bg-white p-8 my-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Item Name</label>
            <input
              type="text"
              name="name"
              value={itemData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Item Price</label>
            <input
              type="number"
              name="price"
              value={itemData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Item Image URL</label>
            <input
              type="text"
              name="image"
              value={itemData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="relative font-medium text-white bg-indigo-500 rounded-full w-32 h-12 cursor-pointer overflow-hidden">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
