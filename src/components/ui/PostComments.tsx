import React, { useState, useEffect } from "react"; // Importamos los hooks useState y useEffect de React
import { useParams, Link } from "react-router-dom"; // Importamos useParams para obtener los parámetros de la URL y Link para la navegación

const PostComments: React.FC = () => {
  // Obtenemos el postId de la URL usando useParams
  const { postId } = useParams<{ postId: string }>();

  // Declaramos el estado para almacenar los comentarios
  const [comments, setComments] = useState([]);

  // useEffect se ejecuta cuando el componente se monta o cuando 'postId' cambia
  // Realizamos una petición fetch para obtener los comentarios del post usando el postId
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((res) => res.json()) // Convertimos la respuesta en formato JSON
      .then((data) => setComments(data)); // Actualizamos el estado con los comentarios
  }, [postId]); // El useEffect se vuelve a ejecutar si el postId cambia

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col">
      <div className="p-6">
        {/* Enlace para volver a la página anterior */}
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 font-medium underline mb-6 inline-block"
        >
          &larr; Volver
        </Link>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Título de la página con el postId */}
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center border-b pb-4">
            Comentarios del Post <span className="text-blue-600">#{postId}</span>
          </h2>
          {/* Contenedor en grid para mostrar los comentarios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Iteramos sobre el array 'comments' y mostramos cada comentario */}
            {comments.map((comment: any) => (
              <div
                key={comment.id} // Asignamos una clave única para cada comentario
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition-transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {comment.name} {/* Mostramos el nombre del comentarista */}
                </h3>
                <p className="text-gray-600 mb-4">{comment.body}</p> {/* Mostramos el cuerpo del comentario */}
                <p className="text-sm text-gray-500">Por: {comment.email}</p> {/* Mostramos el email del comentarista */}
              </div>
            ))}
          </div>
          {/* Si no hay comentarios, mostramos un mensaje */}
          {comments.length === 0 && (
            <p className="text-center text-gray-500 mt-8 text-lg">
              No hay comentarios disponibles.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostComments; // Exportamos el componente para usarlo en otras partes de la aplicación
