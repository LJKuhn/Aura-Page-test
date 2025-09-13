"use client"

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// provider.tsx
// -----------------------------------------------------------------------------
// Wrapper de proveedor de Chakra UI para centralizar configuración futura
// (temas, colorModeManager, estilos globales, etc.).
// Actualmente minimalista; se puede extender importando `theme` desde `/theme`.

const baseTheme = extendTheme({});

interface ProviderProps {
  children: React.ReactNode; // Árbol de la aplicación a envolver
}

/**
 * Provider
 * Envuelve la aplicación con el contexto de Chakra UI.
 */
export function Provider({ children }: ProviderProps) {
  return <ChakraProvider theme={baseTheme}>{children}</ChakraProvider>;
}
