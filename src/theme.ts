// Definición y extensión del tema de Chakra UI para centralizar colores y config
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  // Configuración inicial del modo de color y comportamiento
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    // Paleta base de la marca (placeholder / ejemplo)
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
});

export default theme;
