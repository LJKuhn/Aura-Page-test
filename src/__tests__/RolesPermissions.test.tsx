// -----------------------------------------------------------------------------
// RolesPermissions.test.tsx
// Prueba básica: comprueba que el título (centralizado vía messages) se renderiza.
// Extensiones sugeridas:
//  * Conteo de tarjetas de roles mock.
//  * Simular acción de "Gestionar Permisos" (cuando exista interacción real).
//  * Accesibilidad: verificar uso de headings y tabla con roles correctos.
// -----------------------------------------------------------------------------
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import RolesPermissions from '../pages/RolesPermissions';
import { renderWithProviders } from '../test-utils/renderWithProviders';

describe('RolesPermissions page', () => {
  it('renderiza título de roles', () => {
  renderWithProviders(<RolesPermissions />);
    expect(screen.getByText(/Roles y Permisos/i)).toBeTruthy();
  });
});
