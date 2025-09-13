// StatusIndicator.tsx
// -----------------------------------------------------------------------------
// Indicador visual pequeño para estados de entidad (ej: dispositivo online/offline/error).
// Diseñado para ser minimalista y reutilizable en tablas, tarjetas o listas.
// Colores por defecto: verde (online), gris (offline), rojo (error) — extensible.

import React from "react";
import { HStack, Box, Text } from "@chakra-ui/react";

export type BasicStatus = "online" | "offline" | "error";

interface StatusIndicatorProps {
	status: BasicStatus;         // Estado a representar
	label?: string;              // Texto opcional a mostrar junto al punto
	size?: number;               // Tamaño del punto (px)
	showLabel?: boolean;         // Controla si se muestra el texto
}

const STATUS_COLOR: Record<BasicStatus, string> = {
	online: "green.400",
	offline: "gray.400",
	error: "red.400",
};

/**
 * StatusIndicator
 * Muestra un punto coloreado y opcionalmente un texto asociado.
 */
export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, label, size = 10, showLabel = true }) => (
	<HStack spacing={2} display="inline-flex">
		<Box
			aria-label={`estado-${status}`}
			borderRadius="full"
			boxSize={`${size}px`}
			bg={STATUS_COLOR[status]}
			role="status"
		/>
		{showLabel && <Text fontSize="sm">{label ?? status}</Text>}
	</HStack>
);

export default StatusIndicator;
