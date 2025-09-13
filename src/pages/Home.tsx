// -----------------------------------------------------------------------------
// Home.tsx
// Página de bienvenida / overview con KPIs resumidos y actividad reciente.
// Componentes:
//  - StatCard reutilizable para métricas
//  - Listado de actividad simulada
//  - Estado rápido de subsistemas (conectividad, DB, etc.)
// Notas:
//  * Reemplazar datos estáticos por endpoints /metrics y /events
//  * Posible extracción de ActivityList y SystemStatus en componentes separados
// -----------------------------------------------------------------------------
// React import eliminado
// Página Home: panel con métricas resumidas y widgets de estado / actividad
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardBody,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiUsers, FiMonitor, FiActivity, FiZap } from 'react-icons/fi';
import { messages } from '../i18n/messages';

// StatCard: tarjeta reutilizable para mostrar una métrica con icono y variación
const StatCard = ({ title, stat, icon, change, changeType }: any) => {
  return (
    <Card>
      <CardBody>
        <Stat>
          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <StatLabel fontSize="sm" color="gray.500">
                {title}
              </StatLabel>
              <StatNumber fontSize="2xl" fontWeight="bold">
                {stat}
              </StatNumber>
            </VStack>
            <Icon
              as={icon}
              w={8}
              h={8}
              color={useColorModeValue('brand.500', 'brand.300')}
            />
          </HStack>
          {change && (
            <StatHelpText>
              <StatArrow type={changeType} />
              {change}%
            </StatHelpText>
          )}
        </Stat>
      </CardBody>
    </Card>
  );
};

// Home: ensambla tarjetas de estadísticas y paneles de actividad/estado del sistema
const Home = () => {
  return (
    <Container maxW="7xl" py="8">
      <VStack spacing="8" align="stretch">
        <Box>
          <Heading size="lg" mb="2">{messages.pages.home.welcomeHeading}</Heading>
          <Text color="gray.600">{messages.pages.home.subtitle}</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="6">
          <StatCard
            title="Total de Usuarios"
            stat="1,234"
            icon={FiUsers}
            change="12"
            changeType="increase"
          />
          <StatCard
            title="Dispositivos Activos"
            stat="856"
            icon={FiMonitor}
            change="3"
            changeType="increase"
          />
          <StatCard
            title="Eventos del Sistema"
            stat="2,341"
            icon={FiActivity}
            change="8"
            changeType="decrease"
          />
          <StatCard
            title="Eficiencia Energética"
            stat="94%"
            icon={FiZap}
            change="2"
            changeType="increase"
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="6">
          <Card>
            <CardBody>
              <VStack align="start" spacing="4">
                <Heading size="md">{messages.pages.home.recentActivity}</Heading>
                <VStack align="start" spacing="3" w="full">
                  <Box p="3" bg="gray.50" borderRadius="md" w="full">
                    <Text fontSize="sm" fontWeight="semibold">
                      Registro de Dispositivo
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Nuevo sensor instalado en Edificio A, Aula 101
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Hace 2 horas
                    </Text>
                  </Box>
                  <Box p="3" bg="gray.50" borderRadius="md" w="full">
                    <Text fontSize="sm" fontWeight="semibold">
                      Concesión de Acceso de Usuario
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Se otorgó acceso al Profesor Smith al Equipo de Laboratorio
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Hace 4 horas
                    </Text>
                  </Box>
                  <Box p="3" bg="gray.50" borderRadius="md" w="full">
                    <Text fontSize="sm" fontWeight="semibold">
                      Alerta de Energía
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Alto consumo detectado en Edificio C
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Hace 6 horas
                    </Text>
                  </Box>
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <VStack align="start" spacing="4">
                <Heading size="md">{messages.pages.home.systemStatus}</Heading>
                <VStack align="start" spacing="3" w="full">
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm">Conectividad de Red</Text>
                    <Box w="3" h="3" bg="green.400" borderRadius="full" />
                  </HStack>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm">Estado de Base de Datos</Text>
                    <Box w="3" h="3" bg="green.400" borderRadius="full" />
                  </HStack>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm">Comunicaciones de Dispositivos</Text>
                    <Box w="3" h="3" bg="yellow.400" borderRadius="full" />
                  </HStack>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm">Sistemas de Seguridad</Text>
                    <Box w="3" h="3" bg="green.400" borderRadius="full" />
                  </HStack>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Home;