// useUsers.ts
// -----------------------------------------------------------------------------
// Hook personalizado para obtener la lista de usuarios.
// Actualmente utiliza datos mock locales para permitir desarrollo desacoplado.
// Responsabilidades:
//   1. Simular delay de red (setTimeout) para pruebas de estados de carga.
//   2. Proveer tipado consistente (User) reutilizable.
//   3. Facilitar migración a backend (reemplazando bloque dentro de useEffect).
// Migración a backend real:
//   Sustituir el setTimeout por una llamada HTTP (fetch/axios) que resuelva usuarios.

import { useEffect, useState } from "react"; // Hooks estándar de React para estado y efectos

export type User = {
  id: string;
  username: string;
  role: "admin" | "user" | "viewer";
};

const mockUsers: User[] = [
  { id: "1", username: "admin", role: "admin" },
  { id: "2", username: "juan", role: "user" },
  { id: "3", username: "maria", role: "viewer" },
];

/**
 * useUsers
 * Hook que expone usuarios simulados y un flag de carga.
 * @returns {object} Objeto con:
 *  - users: User[] Lista de usuarios.
 *  - loading: boolean True mientras se simula la carga.
 */
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula latencia de red: reemplazar por fetch/axios en integración real
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
  }, []); // Ejecuta una sola vez al montar

  return { users, loading };
}