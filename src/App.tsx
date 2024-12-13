import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import CreateProduct from "./pages/CreateProduct";
import "./index.css";
function App() {
  return (
    <BrowserRouter>
      <div className="flex gap-4 m-4">
        <Link to="/products">Список продуктов</Link>
        <Link to="/create-product">Добавить продукт</Link>
      </div>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
