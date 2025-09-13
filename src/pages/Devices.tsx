// -----------------------------------------------------------------------------
// Devices.tsx
// Listado de dispositivos con tarjeta resumida + gráfico simple de consumo.
// Usa hook useDevices (mock) para simular carga asíncrona antes de integrar backend.
// -----------------------------------------------------------------------------
// Página para mostrar y gestionar dispositivos.
// Utiliza el hook useDevices y los componentes DeviceCard y ResourceChart.

import { Box, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { DeviceCard } from "../components/ui/DeviceCard";
import { ResourceChart } from "../components/ui/ResourceChart";
import { useDevices } from "../hooks/useDevices";

export const Devices = () => {
  const { devices, loading } = useDevices();

  return (
    <Box p={6}>
      <Heading mb={4}>Dispositivos</Heading>
      {loading ? (
        <Spinner />
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {devices.map((device) => (
            <DeviceCard key={device.id} {...device} />
          ))}
        </SimpleGrid>
      )}
      <Box mt={8}>
        <Heading size="md" mb={2}>
          Consumo Energético
        </Heading>
        <ResourceChart />
      </Box>
    </Box>
  );
};

export default Devices;
