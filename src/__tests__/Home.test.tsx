// -----------------------------------------------------------------------------
// Home.test.tsx
// Pruebas básicas de render para la página Home:
//  - Verifica que el encabezado de bienvenida (centralizado en messages) se renderiza.
//  - Ejemplo mínimo de uso de renderWithProviders (Chakra + Router en memoria).
// Ampliaciones posibles: snapshot de KPIs, conteo de tarjetas, accesibilidad (roles/landmarks).
// -----------------------------------------------------------------------------
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Home from '../pages/Home';
import { renderWithProviders } from '../test-utils/renderWithProviders';

// Nota: Si se requiere ChakraProvider envolver aquí

describe('Home page', () => {
  it('renderiza encabezado de bienvenida', () => {
  renderWithProviders(<Home />);
    expect(screen.getByText(/Bienvenido a AURA/i)).toBeTruthy();
  });
});
