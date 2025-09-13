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
  Switch,
  FormControl,
  FormLabel,
  Input,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { FiSave, FiRefreshCw, FiShield, FiDatabase, FiMail } from 'react-icons/fi';

const SystemSettings = () => {
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <Container maxW="7xl" py="8">
      <VStack gap="6" align="stretch">
        <HStack justify="space-between">
          <Heading size="lg">Configuración del Sistema</Heading>
          <HStack gap="2">
            <Button leftIcon={<FiRefreshCw />} variant="outline">
              Restaurar Predeterminados
            </Button>
            <Button leftIcon={<FiSave />} colorScheme="green">
              Guardar Cambios
            </Button>
          </HStack>
        </HStack>

        <Tabs variant="enclosed" colorScheme="green">
          <TabList>
            <Tab>General</Tab>
            <Tab>Seguridad</Tab>
            <Tab>Autenticación</Tab>
            <Tab>Notificaciones</Tab>
            <Tab>Respaldos</Tab>
          </TabList>

          <TabPanels>
            {/* Configuración General */}
            <TabPanel>
              <VStack gap="6" align="stretch">
                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <Heading size="md" mb="4">Configuración del Sistema</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
                    <FormControl>
                      <FormLabel>Nombre del Sistema</FormLabel>
                      <Input defaultValue="AURA - Universidad de Tecnología" />
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
                      <FormLabel>Idioma por Defecto</FormLabel>
                      <Select defaultValue="es">
                        <option value="en">Inglés</option>
                        <option value="es">Español</option>
                        <option value="fr">Francés</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Tiempo de Sesión (minutos)</FormLabel>
                      <Input type="number" defaultValue="60" />
                    </FormControl>
                  </SimpleGrid>
                </Box>

                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <Heading size="md" mb="4">Información del Sistema</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                    <Box>
                      <Text fontSize="sm" color="gray.500">Versión</Text>
                      <Text fontWeight="semibold">AURA v2.1.0</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">Última Actualización</Text>
                      <Text fontWeight="semibold">15 de enero de 2024</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">Versión de la Base de Datos</Text>
                      <Text fontWeight="semibold">PostgreSQL 14.2</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">Usuarios Activos</Text>
                      <Text fontWeight="semibold">1,234</Text>
                    </Box>
                  </SimpleGrid>
                </Box>
              </VStack>
            </TabPanel>

            {/* Configuración de Seguridad */}
            <TabPanel>
              <VStack gap="6" align="stretch">
                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <HStack mb="4">
                    <FiShield />
                    <Heading size="md">Configuración de Seguridad</Heading>
                  </HStack>
                  <VStack gap="4" align="stretch">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="password-complexity" mb="0">
                        Aplicar Contraseñas Fuertes
                      </FormLabel>
                      <Switch id="password-complexity" defaultChecked />
                    </FormControl>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="account-lockout" mb="0">
                        Bloqueo de Cuenta Tras Intentos Fallidos
                      </FormLabel>
                      <Switch id="account-lockout" defaultChecked />
                    </FormControl>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="audit-logging" mb="0">
                        Habilitar Registro de Auditoría
                      </FormLabel>
                      <Switch id="audit-logging" defaultChecked />
                    </FormControl>
                  </VStack>
                </Box>

                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <Heading size="md" mb="4">Política de Contraseñas</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                    <FormControl>
                      <FormLabel>Longitud Mínima</FormLabel>
                      <Input type="number" defaultValue="8" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Expiración de Contraseña (días)</FormLabel>
                      <Input type="number" defaultValue="90" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Límite de Intentos Fallidos</FormLabel>
                      <Input type="number" defaultValue="3" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Duración de Bloqueo (minutos)</FormLabel>
                      <Input type="number" defaultValue="30" />
                    </FormControl>
                  </SimpleGrid>
                </Box>
              </VStack>
            </TabPanel>

            {/* Configuración de Autenticación */}
            <TabPanel>
              <VStack gap="6" align="stretch">
                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <Heading size="md" mb="4">Autenticación Multifactor</Heading>
                  <VStack gap="4" align="stretch">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="mfa-global" mb="0" flex="1">
                        Habilitar MFA en Todo el Sistema
                      </FormLabel>
                      <Switch
                        id="mfa-global"
                        isChecked={mfaEnabled}
                        onChange={(e) => setMfaEnabled(e.target.checked)}
                      />
                    </FormControl>
                    
                    {mfaEnabled && (
                      <VStack gap="3" align="stretch" pl="4" borderLeft="2px" borderColor="green.200">
                        <Text fontSize="sm" color="gray.600">Métodos MFA Disponibles:</Text>
                        <FormControl display="flex" alignItems="center">
                          <FormLabel htmlFor="mfa-totp" mb="0" flex="1">
                            App Autenticadora (TOTP)
                          </FormLabel>
                          <Switch id="mfa-totp" defaultChecked />
                        </FormControl>
                        <FormControl display="flex" alignItems="center">
                          <FormLabel htmlFor="mfa-email" mb="0" flex="1">
                            Verificación por Email
                          </FormLabel>
                          <Switch id="mfa-email" defaultChecked />
                        </FormControl>
                        <FormControl display="flex" alignItems="center">
                          <FormLabel htmlFor="mfa-sms" mb="0" flex="1">
                            Verificación por SMS
                          </FormLabel>
                          <Switch id="mfa-sms" />
                        </FormControl>
                      </VStack>
                    )}
                  </VStack>
                </Box>

                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <Heading size="md" mb="4">Inicio de Sesión Único (SSO)</Heading>
                  <VStack gap="4" align="stretch">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="sso-enabled" mb="0">
                        Habilitar Integración SSO
                      </FormLabel>
                      <Switch id="sso-enabled" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>URL del Endpoint SAML</FormLabel>
                      <Input placeholder="https://sso.university.edu/saml" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Proveedor de Identidad</FormLabel>
                      <Select placeholder="Seleccionar proveedor">
                        <option value="okta">Okta</option>
                        <option value="azure">Azure AD</option>
                        <option value="google">Google Workspace</option>
                      </Select>
                    </FormControl>
                  </VStack>
                </Box>
              </VStack>
            </TabPanel>

            {/* Notificaciones */}
            <TabPanel>
              <VStack gap="6" align="stretch">
                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <HStack mb="4">
                    <FiMail />
                    <Heading size="md">Notificaciones por Correo</Heading>
                  </HStack>
                  <VStack gap="4" align="stretch">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="email-notifications" mb="0" flex="1">
                        Habilitar Notificaciones por Correo
                      </FormLabel>
                      <Switch
                        id="email-notifications"
                        isChecked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                      />
                    </FormControl>
                    
                    {emailNotifications && (
                      <VStack gap="3" align="stretch" pl="4" borderLeft="2px" borderColor="blue.200">
                        <FormControl>
                          <FormLabel>Servidor SMTP</FormLabel>
                          <Input defaultValue="smtp.university.edu" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Puerto SMTP</FormLabel>
                          <Input defaultValue="587" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Dirección de Remitente</FormLabel>
                          <Input defaultValue="aura-system@university.edu" />
                        </FormControl>
                      </VStack>
                    )}
                  </VStack>
                </Box>

                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <Heading size="md" mb="4">Configuración de Alertas</Heading>
                  <VStack gap="3" align="stretch">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="security-alerts" mb="0">
                        Alertas de Incidentes de Seguridad
                      </FormLabel>
                      <Switch id="security-alerts" defaultChecked />
                    </FormControl>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="system-alerts" mb="0">
                        Alertas de Errores del Sistema
                      </FormLabel>
                      <Switch id="system-alerts" defaultChecked />
                    </FormControl>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="device-alerts" mb="0">
                        Alertas de Estado de Dispositivos
                      </FormLabel>
                      <Switch id="device-alerts" />
                    </FormControl>
                  </VStack>
                </Box>
              </VStack>
            </TabPanel>

            {/* Configuración de Respaldos */}
            <TabPanel>
              <VStack gap="6" align="stretch">
                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <HStack mb="4">
                    <FiDatabase />
                    <Heading size="md">Configuración de Respaldo</Heading>
                  </HStack>
                  <VStack gap="4" align="stretch">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="auto-backup" mb="0" flex="1">
                        Habilitar Respaldos Automáticos
                      </FormLabel>
                      <Switch
                        id="auto-backup"
                        isChecked={autoBackup}
                        onChange={(e) => setAutoBackup(e.target.checked)}
                      />
                    </FormControl>
                    
                    {autoBackup && (
                      <VStack gap="4" align="stretch" pl="4" borderLeft="2px" borderColor="purple.200">
                        <FormControl>
                          <FormLabel>Frecuencia de Respaldo</FormLabel>
                          <Select defaultValue="daily">
                            <option value="hourly">Cada hora</option>
                            <option value="daily">Diario</option>
                            <option value="weekly">Semanal</option>
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel>Hora de Respaldo</FormLabel>
                          <Input type="time" defaultValue="02:00" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Período de Retención (días)</FormLabel>
                          <Input type="number" defaultValue="30" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Ubicación del Respaldo</FormLabel>
                          <Input defaultValue="/var/backups/aura" />
                        </FormControl>
                      </VStack>
                    )}
                  </VStack>
                </Box>

                <Box bg="white" p="6" borderRadius="lg" boxShadow="sm">
                  <Heading size="md" mb="4">Estado del Respaldo</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                    <Box>
                      <Text fontSize="sm" color="gray.500">Último Respaldo</Text>
                      <Text fontWeight="semibold">15 de enero de 2024 02:00</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">Tamaño del Respaldo</Text>
                      <Text fontWeight="semibold">2.3 GB</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">Próximo Respaldo</Text>
                      <Text fontWeight="semibold">16 de enero de 2024 02:00</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">Estado</Text>
                      <Text fontWeight="semibold" color="green.600">Exitoso</Text>
                    </Box>
                  </SimpleGrid>
                  <HStack gap="2" mt="4">
                    <Button size="sm" colorScheme="blue">
                      Crear Respaldo Ahora
                    </Button>
                    <Button size="sm" variant="outline">
                      Restaurar desde Respaldo
                    </Button>
                  </HStack>
                </Box>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default SystemSettings;