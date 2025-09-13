import React from "react";
import { Box, Text, Badge } from "@chakra-ui/react";

// DeviceCard.tsx
// -----------------------------------------------------------------------------
// Componente de presentación para mostrar datos básicos de un dispositivo.
// Evita incluir lógica de negocio: solo renderiza la información recibida vía props.
// Props mínimas: nombre, tipo, estado y ubicación.
// Se puede extender añadiendo acciones (botones) o tooltips sin romper su uso actual.

type DeviceStatus = "online" | "offline" | "error";

interface DeviceCardProps {
  name: string;
  type: string;
  status: DeviceStatus;
  location: string;
}

/**
 * DeviceCard
 * Renderiza una tarjeta simple con información de un dispositivo.
 * @param {DeviceCardProps} props Datos del dispositivo.
 * @returns {JSX.Element} Tarjeta estilizada.
 */
export const DeviceCard: React.FC<DeviceCardProps> = ({ name, type, status, location }) => (
  <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
    <Text fontWeight="bold">{name}</Text>
    <Text>Tipo: {type}</Text>
    <Text>Ubicación: {location}</Text>
    <Badge colorScheme={status === "online" ? "green" : status === "offline" ? "gray" : "red"}>
      {status}
    </Badge>
  </Box>
);