import React, { useState, useEffect } from "react";

interface Client {
  id: string;
  name: string;
  age: number;
  directions: string;
  email: string;
  gender: string;
  phone: string;
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
    phone: "",
  });

  useEffect(() => {
    // Cargar los clientes al cargar el componente
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:3000/clients");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const createClient = async () => {
    try {
      await fetch("http://localhost:3000/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      });
      fetchClients(); // Actualizar la lista de clientes después de agregar uno nuevo
      resetForm();
      console.log("Client created successfully");
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  const deleteClient = async (clientId: string) => {
    try {
      await fetch(`http://localhost:3000/clients/${clientId}`, {
        method: "DELETE",
      });
      fetchClients(); // Actualizar la lista de clientes después de eliminar uno
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const updateClient = async (clientId: string, updatedClient: Client) => {
    try {
      await fetch(`http://localhost:3000/clients/${clientId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedClient),
      });
      fetchClients(); // Actualizar la lista de clientes después de actualizar uno
    } catch (error) {
      console.error("Error updating client:", error);
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
      phone: "",
    });
  };

  const handleEditClick = (clientId: string) => {
    console.log(`Edit client with ID: ${clientId}`);
  };

  return (
    <div>
      <h1>Clientes</h1>
      <div>
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
          <label htmlFor="clientPhone">Teléfono:</label>
          <input
            type="text"
            id="clientPhone"
            value={newClient.phone}
            onChange={(e) =>
              setNewClient({ ...newClient, phone: e.target.value })
            }
          />
        </div>
        <div>
          <button onClick={createClient}>Agregar Cliente</button>
        </div>
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
                  <button onClick={() => handleEditClick(client.id)}>
                    Editar
                  </button>
                  <button onClick={() => deleteClient(client.id)}>
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

export default AddClients;
