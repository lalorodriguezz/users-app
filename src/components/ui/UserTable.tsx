import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserTable: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const filteredUsers = users.filter((user: any) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar usuario..."
        className="border border-gray-300 rounded p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Teléfono</th>
            <th className="border border-gray-300 px-4 py-2">Dirección</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user: any) => (
            <tr
              key={user.id}
              onClick={() => navigate(`/user/${user.id}`)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="border border-gray-300 px-4 py-2 text-green-500">
                {user.id}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-green-500">
                {user.email}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-green-500">
                {user.phone}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-green-500">
                {user.address.street}, {user.address.suite}, {user.address.city},{" "}
                {user.address.zipcode}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
