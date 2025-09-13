// -----------------------------------------------------------------------------
// UserManagement.tsx
// Gestión básica de usuarios (mock):
//  - Filtro por texto (nombre / correo)
//  - Filtro por estado
//  - Tabla con rol, institución, último ingreso y acciones
//  - Datos mockUsers: sustituir por API /users con soporte de paginación
// -----------------------------------------------------------------------------
import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  VStack,
  HStack,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { FiPlus, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';

// Datos simulados (reemplazar por fetch)
const mockUsers = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan.perez@universidad.edu',
    role: 'Administrador',
    institution: 'Universidad de Tecnología',
    status: 'active',
    lastLogin: '2024-01-15 10:30:00',
  },
  {
    id: '2',
    name: 'Ana García',
    email: 'ana.garcia@universidad.edu',
    role: 'Profesor',
    institution: 'Universidad de Tecnología',
    status: 'active',
    lastLogin: '2024-01-14 14:15:00',
  },
  {
    id: '3',
    name: 'Roberto López',
    email: 'roberto.lopez@universidad.edu',
    role: 'Seguridad',
    institution: 'Universidad de Tecnología',
    status: 'inactive',
    lastLogin: '2024-01-10 09:20:00',
  },
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Container maxW="7xl" py="8">
      <VStack gap="6" align="stretch">
        <HStack justify="space-between">
          <Heading size="lg">Gestión de Usuarios</Heading>
          <Button leftIcon={<FiPlus />} colorScheme="green">
            Agregar Usuario
          </Button>
        </HStack>

        <HStack gap="4">
          <HStack>
            <FiSearch />
            <Input
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxW="300px"
            />
          </HStack>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            maxW="200px"
          >
            <option value="all">Todos los Estados</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </Select>
        </HStack>

        <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Nombre</Th>
                <Th>Correo</Th>
                <Th>Rol</Th>
                <Th>Institución</Th>
                <Th>Estado</Th>
                <Th>Último Ingreso</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.map((user) => (
                <Tr key={user.id}>
                  <Td fontWeight="semibold">{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>{user.institution}</Td>
                  <Td>
                    <Badge
                      colorScheme={user.status === 'active' ? 'green' : 'red'}
                      variant="subtle"
                    >
                      {user.status === 'active' ? 'activo' : 'inactivo'}
                    </Badge>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.600">
                      {user.lastLogin}
                    </Text>
                  </Td>
                  <Td>
                    <HStack gap="2">
                      <Button size="sm" variant="ghost" colorScheme="blue">
                        <FiEdit />
                      </Button>
                      <Button size="sm" variant="ghost" colorScheme="red">
                        <FiTrash2 />
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Text fontSize="sm" color="gray.500">
          Mostrando {filteredUsers.length} de {mockUsers.length} usuarios
        </Text>
      </VStack>
    </Container>
  );
};

export default UserManagement;