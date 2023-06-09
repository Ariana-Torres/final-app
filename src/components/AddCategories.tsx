import React, { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const AddCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({
    id: "",
    name: "",
    slug: "",
  });

  useEffect(() => {
    // Cargar las categorías al cargar el componente
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const createCategory = async () => {
    try {
      await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
      fetchCategories(); // Actualizar la lista de categorías después de agregar una nueva
      resetForm();
      console.log("Category created successfully");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      await fetch(`http://localhost:3000/categories/${categoryId}`, {
        method: "DELETE",
      });
      fetchCategories(); // Actualizar la lista de categorías después de eliminar una
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const updateCategory = async (
    categoryId: string,
    updatedCategory: Category
  ) => {
    try {
      await fetch(`http://localhost:3000/categories/${categoryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      });
      fetchCategories(); // Actualizar la lista de categorías después de actualizar una
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const resetForm = () => {
    setNewCategory({
      id: "",
      name: "",
      slug: "",
    });
  };

  const handleEditClick = (categoryId: string) => {
    // Implementa la lógica para editar una categoría
    console.log(`Edit category with ID: ${categoryId}`);
  };

  return (
    <div>
      <h1>Categorías</h1>
      <div>
        <div>
          <label htmlFor="categoryName">Nombre:</label>
          <input
            type="text"
            id="categoryName"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="categorySlug">Slug:</label>
          <input
            type="text"
            id="categorySlug"
            value={newCategory.slug}
            onChange={(e) =>
              setNewCategory({ ...newCategory, slug: e.target.value })
            }
          />
        </div>
        <div>
          <button onClick={createCategory}>Crear Categoría</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Slug</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.slug}</td>
              <td>
                <button onClick={() => handleEditClick(category.id)}>
                  Editar
                </button>
                <button onClick={() => deleteCategory(category.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddCategories;
