// -----------------------------------------------------------------------------
// Communications.tsx
// Página de Administración de Comunicaciones entre la plataforma y protocolos /
// buses de datos industriales / IoT. Incluye:
//  - Resumen de protocolos soportados (mock)
//  - Conexiones activas simuladas (mockConnections)
//  - Asistente para creación de nueva conexión (wizard placeholder)
//  - Métricas de salud de conexión y actividad reciente
// Notas de implementación:
//  * Todos los datos son mocks → sustituir por llamadas a API cuando exista backend.
//  * Se podrían separar protocolos y conexiones en hooks (useProtocols / useConnections)
//  * Mapeo de estados: connected / disconnected → 'conectado' / 'desconectado' sólo para UI.
//  * Evitamos traducir claves internas que en futuro pueden vincularse a enums del backend.
// -----------------------------------------------------------------------------
// React import eliminado (no es necesario importar React en proyectos Vite + TS)
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
import { FiPlus, FiEdit, FiWifi, FiSettings, FiCheck, FiX } from 'react-icons/fi';

// Conexiones simuladas a distintos endpoints / brokers
const mockConnections = [
  {
    id: '1',
    name: 'Broker MQTT - Edificio A',
    protocol: 'MQTT',
    host: '192.168.1.100',
    port: 1883,
    status: 'connected', // estado interno
    connectedDevices: 15,
    lastConnection: '2024-01-15 10:30:00',
    credentials: 'Configured', // mostrará 'Configurado'
  },
  {
    id: '2',
    name: 'Servidor OPC UA - Sistemas Energía',
    protocol: 'OPC UA',
    host: '192.168.1.101',
    port: 4840,
    status: 'connected',
    connectedDevices: 8,
    lastConnection: '2024-01-15 10:25:00',
    credentials: 'Configured',
  },
  {
    id: '3',
    name: 'Gateway TCP/IP - Seguridad',
    protocol: 'TCP/IP',
    host: '192.168.1.102',
    port: 8080,
    status: 'disconnected',
    connectedDevices: 0,
    lastConnection: '2024-01-14 14:15:00',
    credentials: 'Needs Update', // mostrará 'Requiere Actualización'
  },
];

// Configuración de protocolos soportados (resumen informativo)
const protocolConfigs = [
  {
    protocol: 'MQTT',
    description: 'Message Queuing Telemetry Transport',
    devices: 15,
    status: 'active',
    color: 'green',
  },
  {
    protocol: 'OPC UA',
    description: 'Open Platform Communications Unified Architecture',
    devices: 8,
    status: 'active',
    color: 'blue',
  },
  {
    protocol: 'TCP/IP',
    description: 'Transmission Control Protocol/Internet Protocol',
    devices: 5,
    status: 'warning',
    color: 'yellow',
  },
  {
    protocol: 'HTTP/REST',
    description: 'Hypertext Transfer Protocol / REST API',
    devices: 12,
    status: 'active',
    color: 'purple',
  },
];

// Helpers de traducción de estados / credenciales para UI
const statusLabel = (status: string) => status === 'connected' ? 'conectado' : 'desconectado';
const credentialLabel = (c: string) => c === 'Configured' ? 'Configurado' : 'Requiere Actualización';

