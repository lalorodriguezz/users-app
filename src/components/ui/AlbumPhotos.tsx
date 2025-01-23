import React, { useState, useEffect } from "react"; // Importamos los hooks useState y useEffect de React
import { useParams, Link } from "react-router-dom"; // Importamos useParams para obtener los parámetros de la URL y Link para la navegación

const AlbumPhotos: React.FC = () => {
  // Obtenemos el albumId de la URL usando useParams
  const { albumId } = useParams<{ albumId: string }>();

  // Declaramos el estado para almacenar las fotos
  const [photos, setPhotos] = useState([]);

  // useEffect se ejecuta cuando el componente se monta o cuando 'albumId' cambia
  // Realizamos una petición fetch para obtener las fotos del álbum usando el albumId
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      .then((res) => res.json()) // Convertimos la respuesta en formato JSON
      .then((data) => setPhotos(data)); // Actualizamos el estado con las fotos
  }, [albumId]); // El useEffect se vuelve a ejecutar si el albumId cambia

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-white min-h-screen flex flex-col items-center">
      {/* Enlace para volver a la página anterior */}
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 font-semibold text-lg mb-8 self-start transition-all duration-300 ease-in-out"
      >
        &larr; Volver
      </Link>
      <div className="w-full max-w-7xl px-4">
        {/* Título de la página con el albumId */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-10 border-b-4 border-blue-500 pb-4">
          Fotos del Álbum <span className="text-blue-600">#{albumId}</span>
        </h2>
        {/* Contenedor en grid para mostrar las fotos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Iteramos sobre el array 'photos' y mostramos cada foto */}
          {photos.map((photo: any) => (
            <div
              key={photo.id} // Asignamos una clave única para cada foto
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 transform transition-all duration-300 hover:scale-105"
            >
              {/* Mostramos la foto con un estilo de imagen redondeada en la parte superior */}
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="w-full h-56 object-cover rounded-t-lg"
              />
              <div className="p-4">
                {/* Título de la foto */}
                <p className="text-md text-gray-800 font-medium">{photo.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumPhotos; // Exportamos el componente para usarlo en otras partes de la aplicación
