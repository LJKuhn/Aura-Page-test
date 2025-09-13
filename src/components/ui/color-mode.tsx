// (React import no necesario explícitamente con JSX transform moderno)
import { IconButton, useColorMode } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";

// color-mode.tsx
// -----------------------------------------------------------------------------
// Botón reutilizable para alternar entre modo claro / oscuro usando Chakra UI.
// Se apoya en el hook interno `useColorMode`.

export interface ColorModeButtonProps {
  size?: string;
  variant?: string;
  ariaLabel?: string;
}

/**
 * ColorModeButton
 * Alterna el tema visual de la aplicación (light/dark).
 */
export function ColorModeButton({ size = "md", variant = "ghost", ariaLabel = "Cambiar modo" }: ColorModeButtonProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label={ariaLabel}
      icon={isDark ? <LuSun /> : <LuMoon />}
      size={size as any}
      variant={variant as any}
    />
  );
}