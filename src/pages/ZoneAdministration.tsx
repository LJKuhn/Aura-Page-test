// -----------------------------------------------------------------------------
// ZoneAdministration.tsx
// Administración de zonas físicas del campus (mock):
//  * Tarjetas con resumen de cada zona (dispositivos, puntos de acceso, límites)
//  * Tabla de estado/actividad de zonas
//  * Placeholder para futura visualización geoespacial (mapa interactivo)
// Notas:
//  - Datos mock (array local) => sustituir por API /zones (GET) + /zones/{id}
//  - Coordenadas: actualmente texto, se esperaría polígono o GeoJSON
//  - status mantiene valor original en inglés para lógica futura; se muestra traducido si procede
//  - Posibles mejoras: filtros por estado, paginación, edición inline, capa mapa real
// -----------------------------------------------------------------------------
// React import eliminado
import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { FiPlus, FiEdit, FiMap, FiMapPin } from 'react-icons/fi';

const mockZones = [
  {
    id: '1',
  name: 'Área de Investigación Restringida',
  description: 'Zona de alta seguridad para investigación sensible',
  status: 'active', // mantener clave
    devices: 8,
    accessPoints: 3,
    lastActivity: '2024-01-15 14:30:00',
    coordinates: [
      { lat: '40.7128', lng: '-74.0060' },
      { lat: '40.7130', lng: '-74.0060' },
      { lat: '40.7130', lng: '-74.0065' },
      { lat: '40.7128', lng: '-74.0065' },
    ]
  },
  {
    id: '2',
  name: 'Espacio Común Estudiantes',
  description: 'Área de acceso abierto para estudiantes',
  status: 'active',
    devices: 12,
    accessPoints: 6,
    lastActivity: '2024-01-15 15:45:00',
    coordinates: [
      { lat: '40.7135', lng: '-74.0070' },
      { lat: '40.7140', lng: '-74.0070' },
      { lat: '40.7140', lng: '-74.0080' },
      { lat: '40.7135', lng: '-74.0080' },
    ]
  },
  {
    id: '3',
  name: 'Estacionamiento A',
  description: 'Zona principal de estacionamiento del campus',
  status: 'inactive',
    devices: 4,
    accessPoints: 2,
    lastActivity: '2024-01-14 09:15:00',
    coordinates: [
      { lat: '40.7145', lng: '-74.0085' },
      { lat: '40.7150', lng: '-74.0085' },
      { lat: '40.7150', lng: '-74.0095' },
      { lat: '40.7145', lng: '-74.0095' },
    ]
  },
];

