// -----------------------------------------------------------------------------
// Dashboard.tsx
// Panel principal con métricas agregadas (KPIs) y gráficos de consumo / estado.
// Incluye:
//  - Tarjetas KPI: eficiencia energética, agua, uptime, incidentes
//  - Gráfico de barras por edificio (consumo energía)
//  - Gráfico de torta distribución de estado de dispositivos
//  - Gráfico de líneas tendencias semanales energía vs agua
// Notas:
//  * Datos mock locales → reemplazar por API /analytics
//  * Se sugiere lazy loading de librerías de gráficos si el bundle crece
// -----------------------------------------------------------------------------
// Página Dashboard: visualizaciones y KPIs agregados del sistema (energía, dispositivos, tendencias)
// React import eliminado
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

// Dataset mock: consumo energético por edificio
const energyData = [
  { name: 'Edificio A', consumption: 4000 },
  { name: 'Edificio B', consumption: 3000 },
  { name: 'Edificio C', consumption: 2000 },
  { name: 'Edificio D', consumption: 2780 },
  { name: 'Edificio E', consumption: 1890 },
];

// Dataset mock: distribución de estados de dispositivos
const deviceStatusData = [
  { name: 'Activo', value: 856, color: '#38A169' },
  { name: 'Inactivo', value: 124, color: '#E53E3E' },
  { name: 'Mantenimiento', value: 43, color: '#D69E2E' },
];

// Dataset mock: tendencia semanal de consumo de energía y agua
const weeklyTrend = [
  { day: 'Lun', energy: 2400, water: 1200 },
  { day: 'Mar', energy: 1398, water: 1100 },
  { day: 'Mié', energy: 9800, water: 1300 },
  { day: 'Jue', energy: 3908, water: 1050 },
  { day: 'Vie', energy: 4800, water: 1400 },
  { day: 'Sáb', energy: 3800, water: 900 },
  { day: 'Dom', energy: 4300, water: 800 },
];

// Componente principal Dashboard: organiza KPIs y gráficos responsivos
const Dashboard = () => {
  return (
    <Container maxW="7xl" py="8">
      <VStack gap="8" align="stretch">
        <Heading size="lg">Panel de Control del Sistema</Heading>

        {/* Tarjetas KPI */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6">
          <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
            <VStack align="start" gap="2">
              <Text fontSize="sm" color="gray.500">
                Eficiencia Energética
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="green.600">
                94.2%
              </Text>
              <Box w="full" bg="gray.200" borderRadius="full" h="2">
                <Box bg="green.500" w="94%" h="2" borderRadius="full" />
              </Box>
              <Text fontSize="xs" color="green.500">
                +2.4% del mes pasado
              </Text>
            </VStack>
          </Box>

          <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
            <VStack align="start" gap="2">
              <Text fontSize="sm" color="gray.500">
                Conservación de Agua
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                87.6%
              </Text>
              <Box w="full" bg="gray.200" borderRadius="full" h="2">
                <Box bg="blue.500" w="88%" h="2" borderRadius="full" />
              </Box>
              <Text fontSize="xs" color="blue.500">
                +1.8% del mes pasado
              </Text>
            </VStack>
          </Box>

          <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
            <VStack align="start" gap="2">
              <Text fontSize="sm" color="gray.500">
                Tiempo de Actividad del Sistema
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="green.600">
                99.8%
              </Text>
              <Box w="full" bg="gray.200" borderRadius="full" h="2">
                <Box bg="green.500" w="100%" h="2" borderRadius="full" />
              </Box>
              <Text fontSize="xs" color="green.500">
                Rendimiento excelente
              </Text>
            </VStack>
          </Box>

          <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
            <VStack align="start" gap="2">
              <Text fontSize="sm" color="gray.500">
                Incidentes de Seguridad
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="red.600">
                3
              </Text>
              <HStack gap="2">
                <Box bg="red.100" color="red.800" px="2" py="1" borderRadius="md" fontSize="xs">
                  Alto: 0
                </Box>
                <Box bg="yellow.100" color="yellow.800" px="2" py="1" borderRadius="md" fontSize="xs">
                  Medio: 3
                </Box>
              </HStack>
              <Text fontSize="xs" color="red.500">
                -2 de la semana pasada
              </Text>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* Gráficos */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
          <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
            <VStack align="start" gap="4">
              <Heading size="md">Consumo de Energía por Edificio</Heading>
              <Box w="full" h="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="consumption" fill="#38A169" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </VStack>
          </Box>

          <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
            <VStack align="start" gap="4">
              <Heading size="md">Distribución de Estado de Dispositivos</Heading>
              <Box w="full" h="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {deviceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>

        <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
          <VStack align="start" gap="4">
            <Heading size="md">Tendencias de Consumo Semanal</Heading>
            <Box w="full" h="300px">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="energy"
                    stroke="#38A169"
                    name="Energía (kWh)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="water"
                    stroke="#3182CE"
                    name="Agua (L)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Dashboard;