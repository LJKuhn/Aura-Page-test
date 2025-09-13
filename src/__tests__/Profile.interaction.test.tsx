// -----------------------------------------------------------------------------
// Profile.interaction.test.tsx
// Objetivo: Validar interacción básica en la pestaña Seguridad de Profile.
//  - Toggle de MFA habilita el bloque de configuración adicional.
//  - Se utiliza userEvent para simular interacción real (click).
// -----------------------------------------------------------------------------
import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test-utils/renderWithProviders';
import Profile from '../pages/Profile';

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { name: 'Usuario Demo', email: 'demo@example.com', role: 'Admin', institution: 'UNRaf' } })
}));

describe('Profile page - interacción MFA', () => {
  it('muestra panel MFA adicional al activar el switch', async () => {
    renderWithProviders(<Profile />);
    const tab = await screen.findByRole('tab', { name: /Seguridad/i });
    await userEvent.click(tab);
    // Buscar switch (rol checkbox) por parte del label
    const switchEl = await screen.findByRole('checkbox', { name: /MFA para tu cuenta/i });
    expect(switchEl).toBeInTheDocument();
    if (switchEl.getAttribute('aria-checked') === 'true') {
      // Si ya estuviera activado (raro), primero desactivar para estado consistente
      await userEvent.click(switchEl);
    }
    await userEvent.click(switchEl);
    await waitFor(async () => {
      expect(await screen.findByText(/Configura tu método MFA/i)).toBeInTheDocument();
    }, { timeout: 8000 });
  }, 15000);
});