const ZoneAdministration = () => {
  return (
    <Container maxW="7xl" py="8">
      <VStack gap="6" align="stretch">
        <HStack justify="space-between">
          <Heading size="lg">Administración de Zonas</Heading>
          <HStack gap="2">
            <Button leftIcon={<FiMap />} variant="outline">
              Mapa de Zonas
            </Button>
            <Button leftIcon={<FiPlus />} colorScheme="green">
              Crear Zona
            </Button>
          </HStack>
        </HStack>

        {/* Zone Cards */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
          {mockZones.map((zone) => (
            <Box
              key={zone.id}
              bg="white"
              p="6"
              borderRadius="lg"
              boxShadow="sm"
              border="1px"
              borderColor="gray.200"
            >
              <VStack align="start" gap="4">
                <HStack justify="space-between" w="full">
                  <HStack>
                    <FiMapPin color="#38A169" />
                    <Text fontWeight="bold" fontSize="lg">
                      {zone.name}
                    </Text>
                  </HStack>
                  <Badge
                    colorScheme={zone.status === 'active' ? 'green' : 'gray'}
                    variant="subtle"
                  >
                    {zone.status === 'active' ? 'activa' : 'inactiva'}
                  </Badge>
                </HStack>

                <Text fontSize="sm" color="gray.600">
                  {zone.description}
                </Text>

                <SimpleGrid columns={3} gap="4" w="full">
                  <Box textAlign="center">
                    <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                      {zone.devices}
                    </Text>
                    <Text fontSize="sm" color="gray.500">Dispositivos</Text>
                  </Box>
                  <Box textAlign="center">
                    <Text fontSize="2xl" fontWeight="bold" color="green.600">
                      {zone.accessPoints}
                    </Text>
                    <Text fontSize="sm" color="gray.500">Puntos de Acceso</Text>
                  </Box>
                  <Box textAlign="center">
                    <Text fontSize="lg" fontWeight="bold" color="purple.600">
                      {zone.coordinates.length}
                    </Text>
                    <Text fontSize="sm" color="gray.500">Puntos de Límite</Text>
                  </Box>
                </SimpleGrid>

                <Box w="full">
                  <Text fontSize="sm" fontWeight="semibold" mb="2">Coordenadas de Zona</Text>
                  <VStack align="start" gap="1" fontSize="xs" fontFamily="mono">
                    {zone.coordinates.slice(0, 2).map((coord, index) => (
                      <Text key={index} color="gray.600">
                        Punto {index + 1}: {coord.lat}, {coord.lng}
                      </Text>
                    ))}
                    {zone.coordinates.length > 2 && (
                      <Text color="gray.500">
                        ... y {zone.coordinates.length - 2} puntos más
                      </Text>
                    )}
                  </VStack>
                </Box>

                <Text fontSize="sm" color="gray.500">
                  Última actividad: {zone.lastActivity}
                </Text>

                <HStack gap="2" w="full">
                  <Button size="sm" leftIcon={<FiEdit />} colorScheme="blue" flex="1">
                    Editar Zona
                  </Button>
                  <Button size="sm" variant="outline" flex="1">
                    Ver Detalles
                  </Button>
                </HStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* Zone Status Table */}
        <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
          <Box p="4" borderBottom="1px" borderColor="gray.200">
            <Heading size="md">Resumen de Actividad de Zonas</Heading>
          </Box>
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Nombre de Zona</Th>
                <Th>Estado</Th>
                <Th>Dispositivos Conectados</Th>
                <Th>Puntos de Acceso</Th>
                <Th>Puntos de Límite</Th>
                <Th>Última Actividad</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mockZones.map((zone) => (
                <Tr key={zone.id}>
                  <Td fontWeight="semibold">{zone.name}</Td>
                  <Td>
                    <Badge
                      colorScheme={zone.status === 'active' ? 'green' : 'gray'}
                      variant="subtle"
                    >
                      {zone.status === 'active' ? 'activa' : 'inactiva'}
                    </Badge>
                  </Td>
                  <Td>{zone.devices}</Td>
                  <Td>{zone.accessPoints}</Td>
                  <Td>{zone.coordinates.length}</Td>
                  <Td>
                    <Text fontSize="sm" color="gray.600">
                      {zone.lastActivity}
                    </Text>
                  </Td>
                  <Td>
                    <HStack gap="1">
                      <Button size="sm" variant="ghost" colorScheme="blue">
                        <FiEdit />
                      </Button>
                      <Button size="sm" variant="ghost" colorScheme="purple">
                        <FiMap />
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Zone Map Placeholder */}
        <Box bg="white" borderRadius="lg" boxShadow="sm" p="6">
          <Heading size="md" mb="4">Visualización de Zonas</Heading>
          <Box
            h="400px"
            bg="gray.100"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="2px"
            borderStyle="dashed"
            borderColor="gray.300"
          >
            <VStack gap="2">
              <FiMap size="64" color="#CBD5E0" />
              <Text color="gray.500" textAlign="center">
                El mapa interactivo de zonas se mostrará aquí
              </Text>
              <Text fontSize="sm" color="gray.400" textAlign="center">
                Mostrando límites de zonas, dispositivos y puntos de acceso
              </Text>
            </VStack>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default ZoneAdministration;