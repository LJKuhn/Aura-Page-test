// Página de autenticación: formulario simple de login (mock) con gestión de estado local
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  VStack,
  // HStack (no usado),
  Heading,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Componente Login: encapsula formulario y llamada al contexto de autenticación
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Maneja el submit simulando una petición asíncrona de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="lg" py="24" px="8">
      <Stack spacing="8">
        <VStack spacing={6}>
          <Heading size="xl" color="green.500">
            AURA
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Administración Unificada de Recursos y Accesos
          </Text>
          <Heading size="md">Iniciar sesión en tu cuenta</Heading>
        </VStack>
        
        <Box py="8" px="10" bg="white" boxShadow="md" borderRadius="xl">
          <form onSubmit={handleSubmit}>
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@universidad.edu"
                  required
                />
              </FormControl>
              
              <FormControl>
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </FormControl>
              
              <Button
                type="submit"
                colorScheme="green"
                size="lg"
                isLoading={loading}
                loadingText="Iniciando sesión..."
              >
                Iniciar Sesión
              </Button>
            </Stack>
          </form>
          
          <Text fontSize="sm" textAlign="center" color="gray.600" mt="4">
            Demo: Usa cualquier email/contraseña para iniciar sesión
          </Text>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;