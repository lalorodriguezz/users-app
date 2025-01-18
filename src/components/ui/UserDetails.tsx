import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [albums, setAlbums] = useState([]);
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`).then((res) =>
        res.json()
      ),
      fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`).then((res) =>
        res.json()
      ),
      fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`).then((res) =>
        res.json()
      ),
    ]).then(([albumsData, todosData, postsData]) => {
      setAlbums(albumsData);
      setTodos(todosData);
      setPosts(postsData);
    });
  }, [id]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 font-medium underline mb-6 inline-block"
      >
        &larr; Volver a la tabla de usuarios
      </Link>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Detalles del Usuario <span className="text-blue-600">#{id}</span>
      </h2>

      {/* Contenedor principal en grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Álbumes */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-700 bg-blue-100 px-4 py-3">
            Álbumes
          </h3>
          <table className="table-auto w-full text-left">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2 text-gray-600 font-medium">ID</th>
                <th className="px-4 py-2 text-gray-600 font-medium">Título</th>
              </tr>
            </thead>
            <tbody>
              {albums.map((album: any, index) => (
                <tr
                  key={album.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-2">{album.id}</td>
                  <td className="px-4 py-2">{album.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tareas */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-700 bg-green-100 px-4 py-3">
            Tareas
          </h3>
          <table className="table-auto w-full text-left">
            <thead className="bg-green-100">
              <tr>
                <th className="px-4 py-2 text-gray-600 font-medium">ID</th>
                <th className="px-4 py-2 text-gray-600 font-medium">Título</th>
                <th className="px-4 py-2 text-gray-600 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo: any, index) => (
                <tr
                  key={todo.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-2">{todo.id}</td>
                  <td className="px-4 py-2">{todo.title}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        todo.completed
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {todo.completed ? "Completado" : "Pendiente"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Posts */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-700 bg-yellow-100 px-4 py-3">
            Posts
          </h3>
          <table className="table-auto w-full text-left">
            <thead className="bg-yellow-100">
              <tr>
                <th className="px-4 py-2 text-gray-600 font-medium">ID</th>
                <th className="px-4 py-2 text-gray-600 font-medium">Título</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post: any, index) => (
                <tr
                  key={post.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-2">{post.id}</td>
                  <td className="px-4 py-2">{post.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
