// -----------------------------------------------------------------------------
// messages.ts
// Fuente centralizada de textos (es) para evitar duplicación de literales.
// En una futura implementación i18n se separarán por locale (es, en, etc.).
// Claves mínimas iniciales usadas en varias páginas.
// -----------------------------------------------------------------------------
export const messages = {
  common: {
    saveChanges: 'Guardar Cambios',
  },
  pages: {
    home: {
      welcomeHeading: 'Bienvenido a AURA',
      subtitle: 'Administración Unificada de Recursos y Accesos - Sistema de Gestión Universitaria',
      recentActivity: 'Actividad Reciente',
      systemStatus: 'Estado del Sistema',
    },
    profile: { heading: 'Configuración de Perfil' },
    roles: { heading: 'Roles y Permisos' },
    zones: { heading: 'Administración de Zonas' },
    systemSettings: { heading: 'Configuración del Sistema' },
  },
} as const;

export type Messages = typeof messages;