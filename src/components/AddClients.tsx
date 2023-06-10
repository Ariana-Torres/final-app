import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Client {
  id: string;
  name: string;
  age: number;
  directions: string;
  email: string;
  gender: string;
  phone: number;
}

const AddClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [newClient, setNewClient] = useState<Client>({
    id: "",
    name: "",
    age: 0,
    directions: "",
    email: "",
    gender: "",
    phone: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [editClientId, setEditClientId] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const createClient = async () => {
    try {
      await axios.post("http://localhost:3000/clients", newClient);
      fetchClients();
      resetForm();
      toast.success("Cliente creado exitosamente");
    } catch (error) {
      console.error("Error creating client:", error);
      toast.error("Error al crear el cliente");
    }
  };

  const deleteClient = async (clientId: string) => {
    try {
      await axios.delete(`http://localhost:3000/clients/${clientId}`);
      fetchClients();
      toast.success("Cliente eliminado exitosamente");
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error("Error al eliminar el cliente");
    }
  };

  const updateClient = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/clients/${editClientId}`,
        newClient
      );
      fetchClients();
      exitEditMode();
      toast.success("Cliente actualizado exitosamente");
    } catch (error) {
      console.error("Error updating client:", error);
      toast.error("Error al actualizar el cliente");
    }
  };

  const resetForm = () => {
    setNewClient({
      id: "",
      name: "",
      age: 0,
      directions: "",
      email: "",
      gender: "",
      phone: 0,
    });
  };

  const enterEditMode = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      setEditMode(true);
      setEditClientId(clientId);
      setNewClient(client);
    }
  };

  const exitEditMode = () => {
    setEditMode(false);
    setEditClientId("");
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode) {
      updateClient();
    } else {
      createClient();
    }
  };

  return (
    <div className="componets">
      <h1>Agregar Clientes</h1>
      <div className="inputs">
        <form className="add" onSubmit={handleSubmit}>
          <section>
            <div className="inp">
              <label htmlFor="clientName">Nombre:</label>
              <input
                type="text"
                id="clientName"
                value={newClient.name}
                onChange={(e) =>
                  setNewClient({ ...newClient, name: e.target.value })
                }
              />
            </div>
            <div className="inp">
              <label htmlFor="clientAge">Edad:</label>
              <input
                type="number"
                id="clientAge"
                value={newClient.age}
                onChange={(e) =>
                  setNewClient({ ...newClient, age: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="inp">
              <label htmlFor="clientDirections">Dirección:</label>
              <input
                type="text"
                id="clientDirections"
                value={newClient.directions}
                onChange={(e) =>
                  setNewClient({ ...newClient, directions: e.target.value })
                }
              />
            </div>
          </section>
          <section>
            <div className="inp">
              <label htmlFor="clientEmail">Email:</label>
              <input
                type="email"
                id="clientEmail"
                value={newClient.email}
                onChange={(e) =>
                  setNewClient({ ...newClient, email: e.target.value })
                }
              />
            </div>
            <div className="inp">
              <label htmlFor="clientGender">Género:</label>
              <select
                id="clientGender"
                value={newClient.gender}
                onChange={(e) =>
                  setNewClient({ ...newClient, gender: e.target.value })
                }
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <div className="inp">
              <label htmlFor="clientPhone">Teléfono:</label>
              <input
                type="number"
                id="clientPhone"
                value={newClient.phone}
                onChange={(e) =>
                  setNewClient({
                    ...newClient,
                    phone: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </section>
          <div>
            {editMode ? (
              <>
                <button className="BtnAdd" type="submit">
                  Guardar cambios
                </button>
                <button
                  className="btnEdit"
                  type="button"
                  onClick={exitEditMode}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <div className="btnflex">
                <button className="BtnAdd" type="submit">
                  Agregar Cliente
                </button>
              </div>
            )}
          </div>
        </form>
        <h1>Clientes</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Dirección</th>
              <th>Email</th>
              <th>Género</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.age}</td>
                <td>{client.directions}</td>
                <td>{client.email}</td>
                <td>{client.gender}</td>
                <td>{client.phone}</td>
                <td>
                  <button
                    className="btnDeleted"
                    onClick={() => deleteClient(client.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btnEdit"
                    onClick={() => enterEditMode(client.id)}
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

export default AddClients;
