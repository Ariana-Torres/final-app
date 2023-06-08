import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import AddProducts from "./components/AddProducts";
import AddCategories from "./components/AddCategories";
import AddType from "./components/AddType";
import AddCliente from "./components/AddClients";
import AddMenu from "./components/AddMenu";

export default function App() {
  return (
    <Router>
      <h1>Main View</h1>
      <nav>
        <ul>
          <li>
            <Link to="/add-products">Add Products</Link>
          </li>
          <li>
            <Link to="/add-categories">Add Categories</Link>
          </li>
          <li>
            <Link to="/add-type">Add Type</Link>
          </li>
          <li>
            <Link to="/add-cliente">Add Cliente</Link>
          </li>
          <li>
            <Link to="/add-menu">Add Menu</Link>
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
  );
}
