// Layout principal: controla autenticación, sidebar responsiva y área de contenido
// React import eliminado (JSX transform automático)
import { 
  Box, 
  Flex, 
  useDisclosure, 
} from '@chakra-ui/react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';

// Layout: wrapper para rutas privadas con navegación lateral y header
const Layout = () => {
  const { isAuthenticated, loading } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        Loading...
      </Flex>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Sidebar
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
      />
      
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.600"
          zIndex="overlay"
          display={{ base: 'block', md: 'none' }}
          onClick={onClose}
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            h="full"
            w="60"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onClose={onClose} />
          </Box>
        </Box>
      )}
      
      <Box ml={{ base: 0, md: 60 }}>
        <Header onOpen={onOpen} />
        <Box p="4">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;