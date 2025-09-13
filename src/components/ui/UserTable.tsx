import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Badge } from "@chakra-ui/react";

// UserTable.tsx
// -----------------------------------------------------------------------------
// Tabla simple para mostrar usuarios y sus roles.
// Esta implementación no incluye paginación ni sorting para mantenerla ligera.
// Escalable: se puede envolver en un contenedor que añada búsquedas o filtros.

interface User {
  id: string;
  username: string;
  role: "admin" | "user" | "viewer";
}

interface UserTableProps {
  /** Lista de usuarios a renderizar */
  users: User[];
}

/**
 * UserTable
 * Renderiza una tabla básica con usuarios y roles.
 * @param {UserTableProps} props - Props con lista de usuarios.
 * @returns {JSX.Element} Tabla Chakra UI.
 */
export const UserTable: React.FC<UserTableProps> = ({ users }) => (
  <Table variant="simple">
    <Thead>
      <Tr>
        <Th>Usuario</Th>
        <Th>Rol</Th>
      </Tr>
    </Thead>
    <Tbody>
      {users.map((user) => (
        <Tr key={user.id}>
          <Td>{user.username}</Td>
          <Td>
            <Badge colorScheme={user.role === "admin" ? "purple" : user.role === "user" ? "blue" : "gray"}>
              {user.role}
            </Badge>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);
