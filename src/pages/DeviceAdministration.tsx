// -----------------------------------------------------------------------------
// DeviceAdministration.tsx
// Página de administración y monitoreo de dispositivos.
// Incluye:
//  - KPIs (totales, activos, mantenimiento, fuera de línea)
//  - Filtros por texto, estado y tipo
//  - Tabla detallada con metadatos técnicos
//  - Acciones simuladas (editar, alerta, eliminar)
// Notas:
//  * mockDevices actúa como fuente temporal de datos (reemplazar por API REST /devices)
//  * Se mantienen keys de estado ('active','maintenance','offline') para futura integración
//  * Si la tabla crece: paginación, ordenamiento, virtualización (ej. react-virtual)
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
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiMonitor,
  FiWifi,
  FiAlertTriangle,
} from 'react-icons/fi';

// Dataset local: sustituir por fetch a backend (GET /devices)
const mockDevices = [
  {
    id: '1',
    name: 'Access Control Terminal',
    type: 'Security',
    brand: 'HikVision',
    model: 'DS-K1T341AM',
    serial: 'SN001234567',
    status: 'active',
    location: 'Edificio A - Entrada Principal',
    ipAddress: '192.168.1.101',
    lastSeen: '2024-01-15 10:30:00',
  },
  {
    id: '2',
    name: 'Energy Sensor',
    type: 'IoT',
    brand: 'Schneider',
    model: 'PowerLogic PM8000',
    serial: 'SN009876543',
    status: 'active',
    location: 'Edificio A - Sala Eléctrica',
    ipAddress: '192.168.1.102',
    lastSeen: '2024-01-15 10:25:00',
  },
  {
    id: '3',
    name: 'HVAC Controller',
    type: 'Building Automation',
    brand: 'Honeywell',
    model: 'T7770A1000',
    serial: 'SN555444333',
    status: 'maintenance',
    location: 'Edificio B - Techo',
    ipAddress: '192.168.1.103',
    lastSeen: '2024-01-14 15:20:00',
  },
];

const DeviceAdministration = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Filtro compuesto: término (nombre/serial) + estado + tipo
  const filteredDevices = mockDevices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.serial.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    const matchesType = typeFilter === 'all' || device.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Métricas derivadas para cabecera
  const stats = {
    total: mockDevices.length,
    active: mockDevices.filter((d) => d.status === 'active').length,
    maintenance: mockDevices.filter((d) => d.status === 'maintenance').length,
    offline: mockDevices.filter((d) => d.status === 'offline').length,
  };

  const statusToLabel = (status: string) =>
    status === 'active' ? 'activo' : status === 'maintenance' ? 'mantenimiento' : status === 'offline' ? 'offline' : status;

  return (
    <Container maxW="7xl" py="8">
      <VStack gap="6" align="stretch">
        <HStack justify="space-between">
          <Heading size="lg">Administración de Dispositivos</Heading>
          <HStack gap="2">
            <Button leftIcon={<FiWifi />} variant="outline">
              Probar Conexiones
            </Button>
            <Button leftIcon={<FiPlus />} colorScheme="green">
              Registrar Dispositivo
            </Button>
          </HStack>
        </HStack>

        {/* KPIs */}
        <SimpleGrid columns={{ base: 2, md: 4 }} gap="4">
          <Box bg="white" p="4" borderRadius="lg" boxShadow="sm">
            <Stat>
              <StatLabel fontSize="sm" color="gray.500">
                Dispositivos Totales
              </StatLabel>
              <StatNumber color="blue.600">{stats.total}</StatNumber>
            </Stat>
          </Box>
          <Box bg="white" p="4" borderRadius="lg" boxShadow="sm">
            <Stat>
              <StatLabel fontSize="sm" color="gray.500">
                Activos
              </StatLabel>
              <StatNumber color="green.600">{stats.active}</StatNumber>
            </Stat>
          </Box>
          <Box bg="white" p="4" borderRadius="lg" boxShadow="sm">
            <Stat>
              <StatLabel fontSize="sm" color="gray.500">
                Mantenimiento
              </StatLabel>
              <StatNumber color="yellow.600">{stats.maintenance}</StatNumber>
            </Stat>
          </Box>
          <Box bg="white" p="4" borderRadius="lg" boxShadow="sm">
            <Stat>
              <StatLabel fontSize="sm" color="gray.500">
                Fuera de Línea
              </StatLabel>
              <StatNumber color="red.600">{stats.offline}</StatNumber>
            </Stat>
          </Box>
        </SimpleGrid>

        {/* Filtros */}
        <HStack gap="4" flexWrap="wrap">
          <HStack>
            <FiSearch />
            <Input
              placeholder="Buscar dispositivos..."
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
            <option value="maintenance">Mantenimiento</option>
            <option value="offline">Offline</option>
          </Select>
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            maxW="200px"
          >
            <option value="all">Todos los Tipos</option>
            <option value="Security">Seguridad</option>
            <option value="IoT">IoT</option>
            <option value="Building Automation">Automatización Edificios</option>
          </Select>
        </HStack>

        {/* Tabla */}
        <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Nombre</Th>
                <Th>Tipo</Th>
                <Th>Marca / Modelo</Th>
                <Th>Número de Serie</Th>
                <Th>Estado</Th>
                <Th>Ubicación</Th>
                <Th>IP</Th>
                <Th>Último Visto</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredDevices.map((device) => (
                <Tr key={device.id}>
                  <Td>
                    <HStack>
                      <FiMonitor />
                      <Text fontWeight="semibold">{device.name}</Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Badge variant="outline">{device.type}</Badge>
                  </Td>
                  <Td>
                    <VStack align="start" gap="0">
                      <Text fontSize="sm" fontWeight="medium">
                        {device.brand}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {device.model}
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Text fontSize="sm" fontFamily="mono">
                      {device.serial}
                    </Text>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={
                        device.status === 'active'
                          ? 'green'
                          : device.status === 'maintenance'
                          ? 'yellow'
                          : 'red'
                      }
                      variant="subtle"
                    >
                      {statusToLabel(device.status)}
                    </Badge>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{device.location}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm" fontFamily="mono">
                      {device.ipAddress}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.600">
                      {device.lastSeen}
                    </Text>
                  </Td>
                  <Td>
                    <HStack gap="1">
                      <Button size="sm" variant="ghost" colorScheme="blue">
                        <FiEdit />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        colorScheme="orange"
                        title="Generar Alerta"
                      >
                        <FiAlertTriangle />
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
          Mostrando {filteredDevices.length} de {mockDevices.length} dispositivos
        </Text>
      </VStack>
    </Container>
  );
};

export default DeviceAdministration;