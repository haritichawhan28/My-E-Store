import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import axios from 'axios';
import EditItemDialog from './EditItemDialog';

const UpdateItem = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleDialogClose = () => {
    setSelectedProduct(null);
  };

  const handleProductUpdate = (updatedProduct) => {
    setProducts(products.map(product => product._id === updatedProduct._id ? updatedProduct : product));
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">Error loading items.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-100">
      {products.map(product => (
        <div key={product._id} onClick={() => handleProductClick(product)}>
          <ItemCard
            image={product.image}
            name={product.name}
            price={product.price}
          />
        </div>
      ))}
      {selectedProduct && (
        <EditItemDialog
          product={selectedProduct}
          onClose={handleDialogClose}
          onUpdate={handleProductUpdate}
        />
      )}
    </div>
  );
};

export default UpdateItem;
