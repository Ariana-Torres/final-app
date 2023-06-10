import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import AddProducts from "./components/AddProducts";
import AddCategories from "./components/AddCategories";
import AddType from "./components/AddType";
import AddCliente from "./components/AddClients";
import AddMenu from "./components/AddMenu";

import "./App.css";

export default function App() {
  return (
    <div className="admin-panel">
      <Router>
        <nav>
          <ul>
            <li>
              <p>Nuestro sabor</p>
            </li>
            <li>
              <Link to="/add-products">Agregar Productos</Link>
            </li>
            <li>
              <Link to="/add-categories">Agregar Categorias</Link>
            </li>
            <li>
              <Link to="/add-type">Agregar Tipos</Link>
            </li>
            <li>
              <Link to="/add-cliente">Agregar Cliente</Link>
            </li>
            <li>
              <Link to="/add-menu">Agregar Menu</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/add-categories" element={<AddCategories />} />
          <Route path="/add-type" element={<AddType />} />
          <Route path="/add-cliente" element={<AddCliente />} />
          <Route path="/add-menu" element={<AddMenu />} />
        </Routes>
      </Router>
    </div>
  );
}
