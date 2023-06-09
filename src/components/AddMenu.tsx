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
      fetchMenu(); // Actualizar la lista de categorías después de agregar una nueva
      resetForm();
      console.log("Types menu successfully");
    } catch (error) {
      console.error("Error creating menu:", error);
    }
  };

  const deleteMenu = async (menuId: string) => {
    try {
      await fetch(`http://localhost:3000/menu/${menuId}`, {
        method: "DELETE",
      });
      fetchMenu(); // Actualizar la lista de categorías después de eliminar una
    } catch (error) {
      console.error("Error menu type:", error);
    }
  };

  const updateMenu = async (menuId: string, updateMenu: Menu) => {
    try {
      await fetch(`http://localhost:3000/type/${menuId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateMenu),
      });
      fetchMenu(); // Actualizar la lista de categorías después de actualizar una
    } catch (error) {
      console.error("Error updating type:", error);
    }
  };

  const resetForm = () => {
    setNewMenu({
      id: "",
      name: "",
    });
  };

  const handleEditClick = (menuId: string) => {
    // Implementa la lógica para editar una menu
    console.log(`Edit type with ID: ${menuId}`);
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
          <button onClick={createMenu}>Crear Menu</button>
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
                <button onClick={() => handleEditClick(menu.id)}>Editar</button>
                <button onClick={() => deleteMenu(menu.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddMenu;
