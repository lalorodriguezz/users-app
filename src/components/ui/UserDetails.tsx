import React, { useState, useEffect } from "react"; // Importamos los hooks useState y useEffect de React
import { useParams, Link } from "react-router-dom"; // Importamos useParams para obtener los parámetros de la URL y Link para la navegación

const UserDetails: React.FC = () => {
  // Obtenemos el id del usuario de la URL usando useParams
  const { id } = useParams<{ id: string }>();

  // Declaramos los estados para almacenar la información de los álbumes, tareas y posts
  const [albums, setAlbums] = useState([]);
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);

  // useEffect se ejecuta cuando el componente se monta o cuando 'id' cambia
  // Aquí realizamos tres peticiones fetch para obtener los álbumes, tareas y posts del usuario
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
      // Una vez obtenidos los datos, actualizamos los estados correspondientes
      setAlbums(albumsData);
      setTodos(todosData);
      setPosts(postsData);
    });
  }, [id]); // El useEffect se vuelve a ejecutar si el id cambia

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Enlace para volver a la tabla de usuarios */}
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 font-medium underline mb-6 inline-block"
      >
        &larr; Volver a la tabla de usuarios
      </Link>
      {/* Título de la página mostrando el ID del usuario */}
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Detalles del Usuario <span className="text-blue-600">#{id}</span>
      </h2>

      {/* Contenedor principal en grid con 3 columnas en pantallas grandes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sección de Álbumes */}
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
              {/* Iteramos sobre el array 'albums' y mostramos cada uno de los álbumes */}
              {albums.map((album: any, index) => (
                <tr
                  key={album.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"} // Alternamos colores de fila
                >
                  <td className="px-4 py-2">{album.id}</td> {/* Mostramos el ID del álbum */}
                  <td className="px-4 py-2">
                    {/* Enlace para ver detalles del álbum */}
                    <Link
                      to={`/albums/${album.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {album.title}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sección de Tareas */}
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
              {/* Iteramos sobre el array 'todos' y mostramos cada una de las tareas */}
              {todos.map((todo: any, index) => (
                <tr
                  key={todo.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"} // Alternamos colores de fila
                >
                  <td className="px-4 py-2">{todo.id}</td> {/* Mostramos el ID de la tarea */}
                  <td className="px-4 py-2">{todo.title}</td> {/* Mostramos el título de la tarea */}
                  <td className="px-4 py-2">
                    {/* Mostramos el estado de la tarea */}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        todo.completed
                          ? "bg-green-200 text-green-800" // Si está completada, mostramos verde
                          : "bg-red-200 text-red-800" // Si está pendiente, mostramos rojo
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

        {/* Sección de Posts */}
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
              {/* Iteramos sobre el array 'posts' y mostramos cada uno de los posts */}
              {posts.map((post: any, index) => (
                <tr
                  key={post.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"} // Alternamos colores de fila
                >
                  <td className="px-4 py-2">{post.id}</td> {/* Mostramos el ID del post */}
                  <td className="px-4 py-2">
                    {/* Enlace para ver detalles del post */}
                    <Link
                      to={`/posts/${post.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetails; // Exportamos el componente para usarlo en otras partes de la aplicación
