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

  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState("");

  useEffect(() => {
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
      fetchCategories();
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
      fetchCategories();
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
      fetchCategories();
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
    setEditMode(true);
    setEditCategoryId(categoryId);
    const selectedCategory = categories.find(
      (category) => category.id === categoryId
    );
    if (selectedCategory) {
      setNewCategory(selectedCategory);
    }
  };

  const handleSaveClick = () => {
    if (editCategoryId) {
      updateCategory(editCategoryId, newCategory);
      setEditMode(false);
      setEditCategoryId("");
      resetForm();
    }
  };

  const exitEditMode = () => {
    setEditMode(false);
    setEditCategoryId("");
    resetForm();
  };

  return (
    <div className="componets">
      <h1>Agregar Categorías</h1>
      <div className="inputs">
        <div className="add">
          <section>
            <div className="inp">
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
            <div className="inp">
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
          </section>
          <div>
            {editMode ? (
              <>
                <button onClick={handleSaveClick}>Guardar</button>
                <button onClick={exitEditMode}>Cancelar</button>
              </>
            ) : (
              <div className="btnflex">
                <button className="BtnAdd" onClick={createCategory}>
                  Crear Categoría
                </button>
              </div>
            )}
          </div>
        </div>
        <h1>Categorias</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Slug</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>
                  <button
                    className="btnDeleted"
                    onClick={() => deleteCategory(category.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btnEdit"
                    onClick={() => handleEditClick(category.id)}
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

export default AddCategories;
