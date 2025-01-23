import React, { useState, useEffect } from "react"; // Importamos los hooks useState y useEffect de React
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para redirigir a otras rutas

const UserTable: React.FC = () => {
  const [users, setUsers] = useState([]); // Declaramos un estado 'users' que almacenará la lista de usuarios
  const [search, setSearch] = useState(""); // Declaramos un estado 'search' que almacenará el valor de la búsqueda
  const navigate = useNavigate(); // useNavigate se utiliza para redirigir a otras rutas

  // useEffect se ejecuta cuando el componente se monta
  // Aquí se realiza una petición fetch para obtener los usuarios desde un API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json()) // Convertimos la respuesta en JSON
      .then((data) => setUsers(data)); // Actualizamos el estado 'users' con los datos obtenidos
  }, []); // El array vacío [] asegura que esta función solo se ejecute una vez, al montar el componente

  // 'filteredUsers' contiene los usuarios filtrados que coinciden con la búsqueda
  // La función .filter recorre todos los usuarios y .includes verifica si el nombre contiene el valor de búsqueda
  const filteredUsers = users.filter((user: any) =>
    user.name.toLowerCase().includes(search.toLowerCase()) // Compara el nombre sin importar mayúsculas/minúsculas
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6"> {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6"> {/* Contenedor de la tabla */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center"> {/* Título */}
          Lista de Usuarios
        </h1>
        <div className="mb-6"> {/* Contenedor del input de búsqueda */}
          <input
            type="text"
            placeholder="Buscar usuario..." // Placeholder del input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search} // El valor del input es el estado 'search'
            onChange={(e) => setSearch(e.target.value)} // Cuando se cambia el valor, actualizamos 'search'
          />
        </div>
        <div className="overflow-x-auto"> {/* Contenedor de la tabla con scroll horizontal */}
          <table className="table-auto w-full border-collapse bg-white rounded-lg shadow-md"> {/* Tabla */}
            <thead>
              <tr className="bg-blue-600 text-white"> {/* Encabezado de la tabla */}
                <th className="border px-4 py-3 text-left">ID</th>
                <th className="border px-4 py-3 text-left">Nombre</th>
                <th className="border px-4 py-3 text-left">Email</th>
                <th className="border px-4 py-3 text-left">Teléfono</th>
                <th className="border px-4 py-3 text-left">Dirección</th>
              </tr>
            </thead>
            <tbody>
              {/* Iteramos sobre 'filteredUsers' y mostramos una fila por cada usuario */}
              {filteredUsers.map((user: any) => (
                <tr
                  key={user.id}
                  onClick={() => navigate(`/user/${user.id}`)} // Al hacer clic, redirigimos a la página del usuario
                  className="cursor-pointer hover:bg-gray-100 transition-colors" // Estilos para el hover
                >
                  <td className="border px-4 py-2 text-blue-600 font-medium">
                    {user.id} {/* Mostramos el ID del usuario */}
                  </td>
                  <td className="border px-4 py-2">{user.name}</td> {/* Mostramos el nombre del usuario */}
                  <td className="border px-4 py-2 text-blue-600 font-medium">
                    {user.email} {/* Mostramos el email del usuario */}
                  </td>
                  <td className="border px-4 py-2 text-blue-600 font-medium">
                    {user.phone} {/* Mostramos el teléfono del usuario */}
                  </td>
                  <td className="border px-4 py-2">
                    {/* Mostramos la dirección del usuario */}
                    {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Si no hay usuarios filtrados, mostramos un mensaje indicando que no se encontraron resultados */}
        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No se encontraron usuarios.</p>
        )}
      </div>
    </div>
  );
};

export default UserTable; // Exportamos el componente para usarlo en otras partes de la aplicación
