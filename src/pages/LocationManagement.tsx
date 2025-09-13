// -----------------------------------------------------------------------------
// LocationManagement.tsx
// Administración jerárquica de ubicaciones (campus → edificio → piso → sala).
// Características:
//  - Estructura arbolada mock (mockLocations) con hijos anidados
//  - Filtros por texto y tipo
//  - Acordeón para expandir detalles de cada nodo
//  - Placeholder de mapa para futura visualización geoespacial
// Notas:
//  * Reemplazar mockLocations por API (GET /locations?include=children)
//  * Posible normalización (id → nodo) si escala mucho la profundidad
//  * Acciones (editar / agregar) son placeholders sin lógica aún
// -----------------------------------------------------------------------------
import { useState } from 'react';
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
  Input,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { FiPlus, FiEdit, FiMapPin, FiHome, FiSearch } from 'react-icons/fi';

// Datos jerárquicos simulados
const mockLocations = [
  {
    id: '1',
    name: 'Campus Principal',
    type: 'campus',
    description: 'Campus universitario principal',
    address: '123 Universidad Ave, Ciudad Tech',
    latitude: '40.7128',
    longitude: '-74.0060',
    parent: null,
    children: [
      {
        id: '2',
        name: 'Edificio Ingeniería A',
        type: 'building',
        description: 'Edificio principal de ingeniería',
        floors: 5,
        rooms: 45,
        children: [
          { id: '5', name: 'Piso 1', type: 'floor', rooms: ['101', '102', '103', '104'] },
          { id: '6', name: 'Piso 2', type: 'floor', rooms: ['201', '202', '203', '204'] },
        ],
      },
      {
        id: '3',
        name: 'Edificio Ciencias B',
        type: 'building',
        description: 'Edificio de ciencias e investigación',
        floors: 4,
        rooms: 32,
        children: [
          { id: '7', name: 'Piso 1', type: 'floor', rooms: ['B101', 'B102', 'B103'] },
          { id: '8', name: 'Piso 2', type: 'floor', rooms: ['B201', 'B202', 'B203'] },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Complejo Deportivo',
    type: 'campus',
    description: 'Instalaciones atléticas y campos deportivos',
    address: '456 Camino Deportes, Ciudad Tech',
    latitude: '40.7200',
    longitude: '-74.0100',
    parent: null,
    children: [],
  },
];

const LocationManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const matchesFilters = (loc: any) => {
    const text = searchTerm.toLowerCase();
    const matchesText =
      !text ||
      loc.name.toLowerCase().includes(text) ||
      (loc.description && loc.description.toLowerCase().includes(text));
    const matchesType = typeFilter === 'all' || loc.type === typeFilter;
    return matchesText && matchesType;
  };

  // Filtrado superficial (no oculta hijos si padre coincide; se podría profundizar)
  const filteredRoot = mockLocations.filter(matchesFilters);

  return (
    <Container maxW="7xl" py="8">
      <VStack gap="6" align="stretch">
        <HStack justify="space-between">
          <Heading size="lg">Gestión de Ubicaciones</Heading>
          <HStack gap="2">
            <Button leftIcon={<FiMapPin />} variant="outline">
              Vista Mapa
            </Button>
            <Button leftIcon={<FiPlus />} colorScheme="green">
              Agregar Ubicación
            </Button>
          </HStack>
        </HStack>

        {/* Filtros */}
        <HStack gap="4">
          <HStack>
            <FiSearch />
            <Input
              placeholder="Buscar ubicaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxW="300px"
            />
          </HStack>
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            maxW="200px"
          >
            <option value="all">Todos los Tipos</option>
            <option value="campus">Campus</option>
            <option value="building">Edificio</option>
            <option value="floor">Piso</option>
            <option value="room">Sala</option>
          </Select>
        </HStack>

        {/* Jerarquía */}
        <Box bg="white" borderRadius="lg" boxShadow="sm" p="4">
          <Heading size="md" mb="4">Jerarquía de Ubicaciones</Heading>

          <Accordion allowMultiple>
            {filteredRoot.map((location) => (
              <AccordionItem
                key={location.id}
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                mb="2"
              >
                <AccordionButton p="4">
                  <HStack flex="1" textAlign="left" gap="3">
                    <FiMapPin
                      color={location.type === 'campus' ? '#3182CE' : '#38A169'}
                    />
                    <VStack align="start" gap="0">
                      <HStack>
                        <Text fontWeight="bold">{location.name}</Text>
                        <Badge
                          colorScheme={location.type === 'campus' ? 'blue' : 'green'}
                          variant="subtle"
                        >
                          {location.type}
                        </Badge>
                      </HStack>
                      <Text fontSize="sm" color="gray.600">
                        {location.description}
                      </Text>
                      {location.address && (
                        <Text fontSize="xs" color="gray.500">
                          {location.address}
                        </Text>
                      )}
                    </VStack>
                  </HStack>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb="4">
                  <VStack align="stretch" gap="3">
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
                      {location.latitude && (
                        <Box>
                          <Text fontSize="sm" fontWeight="semibold">
                            Coordenadas
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {location.latitude}, {location.longitude}
                          </Text>
                        </Box>
                      )}
                      {'floors' in location && (
                        <Box>
                          <Text fontSize="sm" fontWeight="semibold">
                            Pisos
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {(location as any).floors}
                          </Text>
                        </Box>
                      )}
                      {'rooms' in location && (
                        <Box>
                          <Text fontSize="sm" fontWeight="semibold">
                            Salas Totales
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {(location as any).rooms}
                          </Text>
                        </Box>
                      )}
                    </SimpleGrid>

                    {location.children && location.children.length > 0 && (
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" mb="2">
                          Sub-ubicaciones
                        </Text>
                        <VStack align="stretch" gap="2">
                          {location.children.map((child) => (
                            <Box
                              key={child.id}
                              p="3"
                              bg="gray.50"
                              borderRadius="md"
                              border="1px"
                              borderColor="gray.200"
                            >
                              <HStack justify="space-between">
                                <HStack gap="2">
                                  <FiHome />
                                  <VStack align="start" gap="0">
                                    <HStack>
                                      <Text fontWeight="medium">{child.name}</Text>
                                      <Badge size="sm" variant="outline">
                                        {child.type}
                                      </Badge>
                                    </HStack>
                                    {child.description && (
                                      <Text fontSize="xs" color="gray.600">
                                        {child.description}
                                      </Text>
                                    )}
                                    {child.rooms && Array.isArray(child.rooms) && (
                                      <Text fontSize="xs" color="gray.500">
                                        Salas: {child.rooms.join(', ')}
                                      </Text>
                                    )}
                                  </VStack>
                                </HStack>
                                <Button size="sm" variant="ghost" colorScheme="blue">
                                  <FiEdit />
                                </Button>
                              </HStack>
                            </Box>
                          ))}
                        </VStack>
                      </Box>
                    )}

                    <HStack gap="2" pt="2">
                      <Button size="sm" leftIcon={<FiEdit />} colorScheme="blue">
                        Editar Ubicación
                      </Button>
                      <Button size="sm" leftIcon={<FiPlus />} variant="outline">
                        Agregar Sub-ubicación
                      </Button>
                    </HStack>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>

        {/* Placeholder Mapa */}
        <Box bg="white" borderRadius="lg" boxShadow="sm" p="6">
          <Heading size="md" mb="4">
            Mapa de Campus
          </Heading>
          <Box
            h="300px"
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
              <FiMapPin size="48" color="#CBD5E0" />
              <Text color="gray.500">El mapa interactivo se mostrará aquí</Text>
              <Text fontSize="sm" color="gray.400">
                Mostrando coordenadas y disposición de edificios
              </Text>
            </VStack>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default LocationManagement;