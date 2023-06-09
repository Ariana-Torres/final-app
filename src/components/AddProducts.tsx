import React, { useState, useEffect } from "react";
import "./css/Products.css";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categories: string[];
  types: string[];
}

const AddProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    categories: [],
    types: [],
  });

  const categoriesOptions = ["Category 1", "Category 2", "Category 3"];
  const typesOptions = ["Type 1", "Type 2", "Type 3"];

  useEffect(() => {
    // Cargar los productos al cargar el componente
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProduct = async () => {
    try {
      await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      fetchProducts(); // Actualizar la lista de productos después de agregar uno nuevo
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await fetch(`http://localhost:3000/products/${productId}`, {
        method: "DELETE",
      });
      fetchProducts(); // Actualizar la lista de productos después de eliminar uno
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateProduct = async (productId: string, updatedProduct: Product) => {
    try {
      await fetch(`http://localhost:3000/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      fetchProducts(); // Actualizar la lista de productos después de actualizar uno
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const resetForm = () => {
    setNewProduct({
      id: "",
      name: "",
      description: "",
      price: 0,
      categories: [],
      types: [],
    });
  };

  const handleCategoryChange = (selectedCategories: string[]) => {
    setNewProduct({ ...newProduct, categories: selectedCategories });
  };

  const handleTypeChange = (selectedTypes: string[]) => {
    setNewProduct({ ...newProduct, types: selectedTypes });
  };

  return (
    <div>
      <h1>Agregar Menú</h1>
      <div>
        <div>
          <label htmlFor="productName">Nombre:</label>
          <input
            type="text"
            id="productName"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="productDescription">Descripción:</label>
          <input
            type="text"
            id="productDescription"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="productPrice">Precio:</label>
          <input
            type="number"
            id="productPrice"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: parseInt(e.target.value) })
            }
          />
        </div>
        <div>
          <label htmlFor="productCategories">Categorías:</label>
          <select
            id="productCategories"
            multiple
            value={newProduct.categories}
            onChange={(e) =>
              handleCategoryChange(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {categoriesOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="productTypes">Tipos:</label>
          <select
            id="productTypes"
            multiple
            value={newProduct.types}
            onChange={(e) =>
              handleTypeChange(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {typesOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button onClick={addProduct}>Agregar Producto</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categorías</th>
              <th>Tipos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.categories.join(", ")}</td>
                <td>{product.types.join(", ")}</td>
                <td>
                  <button onClick={() => deleteProduct(product.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddProducts;
