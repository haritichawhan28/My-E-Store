import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    }
    const value = {
        cartItems,
        addToCart
    }

    return (
      <CartContext.Provider value={value}>
        {children}
      </CartContext.Provider>
    );
}
export const useCart = () => useContext(CartContext);