// -----------------------------------------------------------------------------
// Profile.tsx
// Página de perfil de usuario: configuración personal, seguridad, preferencias
// y registro de actividad (mock). Secciones:
//  * Perfil: datos personales y rol / institución
//  * Seguridad: cambio de contraseña, MFA y actividad de inicio de sesión
//  * Preferencias: idioma, formato fecha/hora, notificaciones
//  * Actividad: registro de acciones recientes del usuario (mock)
// Notas de implementación:
//  - Todos los datos son estáticos o controlados localmente (estado React)
//  - Sustituir cuando exista API: /me, /me/activity, /settings/preferences
//  - Mantener claves internas en inglés si se integran formularios (.name, etc.)
//  - Etiquetas UI traducidas al español manteniendo placeholders informativos
// -----------------------------------------------------------------------------
// Página de perfil: configuración personal, seguridad, preferencias y actividad (mock)
import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Avatar,
  Badge,
  Switch,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { FiSave, FiShield, FiUser, FiKey, FiSettings } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { messages } from '../i18n/messages';

// Componente Profile: controla toggles (MFA, notificaciones) y muestra formularios tabulados
const Profile = () => {
  const { user } = useAuth();
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <Container maxW="4xl" py="8">
      <VStack gap="6" align="stretch">
        <HStack justify="space-between">
          <Heading size="lg">{messages.pages.profile.heading}</Heading>
          <Button leftIcon={<FiSave />} colorScheme="green">
            Guardar Cambios
          </Button>
        </HStack>

        {/* Profile Header */}
        <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
          <HStack gap="6">
            <Avatar size="xl" bg="green.500" name={user?.name} />
            <VStack align="start" gap="2">
              <Heading size="md">{user?.name}</Heading>
              <Text color="gray.600">{user?.email}</Text>
              <HStack gap="2">
                <Badge colorScheme="blue" variant="subtle">
                  {user?.role}
                </Badge>
                <Badge colorScheme="green" variant="subtle">
                  Activo
                </Badge>
              </HStack>
            </VStack>
          </HStack>
        </Box>

        <Tabs variant="enclosed" colorScheme="green">
          <TabList>
            <Tab>Perfil</Tab>
            <Tab>Seguridad</Tab>
            <Tab>Preferencias</Tab>
            <Tab>Actividad</Tab>
          </TabList>

          <TabPanels>
            {/* Profile Information */}
            <TabPanel>
              <VStack gap="6" align="stretch">
                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <HStack mb="4">
                    <FiUser />
                    <Heading size="md">Información Personal</Heading>
                  </HStack>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                    <FormControl>
                      <FormLabel>Nombre</FormLabel>
                      <Input defaultValue="John" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Apellido</FormLabel>
                      <Input defaultValue="Doe" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Correo Electrónico</FormLabel>
                      <Input defaultValue={user?.email} type="email" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Teléfono</FormLabel>
                      <Input defaultValue="+1 (555) 123-4567" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>ID Empleado</FormLabel>
                      <Input defaultValue="EMP001234" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Departamento</FormLabel>
                      <Select defaultValue="it">
                        <option value="it">Tecnología de la Información</option>
                        <option value="hr">Recursos Humanos</option>
                        <option value="security">Seguridad</option>
                        <option value="facilities">Infraestructura</option>
                      </Select>
                    </FormControl>
                  </SimpleGrid>
                </Box>

                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <Heading size="md" mb="4">Rol y Permisos</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                    <Box>
                      <Text fontSize="sm" color="gray.500">Rol Actual</Text>
                      <Text fontWeight="semibold">{user?.role}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">Institución</Text>
                      <Text fontWeight="semibold">{user?.institution}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">Nivel de Acceso</Text>
                      <Badge colorScheme="red" variant="subtle">Alto</Badge>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">Estado de la Cuenta</Text>
                      <Badge colorScheme="green" variant="subtle">Activa</Badge>
                    </Box>
                  </SimpleGrid>
                </Box>
              </VStack>
            </TabPanel>

            {/* Security Settings */}
            <TabPanel>
              <VStack gap="6" align="stretch">
                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <HStack mb="4">
                    <FiKey />
                    <Heading size="md">Contraseña y Autenticación</Heading>
                  </HStack>
                  <VStack gap="4" align="stretch">
                    <FormControl>
                      <FormLabel>Contraseña Actual</FormLabel>
                      <Input type="password" placeholder="Ingresa la contraseña actual" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Nueva Contraseña</FormLabel>
                      <Input type="password" placeholder="Ingresa la nueva contraseña" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                      <Input type="password" placeholder="Confirma la nueva contraseña" />
                    </FormControl>
                    <Button colorScheme="blue" size="sm" alignSelf="flex-start">
                      Cambiar Contraseña
                    </Button>
                  </VStack>
                </Box>

                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <HStack mb="4">
                    <FiShield />
                    <Heading size="md">Autenticación Multifactor</Heading>
                  </HStack>
                  <VStack gap="4" align="stretch">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="user-mfa" mb="0" flex="1">
                        Habilitar MFA para tu cuenta
                      </FormLabel>
                      <Switch
                        id="user-mfa"
                        isChecked={mfaEnabled}
                        onChange={(e) => setMfaEnabled(e.target.checked)}
                      />
                    </FormControl>
                    
                    {mfaEnabled && (
                      <VStack gap="3" align="stretch" pl="4" borderLeft="2px" borderColor="green.200">
                        <Text fontSize="sm" color="gray.600">Configura tu método MFA:</Text>
                        <Button variant="outline" size="sm">
                          Configurar App Autenticadora
                        </Button>
                        <Text fontSize="xs" color="gray.500">
                          Escanea el código QR con tu app autenticadora (Google Authenticator, Authy, etc.)
                        </Text>
                      </VStack>
                    )}
                  </VStack>
                </Box>

                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <Heading size="md" mb="4">Actividad de Inicio de Sesión</Heading>
                  <VStack gap="3" align="stretch">
                    <Box p="3" bg="gray.50" borderRadius="md">
                      <HStack justify="space-between">
                        <VStack align="start" gap="0">
                          <Text fontSize="sm" fontWeight="semibold">Sesión Actual</Text>
                          <Text fontSize="xs" color="gray.600">Chrome en Windows • 192.168.1.100</Text>
                        </VStack>
                        <Text fontSize="xs" color="gray.500">Activa ahora</Text>
                      </HStack>
                    </Box>
                    <Box p="3" bg="gray.50" borderRadius="md">
                      <HStack justify="space-between">
                        <VStack align="start" gap="0">
                          <Text fontSize="sm">Inicio Anterior</Text>
                          <Text fontSize="xs" color="gray.600">Firefox en Windows • 192.168.1.100</Text>
                        </VStack>
                        <Text fontSize="xs" color="gray.500">Ayer 15:45</Text>
                      </HStack>
                    </Box>
                  </VStack>
                </Box>
              </VStack>
            </TabPanel>

            {/* Preferences */}
            <TabPanel>
              <VStack gap="6" align="stretch">
                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <HStack mb="4">
                    <FiSettings />
                    <Heading size="md">Preferencias de la Aplicación</Heading>
                  </HStack>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                    <FormControl>
                      <FormLabel>Idioma</FormLabel>
                      <Select defaultValue="en">
                        <option value="en">Inglés</option>
                        <option value="es">Español</option>
                        <option value="fr">Francés</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Zona Horaria</FormLabel>
                      <Select defaultValue="UTC-5">
                        <option value="UTC-8">Hora del Pacífico (UTC-8)</option>
                        <option value="UTC-5">Hora del Este (UTC-5)</option>
                        <option value="UTC">UTC</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Formato de Fecha</FormLabel>
                      <Select defaultValue="MM/DD/YYYY">
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Formato de Hora</FormLabel>
                      <Select defaultValue="12">
                        <option value="12">12 horas</option>
                        <option value="24">24 horas</option>
                      </Select>
                    </FormControl>
                  </SimpleGrid>
                </Box>

                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <Heading size="md" mb="4">Preferencias de Notificación</Heading>
                  <VStack gap="3" align="stretch">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="email-notifications" mb="0">
                        Notificaciones por Correo
                      </FormLabel>
                      <Switch
                        id="email-notifications"
                        isChecked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                      />
                    </FormControl>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="security-notifications" mb="0">
                        Alertas de Seguridad
                      </FormLabel>
                      <Switch id="security-notifications" defaultChecked />
                    </FormControl>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="system-notifications" mb="0">
                        Actualizaciones del Sistema
                      </FormLabel>
                      <Switch id="system-notifications" />
                    </FormControl>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="device-notifications" mb="0">
                        Cambios de Estado de Dispositivos
                      </FormLabel>
                      <Switch id="device-notifications" />
                    </FormControl>
                  </VStack>
                </Box>
              </VStack>
            </TabPanel>

            {/* Activity Log */}
            <TabPanel>
              <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                <Heading size="md" mb="4">Actividad Reciente</Heading>
                <VStack gap="3" align="stretch">
                  <Box p="3" bg="gray.50" borderRadius="md">
                    <HStack justify="space-between">
                      <VStack align="start" gap="0">
                        <Text fontSize="sm" fontWeight="semibold">Perfil Actualizado</Text>
                        <Text fontSize="xs" color="gray.600">Se cambió el número de teléfono</Text>
                      </VStack>
                      <Text fontSize="xs" color="gray.500">Hace 2 horas</Text>
                    </HStack>
                  </Box>
                  <Box p="3" bg="gray.50" borderRadius="md">
                    <HStack justify="space-between">
                      <VStack align="start" gap="0">
                        <Text fontSize="sm" fontWeight="semibold">Acceso a Dispositivo</Text>
                        <Text fontSize="xs" color="gray.600">Accedió al terminal de seguridad del Edificio A</Text>
                      </VStack>
                      <Text fontSize="xs" color="gray.500">Ayer 16:30</Text>
                    </HStack>
                  </Box>
                  <Box p="3" bg="gray.50" borderRadius="md">
                    <HStack justify="space-between">
                      <VStack align="start" gap="0">
                        <Text fontSize="sm" fontWeight="semibold">Contraseña Modificada</Text>
                        <Text fontSize="xs" color="gray.600">Contraseña actualizada correctamente</Text>
                      </VStack>
                      <Text fontSize="xs" color="gray.500">Hace 3 días</Text>
                    </HStack>
                  </Box>
                  <Box p="3" bg="gray.50" borderRadius="md">
                    <HStack justify="space-between">
                      <VStack align="start" gap="0">
                        <Text fontSize="sm" fontWeight="semibold">Inicio de Sesión</Text>
                        <Text fontSize="xs" color="gray.600">Inicio exitoso desde 192.168.1.100</Text>
                      </VStack>
                      <Text fontSize="xs" color="gray.500">Hace 1 semana</Text>
                    </HStack>
                  </Box>
                </VStack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default Profile;