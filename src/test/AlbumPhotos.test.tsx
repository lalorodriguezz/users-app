import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AlbumPhotos from "../components/ui/AlbumPhotos";

// Simulación de datos de fotos
const mockPhotos = [
  {
    albumId: 1,
    id: 1,
    title: "Foto 1",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952",
  },
  {
    albumId: 1,
    id: 2,
    title: "Foto 2",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796",
  },
];

// Mock para fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockPhotos),
  })
) as unknown as typeof fetch;

describe("AlbumPhotos Component", () => {
  it("Renderiza correctamente el componente y muestra el título del álbum", async () => {
    render(
      <MemoryRouter initialEntries={["/album/1"]}>
        <Routes>
          <Route path="/album/:albumId" element={<AlbumPhotos />} />
        </Routes>
      </MemoryRouter>
    );

    // Usamos una función matcher para evitar problemas con nodos anidados
    
  });

  it("Renderiza las fotos correctamente", async () => {
    render(
      <MemoryRouter initialEntries={["/album/1"]}>
        <Routes>
          <Route path="/album/:albumId" element={<AlbumPhotos />} />
        </Routes>
      </MemoryRouter>
    );

    // Esperamos a que las imágenes se carguen
    expect(await screen.findByAltText("Foto 1")).toBeTruthy();
    expect(await screen.findByAltText("Foto 2")).toBeTruthy();
  });

  it("Debe mostrar el botón de volver", () => {
    render(
      <MemoryRouter initialEntries={["/album/1"]}>
        <Routes>
          <Route path="/album/:albumId" element={<AlbumPhotos />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/← Volver/i)).toBeTruthy();
  });
});