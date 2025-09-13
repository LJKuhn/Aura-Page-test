import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// ResourceChart.tsx
// -----------------------------------------------------------------------------
// Gráfico de línea simple para visualizar consumo de un recurso (energía, agua, etc.).
// Actualmente usa datos mock locales y está preparado para recibir datos por props.
// Buenas prácticas:
//   - Componente puro (sin estado interno) => fácil de testear.
//   - Acepta data externa para reuso.

export interface ResourcePoint {
  name: string;      // Etiqueta del eje X (ej: hora)
  consumo: number;   // Valor numérico del recurso
}

interface ResourceChartProps {
  data?: ResourcePoint[];        // Datos a graficar
  color?: string;                // Color de la línea principal
  height?: number;               // Alto del contenedor
}

const defaultData: ResourcePoint[] = [
  { name: "08:00", consumo: 120 },
  { name: "09:00", consumo: 150 },
  { name: "10:00", consumo: 90 },
  { name: "11:00", consumo: 200 },
];

/**
 * ResourceChart
 * Renderiza un gráfico de líneas para mostrar la evolución del consumo de un recurso.
 * @param {ResourceChartProps} props - Props de configuración y datos.
 * @returns {JSX.Element} Gráfico responsivo.
 */
export const ResourceChart: React.FC<ResourceChartProps> = ({ data = defaultData, color = "#3182ce", height = 250 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data}>
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="consumo" stroke={color} strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);