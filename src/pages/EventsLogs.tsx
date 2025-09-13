// -----------------------------------------------------------------------------
// EventsLogs.tsx
// Página de visualización y filtrado de eventos / logs del sistema (mock).
// Funcionalidades:
//  - Filtro por texto (mensaje, usuario)
//  - Filtro por tipo de evento y severidad
//  - Tabla de resultados con etiqueta de severidad coloreada
//  - Acciones simuladas: exportar, limpiar logs antiguos
// Notas:
//  * Fuente actual: mockEvents (reemplazar con fetch paginado /events)
//  * Colores de severidad mapeados a esquemas Chakra (info→blue, success→green, etc.)
//  * Extensiones futuras: paginación real, CSV/JSON export back-end, WebSocket streaming
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
import { FiDownload, FiTrash2, FiSearch } from 'react-icons/fi';

// Datos simulados de eventos
const mockEvents = [
  { id: '1', timestamp: '2024-01-15 10:30:00', type: 'Device Registration', user: 'admin@university.edu', source: 'Access Control Terminal', message: 'New device registered successfully', severity: 'info' },
  { id: '2', timestamp: '2024-01-15 09:15:00', type: 'Access Granted', user: 'john.doe@university.edu', source: 'Building A - Main Entrance', message: 'User access granted to restricted area', severity: 'success' },
  { id: '3', timestamp: '2024-01-15 08:45:00', type: 'Security Alert', user: 'system', source: 'Zone Monitoring', message: 'Unauthorized access attempt detected', severity: 'warning' },
  { id: '4', timestamp: '2024-01-14 16:20:00', type: 'System Error', user: 'system', source: 'Energy Sensor', message: 'Device communication timeout', severity: 'error' },
];

const severityColor = (severity: string) => {
  switch (severity) {
    case 'error': return 'red';
    case 'warning': return 'yellow';
    case 'success': return 'green';
    case 'info': return 'blue';
    default: return 'gray';
  }
};

const EventsLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  // Filtrado por texto (mensaje/usuario) + tipo + severidad
  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || event.type === typeFilter;
    const matchesSeverity = severityFilter === 'all' || event.severity === severityFilter;
    return matchesSearch && matchesType && matchesSeverity;
  });

  return (
    <Container maxW="7xl" py="8">
      <VStack gap="6" align="stretch">
        <HStack justify="space-between">
          <Heading size="lg">Eventos y Registros</Heading>
          <HStack gap="2">
            <Button leftIcon={<FiDownload />} variant="outline">
              Exportar Logs
            </Button>
            <Button leftIcon={<FiTrash2 />} colorScheme="red" variant="outline">
              Limpiar Logs Antiguos
            </Button>
          </HStack>
        </HStack>

        {/* Filtros */}
        <HStack gap="4" flexWrap="wrap">
          <HStack>
            <FiSearch />
            <Input
              placeholder="Buscar eventos..."
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
            <option value="Device Registration">Registro de Dispositivo</option>
            <option value="Access Granted">Acceso Concedido</option>
            <option value="Security Alert">Alerta de Seguridad</option>
            <option value="System Error">Error del Sistema</option>
          </Select>
          <Select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            maxW="200px"
          >
            <option value="all">Todas las Severidades</option>
            <option value="info">Info</option>
            <option value="success">Éxito</option>
            <option value="warning">Advertencia</option>
            <option value="error">Error</option>
          </Select>
        </HStack>

        {/* Tabla de Eventos */}
        <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Fecha/Hora</Th>
                <Th>Tipo</Th>
                <Th>Usuario</Th>
                <Th>Origen</Th>
                <Th>Mensaje</Th>
                <Th>Severidad</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredEvents.map((event) => (
                <Tr key={event.id}>
                  <Td>
                    <Text fontSize="sm" fontFamily="mono">
                      {event.timestamp}
                    </Text>
                  </Td>
                  <Td>
                    <Badge variant="outline">{event.type}</Badge>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{event.user}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{event.source}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm" maxW="300px">
                      {event.message}
                    </Text>
                  </Td>
                  <Td>
                    <Badge colorScheme={severityColor(event.severity)} variant="subtle">
                      {event.severity === 'success' ? 'éxito' : event.severity === 'warning' ? 'warning' : event.severity}
                    </Badge>
                  </Td>
                  <Td>
                    <Button size="sm" variant="ghost" colorScheme="blue">
                      Ver Detalles
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <HStack justify="space-between">
          <Text fontSize="sm" color="gray.500">
            Mostrando {filteredEvents.length} de {mockEvents.length} eventos
          </Text>
          <HStack gap="2">
            <Button size="sm" variant="outline">Anterior</Button>
            <Button size="sm" variant="outline">Siguiente</Button>
          </HStack>
        </HStack>

        {/* Ayuda / Tips de Búsqueda */}
        <Box bg="blue.50" p="4" borderRadius="md">
          <Text fontSize="sm" color="blue.800">
            <Box as="span" fontWeight="bold">Consejo:</Box> Usa filtros para acotar por tipo o severidad; el buscador actúa sobre mensaje y usuario. Exporta logs para análisis externo (CSV / JSON).
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default EventsLogs;