// devices.ts
// -----------------------------------------------------------------------------
// Servicio mock para obtención de dispositivos.
// Objetivo: permitir desarrollo y pruebas de UI sin dependencia del backend.
// Sustitución futura: reemplazar el cuerpo de `getDevices` por fetch/axios hacia
// un endpoint real. Mantener la firma `(): Promise<Device[]>` para no romper consumidores.

import { Device } from "../hooks/useDevices"; // Reutiliza el tipo centralizado del hook

/**
 * getDevices
 * Devuelve un listado de dispositivos simulados.
 * @returns {Promise<Device[]>} Promesa resuelta con lista mock de dispositivos.
 */
export const getDevices = async (): Promise<Device[]> => {
  // Simulación: en un caso real podríamos añadir un pequeño delay artificial
  // await new Promise(r => setTimeout(r, 200));
  return [
    { id: "1", name: "Sensor Temperatura", type: "sensor", status: "online", location: "Aula 101" },
    { id: "2", name: "Actuador Luz", type: "actuator", status: "offline", location: "Aula 102" },
    { id: "3", name: "Gateway Principal", type: "gateway", status: "error", location: "Hall" },
  ];
};