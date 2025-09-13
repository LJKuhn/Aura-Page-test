// Header principal: barra superior con controles de tema, notificaciones y perfil de usuario
import React from 'react';
import {
  IconButton,
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiUser, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Props del Header: callback para abrir el menú lateral en mobile
interface HeaderProps {
  onOpen: () => void;
}

// Header: compone botones de acción y datos breves del usuario autenticado
const Header: React.FC<HeaderProps> = ({ onOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // handleLogout: invoca logout del contexto y redirige a login
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={bg}
      borderBottomWidth="1px"
      borderBottomColor={borderColor}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      boxShadow="sm"
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
      >
        <FiMenu />
      </IconButton>

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        color="green.500"
      >
        AURA
      </Text>

      <HStack gap="6">
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="Cambiar tema"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
        />
        
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="Notificaciones"
          position="relative"
        >
          <FiBell />
          <Box
            position="absolute"
            top="8px"
            right="8px"
            bg="red.500"
            color="white"
            borderRadius="full"
            boxSize="18px"
            fontSize="10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            3
          </Box>
        </IconButton>
        
        <HStack gap="3">
          <Box
            w="10"
            h="10"
            bg="green.500"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontSize="sm"
            fontWeight="bold"
          >
            {user?.name?.charAt(0) || 'U'}
          </Box>
          <VStack
            display={{ base: 'none', md: 'flex' }}
            alignItems="flex-start"
            gap="1px"
            ml="2"
          >
            <Text fontSize="sm" fontWeight="600">
              {user?.name}
            </Text>
            <Text fontSize="xs" color="gray.600">
              {user?.role}
            </Text>
          </VStack>
          <VStack gap="1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => navigate('/profile')}
              leftIcon={<FiUser />}
            >
              Perfil
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLogout}
              leftIcon={<FiLogOut />}
              colorScheme="red"
            >
              Cerrar Sesión
            </Button>
          </VStack>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Header;