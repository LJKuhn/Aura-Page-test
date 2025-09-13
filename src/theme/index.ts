import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#e8f5e8',
      100: '#c6e6c6',
      200: '#a1d4a1',
      300: '#7bc27b',
      400: '#5cb35c',
      500: '#3da43d', // Primary green
      600: '#359535',
      700: '#2c832c',
      800: '#227022',
      900: '#155815',
    },
    accent: {
      50: '#e6f3ff',
      100: '#b3d9ff',
      200: '#80bfff',
      300: '#4da6ff',
      400: '#1a8cff',
      500: '#0073e6', // Primary blue
      600: '#0066cc',
      700: '#0059b3',
      800: '#004c99',
      900: '#003d80',
    },
    institutional: {
      darkGreen: '#2c832c',
      lightGreen: '#5cb35c',
      darkBlue: '#0059b3',
      lightBlue: '#4da6ff',
      gray: '#f7fafc',
      darkGray: '#2d3748',
    },
  },
  fonts: {
    heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
          _active: {
            bg: 'brand.700',
          },
        },
        secondary: {
          bg: 'accent.500',
          color: 'white',
          _hover: {
            bg: 'accent.600',
          },
          _active: {
            bg: 'accent.700',
          },
        },
      },
      defaultProps: {
        variant: 'primary',
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'white',
          boxShadow: 'md',
          borderRadius: 'lg',
          _dark: {
            bg: 'gray.800',
          },
        },
      },
    },
  },
});

export default theme;