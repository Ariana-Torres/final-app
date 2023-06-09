// AddType.tsx

import React, { useState, useEffect } from "react";

const AddType: React.FC = () => {
  interface Type {
    id: string;
    name: string;
    slug: string;
  }

  const [type, setType] = useState<Type[]>([]);
  const [newTypes, setNewTypes] = useState<Type>({
    id: "",
    name: "",
    slug: "",
  });

  useEffect(() => {
    // Cargar las categorías al cargar el componente
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const response = await fetch("http://localhost:3000/type");
      const data = await response.json();
      setType(data);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  const createType = async () => {
    try {
      await fetch("http://localhost:3000/type", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTypes),
      });
      fetchTypes(); // Actualizar la lista de categorías después de agregar una nueva
      resetForm();
      console.log("Types created successfully");
    } catch (error) {
      console.error("Error creating type:", error);
    }
  };

  const deleteType = async (typeId: string) => {
    try {
      await fetch(`http://localhost:3000/type/${typeId}`, {
        method: "DELETE",
      });
      fetchTypes(); // Actualizar la lista de categorías después de eliminar una
    } catch (error) {
      console.error("Error deleting type:", error);
    }
  };

  const updatetype = async (typeId: string, updatedType: Type) => {
    try {
      await fetch(`http://localhost:3000/type/${typeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedType),
      });
      fetchTypes(); // Actualizar la lista de categorías después de actualizar una
    } catch (error) {
      console.error("Error updating type:", error);
    }
  };

  const resetForm = () => {
    setNewTypes({
      id: "",
      name: "",
      slug: "",
    });
  };

  const handleEditClick = (typeId: string) => {
    // Implementa la lógica para editar una categoría
    console.log(`Edit type with ID: ${typeId}`);
  };

  return (
    <div>
      <h1>Categorías</h1>
      <div>
        <div>
          <label htmlFor="typeName">Nombre:</label>
          <input
            type="text"
            id="typeName"
            value={newTypes.name}
            onChange={(e) => setNewTypes({ ...newTypes, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="typeSlug">Slug:</label>
          <input
            type="text"
            id="typeSlug"
            value={newTypes.slug}
            onChange={(e) => setNewTypes({ ...newTypes, slug: e.target.value })}
          />
        </div>
        <div>
          <button onClick={createType}>Crear Categoría</button>
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
          {type.map((type) => (
            <tr key={type.id}>
              <td>{type.id}</td>
              <td>{type.name}</td>
              <td>{type.slug}</td>
              <td>
                <button onClick={() => handleEditClick(type.id)}>Editar</button>
                <button onClick={() => deleteType(type.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddType;
