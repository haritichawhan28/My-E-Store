import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/authPage";
import Items from "./pages/homePage";
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import Cart from "./pages/cartPage";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<ProtectedRoute element={<Items />} />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App;
