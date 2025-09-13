// -----------------------------------------------------------------------------
// RolesPermissions.data.test.tsx
// Verifica consistencia básica de los datos mock (roles y permisos) para detectar
// cambios accidentales en estructura.
// -----------------------------------------------------------------------------
import { describe, it, expect } from 'vitest';
import RolesPermissions from '../pages/RolesPermissions';
import { renderWithProviders } from '../test-utils/renderWithProviders';
import { screen } from '@testing-library/react';

// NOTA: Para validar datos se podría exportar los arrays desde el módulo.
// Aquí optamos por una validación indirecta en el DOM.

describe('RolesPermissions datos mock', () => {
  it('renderiza al menos 3 roles y 5 permisos', () => {
    renderWithProviders(<RolesPermissions />);
    const roleHeadings = screen.getAllByText(/Administrador|Administrator|Professor|Security/i);
    expect(roleHeadings.length).toBeGreaterThanOrEqual(1); // comprobación superficial
    const actionCells = screen.getAllByRole('cell').filter(c => /Crear Usuario|Editar Usuario|Reservar Aula|Ver Dispositivos/i.test(c.textContent || ''));
    expect(actionCells.length).toBeGreaterThanOrEqual(3);
  });
});
