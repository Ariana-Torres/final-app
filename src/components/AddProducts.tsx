import React, { useState, useEffect } from "react"; // importamos las hooks de estados

import "./css/Products.css";
import * as uuid from "uuid";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categories: string[];
  types: string[];
}
interface Category {
  id: string;
  name: string;
}
interface Type {
  id: string;
  name: string;
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState<Type[]>([]);

  const [editMode, setEditMode] = useState(false);
  const [editProductsId, setEditProductsId] = useState("");
  useEffect(() => {
    // Cargar los productos al cargar el componente
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data);

      // Agregar aquí las solicitudes para obtener las categorías y tipos desde la base de datos
      const categoriesResponse = await fetch(
        "http://localhost:3000/categories"
      );
      const categoriesData = await categoriesResponse.json();
      // Actualizar el estado de las categorías con los datos recibidos
      setCategories(categoriesData);

      const typesResponse = await fetch("http://localhost:3000/type");
      const typesData = await typesResponse.json();
      // Actualizar el estado de los tipos con los datos recibidos
      setTypes(typesData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const addProduct = async () => {
    try {
      const newProductId = uuid.v4(); // Generar un ID único
      const newProductWithId = { ...newProduct, id: newProductId };

      await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductWithId),
      });

      fetchProducts(); // Actualizar la lista de productos después de agregar uno nuevo
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // const addProduct = async () => {
  //   try {
  //     const newProductId = uuid.v4();
  //     const newProductWithId = { ...newProduct, id: newProductId };
  //     // Enviar las categorías y tipos seleccionados en el cuerpo de la solicitud
  //     const newProductData = {
  //       ...newProductWithId,
  //       categories: newProduct.categories.map((categoryId) => ({
  //         id: categoryId,
  //       })),
  //       types: newProduct.types.map((typeId) => ({
  //         id: typeId,
  //       })),
  //     };

  //     await fetch("http://localhost:3000/products", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newProductData),
  //     });

  //     fetchProducts();
  //     resetForm();
  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //   }
  // };

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
  const handleEditClick = (prodctsId: string) => {
    setEditMode(true);
    setEditProductsId(prodctsId);
    const selectedProducts = products.find(
      (products) => products.id === prodctsId
    );
    if (selectedProducts) {
      setNewProduct(selectedProducts);
    }
  };

  const handleSaveClick = () => {
    if (editProductsId) {
      updateProduct(editProductsId, newProduct);
      setEditMode(false);
      setEditProductsId("");
      resetForm();
    }
  };

  const exitEditMode = () => {
    setEditMode(false);
    setEditProductsId("");
    resetForm();
  };

  const handleCategoryChange = (selectedCategories: string[]) => {
    setNewProduct({ ...newProduct, categories: selectedCategories });
  };

  const handleTypeChange = (selectedTypes: string[]) => {
    setNewProduct({ ...newProduct, types: selectedTypes });
  };

  return (
    <div className="componets">
      <h1>Agregar Productos</h1>
      <div className="inputs">
        <div className="add">
          <section>
            <div className="inp">
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
            <div className="inp">
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

            <div className="inp">
              <label htmlFor="productPrice">Precio:</label>
              <input
                type="number"
                id="productPrice"
                value={newProduct.price}
                onChange={
                  (e) =>
                    setNewProduct({
                      ...newProduct,
                      price: parseInt(e.target.value),
                    }) //convertimos el tipo de dato
                }
              />
            </div>
          </section>
          <section>
            <div>
              <label htmlFor="productCategories">Categorías:</label>
              <select
                id="productCategories"
                multiple
                value={newProduct.categories}
                onChange={(e) =>
                  handleCategoryChange(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
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
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
              >
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </section>
          <div>
            {editMode ? (
              <>
                <button className="BtnAdd" onClick={handleSaveClick}>
                  Guardar
                </button>
                <button className="btnEdit" onClick={exitEditMode}>
                  Cancelar
                </button>
              </>
            ) : (
              <div className="btnflex">
                <button className="BtnAdd" onClick={addProduct}>
                  Agregar Producto
                </button>
              </div>
            )}
          </div>
        </div>
        <h1>Productos</h1>
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
                <td>{product.categories.join("")}</td>
                <td>{product.types.join("")}</td>
                <td>
                  <button
                    className="btnDeleted"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btnEdit"
                    onClick={() => handleEditClick(product.id)}
                  >
                    Editar
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
