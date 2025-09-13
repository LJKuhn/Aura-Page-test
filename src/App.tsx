// Componente raíz de la aplicación: configura proveedores globales (Chakra UI, React Query, Router y Auth)
import { ChakraProvider, Spinner, Flex } from '@chakra-ui/react';
import theme from './theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout'; // Se puede lazy-load si se vuelve pesado

// ---------------------------------------------------------------------------
// Lazy loaded pages (code splitting por ruta)
// ---------------------------------------------------------------------------
// Regla: páginas poco frecuentes o con dependencias pesadas → lazy.
// Las más críticas (Login, Home inicial) pueden cargarse directo, pero aquí
// se demuestra la técnica aplicándola a la mayoría para maximizar split.
// ---------------------------------------------------------------------------
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UserManagement = lazy(() => import('./pages/UserManagement'));
const RolesPermissions = lazy(() => import('./pages/RolesPermissions'));
const DeviceAdministration = lazy(() => import('./pages/DeviceAdministration'));
const LocationManagement = lazy(() => import('./pages/LocationManagement'));
const ZoneAdministration = lazy(() => import('./pages/ZoneAdministration'));
const EventsLogs = lazy(() => import('./pages/EventsLogs'));
const Communications = lazy(() => import('./pages/Communications'));
const SystemSettings = lazy(() => import('./pages/SystemSettings'));
const Profile = lazy(() => import('./pages/Profile'));

// Fallback visual simple mientras se cargan los chunks
// Fallback mostrado mientras se cargan dinámicamente las rutas (chunks lazy)
const RouteFallback = () => (
  <Flex w="100%" h="100vh" align="center" justify="center" direction="column" gap={4}>
    <Spinner size="xl" thickness='4px' speed='0.65s' />
    <span style={{ fontSize: 14, opacity: 0.8 }}>Cargando módulo…</span>
  </Flex>
);

// Cliente de React Query para caché y gestión de estado de datos asíncronos
const queryClient = new QueryClient();

// App: orquesta los providers y define el árbol de rutas con carga diferida
const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
  <BrowserRouter basename="/Aura-Page-test">
          <AuthProvider>
            <Suspense fallback={<RouteFallback />}> 
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="roles" element={<RolesPermissions />} />
                  <Route path="devices" element={<DeviceAdministration />} />
                  <Route path="locations" element={<LocationManagement />} />
                  <Route path="zones" element={<ZoneAdministration />} />
                  <Route path="events" element={<EventsLogs />} />
                  <Route path="communications" element={<Communications />} />
                  <Route path="settings" element={<SystemSettings />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;