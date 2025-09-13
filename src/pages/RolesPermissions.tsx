// -----------------------------------------------------------------------------
// RolesPermissions.tsx
// Gestión de roles y permisos (vista mock):
//  - Tarjetas de roles con metadata (prioridad, tipo, permisos asignados)
//  - Matriz de permisos (acción → componente → rol)
// Notas:
//  * Reemplazar arrays mock por API /roles y /permissions
//  * Posible ampliación: edición inline, modal de asignación, paginación
// -----------------------------------------------------------------------------
// Página de roles y permisos: tarjetas de roles y tabla de matriz de permisos (mock)
// React import eliminado
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { FiPlus, FiEdit, FiShield } from 'react-icons/fi';
import { messages } from '../i18n/messages';

// mockRoles: definición de roles con metadata y conteo de permisos
const mockRoles = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Acceso completo y gestión del sistema',
    type: 'administrative',
    priority: 1,
    status: 'active',
    permissions: 15,
  },
  {
    id: '2',
    name: 'Security Staff',
    description: 'Monitoreo de seguridad y control de accesos',
    type: 'security',
    priority: 2,
    status: 'active',
    permissions: 8,
  },
  {
    id: '3',
    name: 'Professor',
    description: 'Personal académico con acceso a aulas',
    type: 'academic',
    priority: 3,
    status: 'active',
    permissions: 5,
  },
];

// mockPermissions: lista simplificada de acciones asignadas a roles
// action/component se traducen para mostrar; en backend se usarían claves en inglés
const mockPermissions = [
  { id: '1', action: 'Crear Usuario', component: 'Gestión de Usuarios', role: 'Administrator' }, // Create User / User Management
  { id: '2', action: 'Editar Usuario', component: 'Gestión de Usuarios', role: 'Administrator' }, // Edit User
  { id: '3', action: 'Ver Dispositivos', component: 'Gestión de Dispositivos', role: 'Security Staff' }, // View Devices / Device Management
  { id: '4', action: 'Controlar Acceso', component: 'Control de Accesos', role: 'Security Staff' }, // Control Access / Access Control
  { id: '5', action: 'Reservar Aula', component: 'Reserva de Salas', role: 'Professor' }, // Book Classroom / Room Booking
];

// Componente RolesPermissions: organiza secciones de roles y matriz de permisos
const RolesPermissions = () => {
  return (
    <Container maxW="7xl" py="8">
      <VStack gap="8" align="stretch">
        <HStack justify="space-between">
          <Heading size="lg">{messages.pages.roles.heading}</Heading>
          <Button leftIcon={<FiPlus />} colorScheme="green">
            Crear Rol
          </Button>
        </HStack>

        {/* Sección Roles */}
        <Box>
          <Heading size="md" mb="4">
            Roles del Sistema
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
            {mockRoles.map((role) => (
              <Box
                key={role.id}
                bg="white"
                p="6"
                borderRadius="lg"
                boxShadow="sm"
                border="1px"
                borderColor="gray.200"
              >
                <VStack align="start" gap="3">
                  <HStack justify="space-between" w="full">
                    <HStack>
                      <FiShield color="#38A169" />
                      <Text fontWeight="bold" fontSize="lg">
                        {role.name}
                      </Text>
                    </HStack>
                    <Badge
                      colorScheme={role.status === 'active' ? 'green' : 'red'}
                      variant="subtle"
                    >
                      {role.status === 'active' ? 'activo' : role.status}
                    </Badge>
                  </HStack>

                  <Text fontSize="sm" color="gray.600">
                    {role.description}
                  </Text>

                  <HStack gap="4" fontSize="sm">
                    <Text>
                      <strong>Tipo:</strong> {role.type}
                    </Text>
                    <Text>
                      <strong>Prioridad:</strong> {role.priority}
                    </Text>
                  </HStack>

                  <Text fontSize="sm" color="blue.600">
                    {role.permissions} permisos asignados
                  </Text>

                  <Button size="sm" variant="outline" leftIcon={<FiEdit />}>
                    Gestionar Permisos
                  </Button>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Tabla Permisos */}
        <Box>
          <HStack justify="space-between" mb="4">
            <Heading size="md">Matriz de Permisos</Heading>
            <Button size="sm" colorScheme="blue">
              Configurar Permisos
            </Button>
          </HStack>

          <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Acción</Th>
                  <Th>Componente</Th>
                  <Th>Rol Asignado</Th>
                  <Th>Creado</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockPermissions.map((permission) => (
                  <Tr key={permission.id}>
                    <Td fontWeight="semibold">{permission.action}</Td>
                    <Td>{permission.component}</Td>
                    <Td>
                      <Badge colorScheme="blue" variant="subtle">
                        {permission.role}
                      </Badge>
                    </Td>
                    <Td>
                      <Text fontSize="sm" color="gray.600">
                        15 Ene, 2024
                      </Text>
                    </Td>
                    <Td>
                      <Button size="sm" variant="ghost" colorScheme="blue">
                        <FiEdit />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default RolesPermissions;