import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserTable from "../components/ui/UserTable";

// Mock de datos
const mockUsers = [
  {
    id: 1,
    name: "Juan Perez",
    email: "juan.perez@example.com",
    phone: "123-456-7890",
    address: {
      street: "Calle 1",
      suite: "Apt. 1",
      city: "Ciudad",
      zipcode: "12345",
    },
  },
  {
    id: 2,
    name: "Maria Lopez",
    email: "maria.lopez@example.com",
    phone: "987-654-3210",
    address: {
      street: "Calle 2",
      suite: "Apt. 2",
      city: "Otra Ciudad",
      zipcode: "54321",
    },
  },
];

// Mock de fetch
global.fetch = vi.fn();

const navigateMock = vi.fn(); // Función simulada para navegación

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock, // Mockea directamente useNavigate para devolver navigateMock
  };
});

describe("UserTable Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Renderiza correctamente la lista de usuarios", async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockUsers),
    });

    render(
      <MemoryRouter>
        <UserTable />
      </MemoryRouter>
    );

    expect(await screen.findByText("Lista de Usuarios")).toBeTruthy();
    expect(await screen.findByText("Juan Perez")).toBeTruthy();
    expect(await screen.findByText("Maria Lopez")).toBeTruthy();
  });

  it("Filtra correctamente los usuarios según la búsqueda", async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockUsers),
    });

    render(
      <MemoryRouter>
        <UserTable />
      </MemoryRouter>
    );

    // Verificamos que ambos usuarios se renderizan inicialmente
    expect(await screen.findByText("Juan Perez")).toBeTruthy();
    expect(await screen.findByText("Maria Lopez")).toBeTruthy();

    // Simulamos escribir en el input de búsqueda
    const searchInput = screen.getByPlaceholderText("Buscar usuario...");
    fireEvent.change(searchInput, { target: { value: "Maria" } });

    // Esperamos que solo se muestre el usuario filtrado
    expect(await screen.findByText("Maria Lopez")).toBeTruthy();
    expect(screen.queryByText("Juan Perez")).toBeNull();
  });

  it("Realiza la navegación al hacer clic en un usuario", async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockUsers),
    });

    render(
      <MemoryRouter>
        <UserTable />
      </MemoryRouter>
    );

    // Esperamos a que los usuarios se carguen y simulamos el clic en uno de ellos
    const userRow = await screen.findByText("Juan Perez");
    fireEvent.click(userRow);

    // Verificamos que se haya llamado a la función de navegación
    expect(navigateMock).toHaveBeenCalledWith("/user/1");
  });
});
