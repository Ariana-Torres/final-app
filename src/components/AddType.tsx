import React, { useState, useEffect } from "react";

const AddType: React.FC = () => {
  interface Type {
    id: string;
    name: string;
    slug: string;
  }

  const [types, setTypes] = useState<Type[]>([]);
  const [newType, setNewType] = useState<Type>({
    id: "",
    name: "",
    slug: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editTypeId, setEditTypeId] = useState("");

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const response = await fetch("http://localhost:3000/type");
      const data = await response.json();
      setTypes(data);
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
        body: JSON.stringify(newType),
      });
      fetchTypes();
      resetForm();
      console.log("Type created successfully");
    } catch (error) {
      console.error("Error creating type:", error);
    }
  };

  const deleteType = async (typeId: string) => {
    try {
      await fetch(`http://localhost:3000/type/${typeId}`, {
        method: "DELETE",
      });
      fetchTypes();
    } catch (error) {
      console.error("Error deleting type:", error);
    }
  };

  const updateType = async (typeId: string, updatedType: Type) => {
    try {
      await fetch(`http://localhost:3000/type/${typeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedType),
      });
      fetchTypes();
    } catch (error) {
      console.error("Error updating type:", error);
    }
  };

  const resetForm = () => {
    setNewType({
      id: "",
      name: "",
      slug: "",
    });
  };

  const handleEditClick = (typeId: string) => {
    setEditMode(true);
    setEditTypeId(typeId);
    const selectedType = types.find((type) => type.id === typeId);
    if (selectedType) {
      setNewType(selectedType);
    }
  };

  const handleSaveClick = () => {
    if (editTypeId) {
      updateType(editTypeId, newType);
      setEditMode(false);
      setEditTypeId("");
      resetForm();
    }
  };

  const exitEditMode = () => {
    setEditMode(false);
    setEditTypeId("");
    resetForm();
  };

  return (
    <div>
      <h1>Agregar Tipos</h1>
      <div className="inputs">
        <div className="add">
          <section>
            <div className="inp">
              <label htmlFor="typeName">Nombre:</label>
              <input
                type="text"
                id="typeName"
                value={newType.name}
                onChange={(e) =>
                  setNewType({ ...newType, name: e.target.value })
                }
              />
            </div>
            <div className="inp">
              <label htmlFor="typeSlug">Slug:</label>
              <input
                type="text"
                id="typeSlug"
                value={newType.slug}
                onChange={(e) =>
                  setNewType({ ...newType, slug: e.target.value })
                }
              />
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
                <button className="BtnAdd" onClick={createType}>
                  Crear Tipo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <h1>Tipos</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Slug</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {types.map((type) => (
            <tr key={type.id}>
              <td>{type.name}</td>
              <td>{type.slug}</td>
              <td>
                <button
                  className="btnDeleted"
                  onClick={() => deleteType(type.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btnEdit"
                  onClick={() => handleEditClick(type.id)}
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

export default AddType;
