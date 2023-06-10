import React, { useState, useEffect } from "react";

const AddMenu: React.FC = () => {
  interface Menu {
    id: string;
    name: string;
  }

  const [menu, setMenu] = useState<Menu[]>([]);
  const [newMenu, setNewMenu] = useState<Menu>({
    id: "",
    name: "",
  });

  const [editMode, setEditMode] = useState(false); // Nuevo estado para controlar el modo de edición
  const [editMenuId, setEditMenuId] = useState(""); // Nuevo estado para almacenar el ID del menú en edición

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch("http://localhost:3000/menu");
      const data = await response.json();
      setMenu(data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const createMenu = async () => {
    try {
      await fetch("http://localhost:3000/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMenu),
      });
      fetchMenu();
      resetForm();
      console.log("Menu created successfully");
    } catch (error) {
      console.error("Error creating menu:", error);
    }
  };

  const deleteMenu = async (menuId: string) => {
    try {
      await fetch(`http://localhost:3000/menu/${menuId}`, {
        method: "DELETE",
      });
      fetchMenu();
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  const updateMenu = async (menuId: string, updatedMenu: Menu) => {
    try {
      await fetch(`http://localhost:3000/menu/${menuId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMenu),
      });
      fetchMenu();
      exitEditMode(); // Salir del modo de edición después de actualizar el menú
      console.log("Menu updated successfully");
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  const resetForm = () => {
    setNewMenu({
      id: "",
      name: "",
    });
  };

  const enterEditMode = (menuId: string) => {
    const selectedMenu = menu.find((m) => m.id === menuId);
    if (selectedMenu) {
      setNewMenu(selectedMenu);
      setEditMode(true);
      setEditMenuId(menuId);
    }
  };

  const exitEditMode = () => {
    setNewMenu({
      id: "",
      name: "",
    });
    setEditMode(false);
    setEditMenuId("");
  };

  const handleEditClick = (menuId: string) => {
    enterEditMode(menuId);
  };

  const handleSaveClick = () => {
    if (editMenuId !== "") {
      updateMenu(editMenuId, newMenu);
    } else {
      createMenu();
    }
  };

  return (
    <div>
      <h1>Menu</h1>
      <div>
        <div>
          <label htmlFor="menuName">Nombre:</label>
          <input
            type="text"
            id="menuName"
            value={newMenu.name}
            onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
          />
        </div>
        <div>
          {editMode ? (
            <>
              <button className="BtnAdd" onClick={handleSaveClick}>
                Guardar
              </button>
              <button className="BtnEdit" onClick={exitEditMode}>
                Cancelar
              </button>
            </>
          ) : (
            <div className="btnflex">
              <button className="BtnAdd" onClick={createMenu}>
                Crear Menú
              </button>
            </div>
          )}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((menu) => (
            <tr key={menu.id}>
              <td>{menu.name}</td>
              <td>
                <button
                  className="btnDeleted"
                  onClick={() => deleteMenu(menu.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btnEdit"
                  onClick={() => handleEditClick(menu.id)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddMenu;
