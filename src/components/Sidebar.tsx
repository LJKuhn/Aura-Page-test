// Sidebar de navegación: lista de enlaces principales del sistema con estado activo
// React import eliminado (JSX transform)
import {
  Box,
  CloseButton,
  Flex,
  Text,
  BoxProps,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiUsers,
  FiShield,
  FiMonitor,
  FiMapPin,
  FiMap,
  FiActivity,
  FiWifi,
  FiSettings,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';

// Definición de cada ítem de navegación
interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

// Colección ordenada de rutas visibles (se podría derivar de configuración central)
const LinkItems: Array<LinkItemProps> = [
  { name: 'Inicio', icon: FiHome, path: '/' },
  { name: 'Panel de Control', icon: FiTrendingUp, path: '/dashboard' },
  { name: 'Gestión de Usuarios', icon: FiUsers, path: '/users' },
  { name: 'Roles y Permisos', icon: FiShield, path: '/roles' },
  { name: 'Administración de Dispositivos', icon: FiMonitor, path: '/devices' },
  { name: 'Gestión de Ubicaciones', icon: FiMapPin, path: '/locations' },
  { name: 'Administración de Zonas', icon: FiMap, path: '/zones' },
  { name: 'Eventos y Registros', icon: FiActivity, path: '/events' },
  { name: 'Comunicaciones', icon: FiWifi, path: '/communications' },
  { name: 'Configuración del Sistema', icon: FiSettings, path: '/settings' },
];

// Props del Sidebar: hereda props de contenedor Chakra y callback para cerrar en mobile
interface SidebarProps extends BoxProps {
  onClose: () => void;
}

// Sidebar: renderiza lista navegable y maneja estado activo basado en la URL
const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  const location = useLocation();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      transition="3s ease"
      bg={bg}
      borderRight="1px"
      borderRightColor={borderColor}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      boxShadow="md"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <VStack align="start" gap={0}>
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="green.500">
            AURA
          </Text>
          <Text fontSize="xs" color="gray.500">
            Sistema de Administración Unificada
          </Text>
        </VStack>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      
      <Box h="1px" bg="gray.200" mx="4" />
      
      <VStack align="stretch" gap={1} mt={4} px={3}>
        {LinkItems.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Box key={link.name}>
              <RouterNavLink 
                to={link.path} 
                style={{ textDecoration: 'none' }}
                onClick={onClose}
              >
                <Flex
                  align="center"
                  p="3"
                  borderRadius="lg"
                  role="group"
                  cursor="pointer"
                  bg={isActive ? 'green.500' : 'transparent'}
                  color={isActive ? 'white' : 'gray.600'}
                  _hover={{
                    bg: isActive ? 'green.600' : 'green.50',
                    color: isActive ? 'white' : 'green.600',
                  }}
                  transition="all 0.2s"
                >
                  <Box as={link.icon} mr="4" fontSize="16px" />
                  <Text fontSize="sm" fontWeight="medium">
                    {link.name}
                  </Text>
                </Flex>
              </RouterNavLink>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Sidebar;