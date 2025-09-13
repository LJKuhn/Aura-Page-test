// NavBar.tsx
// Menú de navegación principal para la app UI Components
// Ubicación: src/components/NavBar.tsx

// React import eliminado (no se usa directamente)
import { Link } from "react-router-dom";
import { Box, Button, HStack } from "@chakra-ui/react";

export const NavBar = () => (
  <Box as="nav" p={4} bg="gray.100" mb={4}>
    <HStack spacing={4}>
      <Button as={Link} to="/" colorScheme="teal" variant="ghost">Dashboard</Button>
      <Button as={Link} to="/devices" colorScheme="teal" variant="ghost">Dispositivos</Button>
      {/* Agrega más enlaces aquí según tus páginas */}
    </HStack>
  </Box>
);

export default NavBar;
