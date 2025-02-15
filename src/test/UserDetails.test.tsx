import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UserDetails from "../components/ui/UserDetails";

// Mock de datos
const mockAlbums = [
  { id: 1, title: "Album 1" },
  { id: 2, title: "Album 2" },
];

const mockTodos = [
  { id: 1, title: "Tarea 1", completed: true },
  { id: 2, title: "Tarea 2", completed: false },
];

const mockPosts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

// Mock de fetch
global.fetch = vi.fn();

describe("UserDetails Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Renderiza correctamente los datos de álbumes, tareas y posts", async () => {
    (global.fetch as Mock).mockImplementation((url: string) => {
      if (url.includes("/albums")) return Promise.resolve({ json: () => Promise.resolve(mockAlbums) });
      if (url.includes("/todos")) return Promise.resolve({ json: () => Promise.resolve(mockTodos) });
      if (url.includes("/posts")) return Promise.resolve({ json: () => Promise.resolve(mockPosts) });
      return Promise.reject(new Error("URL no esperada"));
    });

    render(
      <MemoryRouter initialEntries={["/user/1"]}>
        <Routes>
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Álbumes")).toBeTruthy();
    expect(await screen.findByText("Album 1")).toBeTruthy();
    expect(await screen.findByText("Tarea 1")).toBeTruthy();
    expect(await screen.findByText("Post 1")).toBeTruthy();
  });

  
  it("Muestra el botón de volver", () => {
    render(
      <MemoryRouter initialEntries={["/user/1"]}>
        <Routes>
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/← Volver a la tabla de usuarios/i)).toBeTruthy();
  });
});
