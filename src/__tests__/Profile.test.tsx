// -----------------------------------------------------------------------------
// Profile.test.tsx
// Objetivo: Validar render mínimo del encabezado de la página Profile con mock de AuthContext.
// Casos cubiertos:
//  * Render de heading traducido.
// Posibles extensiones:
//  * Interacción con toggle MFA.
//  * Cambio de idioma (cuando se implemente i18n real).
//  * Validación de formularios (contraseña) con estados de error.
// -----------------------------------------------------------------------------
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import { renderWithProviders } from '../test-utils/renderWithProviders';

// Mock de contexto Auth
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { name: 'Usuario Demo', email: 'demo@example.com', role: 'Admin', institution: 'UNRaf' } })
}));

describe('Profile page', () => {
  it('muestra encabezado de perfil', () => {
  renderWithProviders(<Profile />);
    expect(screen.getByText(/Configuración de Perfil/i)).toBeTruthy();
  });
});
