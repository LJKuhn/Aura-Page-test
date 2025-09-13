// useDevices.ts
// -----------------------------------------------------------------------------
// Hook personalizado para obtener la lista de dispositivos.
// Fuente de datos: mock definido en `api/devices.ts`.
// Responsabilidades:
//   1. Gestionar estado de carga (loading).
//   2. Proveer tipado consistente de los dispositivos.
//   3. Facilitar sustitución futura por llamadas reales a API (solo cambiar getDevices).
// Buenas prácticas aplicadas:
//   - Tipado estricto con union types para `status`.
//   - Encapsulación de la lógica de datos fuera de los componentes de presentación.
// Cómo migrar a backend real:
//   Reemplazar la implementación de `getDevices` por una función async que haga fetch/axios
//   y devuelva `Promise<Device[]>`.

import { useEffect, useState } from "react"; // useEffect para ciclo de vida, useState para estado local de datos
import { getDevices } from "../api/devices";

// Define el tipo de dispositivo para TypeScript
export type Device = {
  id: string;
  name: string;
  type: string;
  status: "online" | "offline" | "error";
  location: string;
};

/**
 * useDevices
 * Hook que retorna la lista de dispositivos y el estado de carga.
 * @returns {object} Objeto con:
 *  - devices: Device[] Lista de dispositivos disponibles.
 *  - loading: boolean Indica si la carga inicial sigue en progreso.
 */
export function useDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Invoca la función abstracta de obtención de datos (mock / futura API real)
    getDevices().then((data) => {
      setDevices(data);
      setLoading(false);
    });
  }, []); // Solo en montaje inicial

  return { devices, loading };
}