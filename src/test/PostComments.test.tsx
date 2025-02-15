import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PostComments from "../components/ui/PostComments";

// Simulación de datos de comentarios
const mockComments = [
  {
    postId: 1,
    id: 1,
    name: "Comentario 1",
    email: "comentario1@example.com",
    body: "Este es el cuerpo del comentario 1",
  },
  {
    postId: 1,
    id: 2,
    name: "Comentario 2",
    email: "comentario2@example.com",
    body: "Este es el cuerpo del comentario 2",
  },
];

// Mock para fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockComments),
  })
) as unknown as typeof fetch;

describe("PostComments Component", () => {
  

  it("Renderiza los comentarios correctamente", async () => {
    render(
      <MemoryRouter initialEntries={["/post/1"]}>
        <Routes>
          <Route path="/post/:postId" element={<PostComments />} />
        </Routes>
      </MemoryRouter>
    );

    // Esperamos a que los comentarios se carguen
    expect(await screen.findByText("Comentario 1")).toBeTruthy();
    expect(await screen.findByText("Este es el cuerpo del comentario 1")).toBeTruthy();
    expect(await screen.findByText("Comentario 2")).toBeTruthy();
    expect(await screen.findByText("Este es el cuerpo del comentario 2")).toBeTruthy();
  });

  it("Debe mostrar el botón de volver", () => {
    render(
      <MemoryRouter initialEntries={["/post/1"]}>
        <Routes>
          <Route path="/post/:postId" element={<PostComments />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/← Volver/i)).toBeTruthy();
  });

  it("Muestra un mensaje si no hay comentarios", async () => {
    // Mock para fetch que devuelve un array vacío
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter initialEntries={["/post/1"]}>
        <Routes>
          <Route path="/post/:postId" element={<PostComments />} />
        </Routes>
      </MemoryRouter>
    );

    // Esperamos a que el mensaje de "No hay comentarios disponibles" se cargue
    expect(await screen.findByText(/No hay comentarios disponibles/i)).toBeTruthy();
  });
});