const Communications = () => {
  return (
    <Container maxW="7xl" py="8">
      <VStack gap="6" align="stretch">
        <HStack justify="space-between">
          <Heading size="lg">Administración de Comunicaciones</Heading>
          <Button leftIcon={<FiPlus />} colorScheme="green">
            Nueva Conexión
          </Button>
        </HStack>

        {/* Resumen de Protocolos */}
        <Box>
          <Heading size="md" mb="4">Protocolos Soportados</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="4">
            {protocolConfigs.map((config) => (
              <Box
                key={config.protocol}
                bg="white"
                p="4"
                borderRadius="lg"
                boxShadow="sm"
                border="1px"
                borderColor="gray.200"
              >
                <VStack align="start" gap="3">
                  <HStack justify="space-between" w="full">
                    <Text fontWeight="bold">{config.protocol}</Text>
                    <Badge
                      colorScheme={config.color}
                      variant="subtle"
                    >
                      {config.status === 'active' ? 'activo' : config.status === 'warning' ? 'advertencia' : config.status}
                    </Badge>
                  </HStack>
                  <Text fontSize="sm" color="gray.600">
                    {config.description}
                  </Text>
                  <Text fontSize="sm" color="blue.600">
                    {config.devices} dispositivos conectados
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Conexiones Activas */}
        <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
          <Box p="4" borderBottom="1px" borderColor="gray.200">
            <HStack justify="space-between">
              <Heading size="md">Conexiones Activas</Heading>
              <Button size="sm" leftIcon={<FiSettings />} variant="outline">
                Configurar Conexiones
              </Button>
            </HStack>
          </Box>
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Nombre de Conexión</Th>
                <Th>Protocolo</Th>
                <Th>Host:Puerto</Th>
                <Th>Estado</Th>
                <Th>Dispositivos</Th>
                <Th>Última Conexión</Th>
                <Th>Credenciales</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mockConnections.map((connection) => (
                <Tr key={connection.id}>
                  <Td>
                    <HStack>
                      <FiWifi />
                      <Text fontWeight="semibold">{connection.name}</Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Badge variant="outline">{connection.protocol}</Badge>
                  </Td>
                  <Td>
                    <Text fontSize="sm" fontFamily="mono">
                      {connection.host}:{connection.port}
                    </Text>
                  </Td>
                  <Td>
                    <HStack>
                      {connection.status === 'connected' ? (
                        <FiCheck color="green" />
                      ) : (
                        <FiX color="red" />
                      )}
                      <Badge
                        colorScheme={connection.status === 'connected' ? 'green' : 'red'}
                        variant="subtle"
                      >
                        {statusLabel(connection.status)}
                      </Badge>
                    </HStack>
                  </Td>
                  <Td>
                    <Text fontWeight="medium">{connection.connectedDevices}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.600">
                      {connection.lastConnection}
                    </Text>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={connection.credentials === 'Configured' ? 'green' : 'yellow'}
                      variant="subtle"
                    >
                      {credentialLabel(connection.credentials)}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack gap="1">
                      <Button size="sm" variant="ghost" colorScheme="blue">
                        <FiEdit />
                      </Button>
                      <Button size="sm" variant="ghost" colorScheme="green">
                        Probar
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Asistente Nueva Conexión */}
        <Box bg="white" borderRadius="lg" boxShadow="sm" p="6">
          <VStack align="start" gap="4">
            <Heading size="md">Asistente Nueva Conexión</Heading>
            <Text color="gray.600">
              Configura protocolos de comunicación y parámetros de conexión para dispositivos.
            </Text>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="4" w="full">
              <Button variant="outline" h="100px" flexDirection="column" gap="2">
                <Text fontWeight="bold">Configurar MQTT</Text>
                <Text fontSize="sm" color="gray.600">Broker MQTT</Text>
              </Button>
              <Button variant="outline" h="100px" flexDirection="column" gap="2">
                <Text fontWeight="bold">Configurar OPC UA</Text>
                <Text fontSize="sm" color="gray.600">Servidor OPC UA</Text>
              </Button>
              <Button variant="outline" h="100px" flexDirection="column" gap="2">
                <Text fontWeight="bold">Configurar TCP/IP</Text>
                <Text fontSize="sm" color="gray.600">Gateway TCP/IP</Text>
              </Button>
            </SimpleGrid>
          </VStack>
        </Box>

        {/* Salud de Conexión y Actividad */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
          <Box bg="white" borderRadius="lg" boxShadow="sm" p="6">
            <Heading size="md" mb="4">Salud de Conexiones</Heading>
            <VStack align="start" gap="3">
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Conectividad de Red</Text>
                <Badge colorScheme="green" variant="subtle">Excelente</Badge>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Tasa de Éxito Protocolos</Text>
                <Badge colorScheme="green" variant="subtle">98.5%</Badge>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Latencia Promedio</Text>
                <Badge colorScheme="yellow" variant="subtle">12ms</Badge>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Conexiones Fallidas</Text>
                <Badge colorScheme="red" variant="subtle">2</Badge>
              </HStack>
            </VStack>
          </Box>

          <Box bg="white" borderRadius="lg" boxShadow="sm" p="6">
            <Heading size="md" mb="4">Actividad Reciente</Heading>
            <VStack align="start" gap="3">
              <Box>
                <Text fontSize="sm" fontWeight="semibold">Conexión MQTT Restaurada</Text>
                <Text fontSize="xs" color="gray.600">Broker Edificio A reconectado - hace 2 minutos</Text>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="semibold">Nuevo Dispositivo Registrado</Text>
                <Text fontSize="xs" color="gray.600">Sensor energía añadido a OPC UA - hace 15 minutos</Text>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="semibold">Configuración de Protocolo Actualizada</Text>
                <Text fontSize="xs" color="gray.600">Gateway TCP/IP modificado - hace 1 hora</Text>
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Communications;