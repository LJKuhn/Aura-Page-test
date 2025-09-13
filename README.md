# ui-components Sandbox.

## Descripción
Sandbox individual para el desarrollo de ui-components.

## Puerto asignado
- **Puerto**: 3002

## Inicio rápido

### 1. Levantar servicios base (primera vez)
```bash
# Desde la raíz del proyecto
docker-compose -f docker-compose.base.yml up -d
```

### 2. Levantar este servicio
```bash
# Desde este directorio
docker-compose up -d
```

### 3. Ver logs
```bash
docker-compose logs -f
```

### 4. Detener servicio
```bash
docker-compose down
```

## Desarrollo local (sin Docker)

### Backend
```bash
# Instalar dependencias


# Ejecutar servicio
uvicorn app.main:app --reload --port 3002
```

### Frontend
```bash
- `/` - Root endpoint
- `/health` - Health check
- `/docs` - Documentación Swagger (solo backend)
pytest tests/

# Frontend
npm test
```
## Estructura y funcionamiento de los archivos principales
A continuación se detalla la función de cada carpeta y archivo base creado para el desarrollo desacoplado del frontend:

`src/api/`
* devices.ts: Mock de dispositivos. Simula la obtención de datos de dispositivos para poder desarrollar y testear la UI sin depender del backend. Cuando el backend esté listo, aquí se implementarán las llamadas reales a la API.

`src/hooks/`
* useDevices.ts: Hook personalizado que obtiene la lista de dispositivos usando el mock de api/devices.ts. Permite manejar el estado de carga y facilita el cambio a datos reales en el futuro.
* useUsers.ts: Hook personalizado para obtener usuarios (mock). Igual que el anterior, pero para la gestión de usuarios y privilegios.
src/components/ui/
* DeviceCard.tsx: Componente visual que muestra la información de un dispositivo (nombre, tipo, estado, ubicación) usando Chakra UI. Reutilizable en listados y dashboards.
* ResourceChart.tsx: Componente de gráfico de consumo energético/hídrico usando Recharts. Permite visualizar datos históricos o en tiempo real.
* UserTable.tsx: Tabla de usuarios con roles y privilegios, usando Chakra UI. Pensado para la gestión y visualización de usuarios.
`src/pages/`
* Dashboard.tsx: Página principal de resumen. Muestra ejemplos de dispositivos y usuarios, integrando los componentes anteriores.
* Devices.tsx: Página dedicada a la gestión y monitoreo de dispositivos. Incluye listado de dispositivos y gráfico de consumo.
* RolesPermissions.tsx: Gestión mock de roles y matriz de permisos.
* UserManagement.tsx: Listado y filtros de usuarios (mock) integrado con roles.
* DeviceAdministration.tsx: Administración avanzada de dispositivos (KPIs + filtros).
* Communications.tsx: Estado de protocolos y conexiones (mock comunicaciones IoT).
* EventsLogs.tsx: Visualización y filtrado simple de eventos del sistema.
* LocationManagement.tsx: Jerarquía de ubicaciones (campus → edificio → aula) mock.
* ZoneAdministration.tsx: Zonas geográficas con dispositivos y puntos de acceso (mock).
* SystemSettings.tsx: Configuración global del sistema (seguridad, autenticación, respaldos) mock.
* Profile.tsx: Preferencias y seguridad del usuario autenticado (mock local state).
* Home.tsx: Página de bienvenida / overview de métricas principales.
## ¿Cómo funciona la carpeta ui-components?

Flujo de desarrollo:

* Los datos se obtienen desde archivos mock en `src/api/`.
* Los hooks en `src/hooks/` gestionan la obtención y el estado de los datos.
* Los componentes en `src/components/ui/` reciben los datos y los muestran.
* Las páginas en `src/pages/` integran los componentes y definen la estructura visual.
* Cuando el backend esté disponible, se reemplazan los mocks por llamadas reales en `src/api/`.

## Referencia de Componentes y Hooks (API Interna)

Formato: Nombre | Descripción breve | Props principales | Valor de retorno / Efecto

### Hooks

1. useDevices
 - Descripción: Obtiene (mock) lista de dispositivos y estado de carga.
 - Props: (ninguna).
 - Retorno: { devices: Device[]; loading: boolean }.
 - Notas: Sustituir implementación interna por fetch real cuando exista backend.

2. useUsers
 - Descripción: Devuelve usuarios mock con pequeño retardo simulado.
 - Props: (ninguna).
 - Retorno: { users: User[]; loading: boolean }.

3. useToast (re-export ui/use-toast)
 - Descripción: Gestiona el estado de notificaciones (toasts) globales.
 - Props: (ninguna).
 - Retorno: { toast: (opts) => void; toasts: ToastState[] }.
 - Ejemplo: const { toast } = useToast(); toast({ title: 'Listo', description: 'Guardado' });

### Componentes UI Base

1. DeviceCard
 - Descripción: Tarjeta compacta para mostrar datos clave de un dispositivo.
 - Props: { device: Device }.
 - Retorno: JSX.Element.

2. UserTable
 - Descripción: Tabla simplificada de usuarios y roles.
 - Props: { users: User[] }.
 - Retorno: JSX.Element.

3. ResourceChart
 - Descripción: Gráfico (línea) parametrizable para métricas temporales.
 - Props: { data: { name: string; value: number }[]; color?: string; height?: number }.
 - Retorno: JSX.Element.
 - Notas: Usa Recharts. Extensible a múltiples series.

4. StatusIndicator
 - Descripción: Muestra un punto coloreado y etiqueta según estado online/offline/error.
 - Props: { status: 'online' | 'offline' | 'error'; size?: number }.
 - Retorno: JSX.Element.

### Componentes de Formulario

1. Input
 - Descripción: Campo de texto estilizado estándar.
 - Props: Todas las de un <input> nativo (type, placeholder, value, onChange, disabled...).
 - Retorno: JSX.Element.

2. Form / FormField / FormItem / FormLabel / FormControl / FormDescription / FormMessage
 - Descripción: Infraestructura para integrar react-hook-form con estilos y accesibilidad.
 - Props: (FormField) name, control, rules, render; resto heredan props nativas de sus tags.
 - Retorno: JSX.Element / hooks (useFormField devuelve metadatos y estado del campo).

3. Checkbox
 - Descripción: Control booleano (soporta estado indeterminado) basado en Radix.
 - Props: checked, defaultChecked, onCheckedChange, disabled, required, name.
 - Retorno: JSX.Element.

4. Select (Root + Trigger + Content + Item + Label + Separator)
 - Descripción: Selector accesible con teclado y soporte de scroll.
 - Props: value, defaultValue, onValueChange (Root); value (Item), placeholder (SelectValue).
 - Retorno: JSX.Element.

5. Switch
 - Descripción: Toggle binario on/off.
 - Props: checked, defaultChecked, onCheckedChange, disabled.
 - Retorno: JSX.Element.

6. Textarea
 - Descripción: Área de texto multilínea.
 - Props: Todas las de <textarea> (rows, placeholder, value...).
 - Retorno: JSX.Element.

7. RadioGroup / RadioGroupItem
 - Descripción: Selección exclusiva entre varias opciones.
 - Props (RadioGroup): value, defaultValue, onValueChange. (Item): value.
 - Retorno: JSX.Element.

8. Slider
 - Descripción: Selección de valor (o rango) numérico con arrastre.
 - Props: value[], defaultValue[], min, max, step, onValueChange.
 - Retorno: JSX.Element.

### Navegación y Organización

1. Tabs / TabsList / TabsTrigger / TabsContent
 - Descripción: Organización de contenido en paneles alternables.
 - Props: value, defaultValue, onValueChange (Root); value (Trigger/Content).
 - Retorno: JSX.Element.

2. Pagination y subcomponentes
 - Descripción: Control de paginado con enlaces a páginas y navegación previa/siguiente.
 - Props: isActive (PaginationLink), size.
 - Retorno: JSX.Element.

### Superposiciones / Overlays

1. Dialog
 - Descripción: Modal centrado con overlay y animaciones.
 - Props: open, onOpenChange (Root); value interno Radix.
 - Retorno: JSX.Element.

2. Drawer
 - Descripción: Panel deslizante desde abajo (mobile friendly).
 - Props: shouldScaleBackground, open, onOpenChange.
 - Retorno: JSX.Element.

3. Popover
 - Descripción: Contenedor flotante para contenido contextual.
 - Props: open, onOpenChange, side, align.
 - Retorno: JSX.Element.

4. Tooltip
 - Descripción: Mensaje breve emergente al hover/focus.
 - Props: delayDuration, side, align.
 - Retorno: JSX.Element.

### Mensajes y Estados

1. Alert
 - Descripción: Bloque informativo o de error (variantes default / destructive).
 - Props: variant.
 - Retorno: JSX.Element.

2. AlertDialog
 - Descripción: Confirmación crítica con acciones explícitas.
 - Props: open, onOpenChange.
 - Retorno: JSX.Element.

### Menús y Acciones Contextuales

1. DropdownMenu (+ subcomponentes)
 - Descripción: Menú contextual con soporte de submenús, checkbox y radio items.
 - Props: side, align, onOpenChange.
 - Retorno: JSX.Element.

2. HoverCard
 - Descripción: Panel flotante sobre hover/focus para preview contextual.
 - Props: openDelay, closeDelay.
 - Retorno: JSX.Element.

3. Menubar
 - Descripción: Barra de menús estilo desktop con submenús y atajos.
 - Props: loop, dir.
 - Retorno: JSX.Element.

### Elementos Básicos

1. Button
 - Descripción: Botón de acción configurable por variante y tamaño.
 - Props: variant (default, destructive, outline, secondary, ghost, link), size (default, sm, lg, icon), asChild.
 - Retorno: JSX.Element.

2. Badge
 - Descripción: Etiqueta pequeña para estados/categorías.
 - Props: variant (default, secondary, destructive, outline).
 - Retorno: JSX.Element.

3. Avatar / AvatarImage / AvatarFallback
 - Descripción: Imagen de usuario con fallback.
 - Props: src, alt (Image); children (Fallback).
 - Retorno: JSX.Element.

4. Card y secciones
 - Descripción: Contenedor estructurado (Header, Content, Footer, Title, Description).
 - Props: children, className.
 - Retorno: JSX.Element.

5. Skeleton
 - Descripción: Placeholder animado de carga.
 - Props: className (para tamaño/forma).
 - Retorno: JSX.Element.

### Datos y Estado

1. Progress

## Estado de Localización (i18n simplificada)

Se realizó una traducción directa al español de todos los textos visibles en las páginas. Criterios:
1. Claves internas o potenciales identificadores (status, type, id, keys de permisos) se mantienen en inglés cuando representan un valor de dominio que podría mapearse en el backend.
2. Etiquetas de UI, encabezados, placeholders y mensajes descriptivos se han traducido al español neutro.
3. Para permisos (RolesPermissions) se muestra acción y componente traducidos, dejando un comentario con la clave original en inglés para facilitar futura integración.
4. No se introdujo un framework de i18n (ej. i18next) para evitar complejidad prematura. Cuando se integre, centralizar strings en un archivo de recursos y reemplazar literales.
5. Fecha/hora permanecen en algunas páginas como literales mock. Recomendado usar dayjs/date-fns con locale es al integrar backend.

Cobertura actual:
- Páginas traducidas y documentadas: Home, Dashboard, Devices, DeviceAdministration, Communications, EventsLogs, RolesPermissions, UserManagement, LocationManagement, ZoneAdministration, SystemSettings, Profile, NotFound, Index.
- Pendiente (no aplica o ya estaba): Componentes base y hooks (comentados en inglés donde son autoexplicativos, se pueden traducir posteriormente si se exige uniformidad total).

## Guía para futuras traducciones
1. Evitar duplicar cadenas; extraer a un objeto `messages` cuando una misma etiqueta aparezca en >3 lugares.
2. Mantener comentarios de intención encima de bloques complejos (// Traducción: ... ) cuando la palabra en inglés sea un término de dominio aceptado.
3. Para nuevos permisos: añadir clave backend (en inglés) y label mostrado (español). Ejemplo:
```ts
// backendKey: 'DEVICE_RESTART'
{ id: 'X', action: 'Reiniciar Dispositivo', component: 'Gestión de Dispositivos', role: 'Administrator' }
```
4. Cuando se implemente i18n formal, crear `src/i18n/es.ts` y `src/i18n/en.ts` y sustituir literales progresivamente.

## Decisión sobre rollup-plugin-visualizer
El plugin de análisis se dejó como dependencia de desarrollo (`rollup-plugin-visualizer`). Actualmente NO se ejecuta automáticamente para evitar fallos en Docker. Para generar el reporte manual:
```
npm run analyze
```
Esto abrirá `dist/stats.html` tras el build. Si se desea remover completamente, borrar el script y la dependencia.
 - Descripción: Barra de progreso determinado.
 - Props: value (0-100).
 - Retorno: JSX.Element.

2. Separator
 - Descripción: Línea divisoria horizontal o vertical.
 - Props: orientation.
 - Retorno: JSX.Element.

3. Table (suite)
 - Descripción: Helpers estilizados para tablas HTML.
 - Props: estándar de elementos table/thead/tbody/tr/td.
 - Retorno: JSX.Element.

### Controles de Estado

1. Toggle
 - Descripción: Botón con estado on/off.
 - Props: pressed (data-state manejado por Radix), disabled.
 - Retorno: JSX.Element.

2. ToggleGroup / ToggleGroupItem
 - Descripción: Agrupa toggles (single o multiple).
 - Props: type, value(s), onValueChange.
 - Retorno: JSX.Element.

### Contenido Expandible

1. Accordion
 - Descripción: Lista de secciones expandibles.
 - Props: type (single|multiple), collapsible, value, defaultValue.
 - Retorno: JSX.Element.

2. Collapsible
 - Descripción: Contenedor simple colapsable sin semántica de lista.
 - Props: open, defaultOpen, onOpenChange.
 - Retorno: JSX.Element.

### Sistema de Notificaciones (Toast)

Componentes: ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastAction, ToastClose, Toaster.
 - Flujo: El hook `useToast` agrega objetos → <Toaster /> los renderiza dentro de ToastProvider.
 - Variante soportada: default | destructive.
 - Uso mínimo:
	 const { toast } = useToast();
	 toast({ title: 'Éxito', description: 'Operación completada' });

### Sidebar (Navegación lateral)

Objetivo: Layout colapsable con grupos, menús y submenús.
 - Contexto: `SidebarProvider` provee estado (state, isMobile, toggle, etc.).
 - Componentes principales: Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset.
 - Menú: SidebarMenu > SidebarMenuItem > SidebarMenuButton (+ SidebarMenuAction / SidebarMenuBadge opcionales).
 - Submenú: SidebarMenuSub > SidebarMenuSubItem > SidebarMenuSubButton.
 - Interacción: SidebarTrigger alterna expand/colapse; SidebarRail permite expandir al hacer hover cuando está colapsado (desktop).
 - Props clave en botones: isActive (resalta ruta actual), tooltip (aparece sólo cuando está colapsado y no en mobile), variant, size.

### Navegación Avanzada

1. Breadcrumb
 - Descripción: Indica la ruta jerárquica actual.
 - Props: separator (opcional en Root), composición declarativa.
 - Retorno: JSX.Element.

2. NavigationMenu
 - Descripción: Menú de navegación con paneles enriquecidos.
 - Props: Root (orientation, delay), Trigger (abre panel), Content (panel animado).
 - Retorno: JSX.Element.

3. Command (CommandDialog, CommandInput, CommandList, CommandItem, etc.)
 - Descripción: Command palette para búsqueda global/acciones rápidas (Ctrl+K).
 - Props: DialogProps en CommandDialog, value y onSelect en ítems.
 - Retorno: JSX.Element.

4. ContextMenu
 - Descripción: Menú contextual (click derecho) con items, checkbox, radio y submenús.
 - Props: composicionales (Root, Trigger, Content...).
 - Retorno: JSX.Element.

### Visualización y Datos Avanzados

1. ChartContainer / ChartTooltipContent / ChartLegendContent
 - Descripción: Infra para gráficos Recharts con theming y tooltip/legend configurables.
 - Props: config (mapa clave → { label, icon, color|theme }).
 - Retorno: JSX.Element.

2. Calendar
 - Descripción: Selector de fechas configurado (react-day-picker) con estilos.
 - Props: DayPicker props (mode, selected, onSelect...).
 - Retorno: JSX.Element.

3. Carousel
 - Descripción: Carrusel de slides (Embla) con navegación previa/siguiente y orientación.
 - Props: opts (Embla options), plugins, orientation, setApi.
 - Retorno: JSX.Element.

### Entrada Especializada

1. InputOTP / InputOTPSlot / InputOTPGroup / InputOTPSeparator
 - Descripción: Captura códigos OTP multi-slot.
 - Props: value, onChange, maxLength, pattern.
 - Retorno: JSX.Element.

### Layout y Redimensionamiento

1. ResizablePanelGroup / ResizablePanel / ResizableHandle
 - Descripción: Paneles ajustables arrastrando el separador.
 - Props: direction, onLayout, storageId.
 - Retorno: JSX.Element.

2. ScrollArea / ScrollBar
 - Descripción: Contenedor con scroll estilizado.
 - Props: type, scrollHideDelay.
 - Retorno: JSX.Element.

3. AspectRatio
 - Descripción: Mantiene relación de aspecto fija para contenido.
 - Props: ratio.
 - Retorno: JSX.Element.

4. Sheet
 - Descripción: Panel deslizante (top/right/bottom/left) con overlay.
 - Props: side (right|left|top|bottom), open, onOpenChange.
 - Retorno: JSX.Element.

### Notificaciones Alternativas

1. Sonner (Toaster, toast)
 - Descripción: Sistema de notificaciones ligero alternativo a Toast interno.
 - Props: position, theme, duration.
 - Retorno: JSX.Element / funciones.

### Estado de Cobertura
Todos los componentes listados cuentan ya con documentación embebida (JSDoc) y ficha resumida aquí.

## Guía de Migración (Mocks → API Real)

1. Reemplazar funciones en `src/api/*.ts` para usar fetch/axios con endpoints reales.
2. Manejar errores (try/catch) y estados intermedios (loading, empty) en hooks.
3. Ajustar tipos (Device, User) para reflejar exactamente el contrato backend.
4. Añadir invalidación / caching avanzado con React Query (useQuery) si se integra.
5. Quitar temporizadores/delays simulados.

## Ejemplos Rápidos

Disparar un toast:
```ts
import { useToast } from '@/components/ui/use-toast';
const { toast } = useToast();
toast({ title: 'Guardado', description: 'Dispositivo actualizado' });
```

Uso de ResourceChart:
```tsx
<ResourceChart data={[{ name: '10:00', value: 5 }, { name: '10:05', value: 9 }]} color="#3182CE" height={220} />
```

Sidebar (estructura mínima):
```tsx
<SidebarProvider>
	<Sidebar>
		<SidebarHeader />
		<SidebarContent>
			<SidebarGroup>
				<SidebarGroupLabel>General</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton isActive>Inicio</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
		<SidebarFooter />
	</Sidebar>
	<SidebarInset>{/* Contenido principal */}</SidebarInset>
</SidebarProvider>
```

## Notas finales
Este README evoluciona conforme se documenten los restantes componentes. Mantener coherencia de nombres y tipos para facilitar auto-generación futura de documentación.

## Instalación de dependencias UI

Para instalar (o reinstalar) todas las dependencias de los componentes UI:

```powershell
cd "proyecto/frontend/ui-components"
npm install
```

Paquetes clave incluidos:
- Radix UI (varios @radix-ui/* primitives)
- class-variance-authority (variantes de estilos)
- lucide-react (iconografía)
- embla-carousel-react (carousel)
- react-resizable-panels (layout redimensionable)
- react-day-picker (calendario)
- input-otp (códigos OTP)
- cmdk (command palette)
- sonner (notificaciones alternativas)
- vaul (drawer avanzado)

Si aparece un error de versión en algún paquete Radix, fijar versiones a ^1.0.0 (alineadas entre sí) y volver a ejecutar `npm install`.

## Análisis de bundle y división de chunks

Se configuró `manualChunks` en `vite.config.ts` para separar dependencias grandes:
- vendor-react (react, react-dom, react-router-dom)
- vendor-chakra (Chakra UI + emotion + framer-motion)
- vendor-radix (primitives Radix)
- vendor-query (React Query)
- vendor-charts (Recharts)
- vendor-carousel (Embla)
- vendor-forms (react-hook-form)
- vendor-utils (cva, tailwind-merge, cmdk)

Esto reduce el JS inicial (`index-*.js`).

### Generar reporte visual
```powershell
npm run analyze
```
Abre `dist/stats.html` con desglose de tamaño (gzip/brotli) gracias a rollup-plugin-visualizer.

### Ajustes futuros sugeridos

## Testing (Vitest + Testing Library)

Estrategia actual:
1. Pruebas de smoke/render: validan que la página o componente monta sin errores y muestra headings clave.
2. Pruebas de interacción: simulan eventos del usuario (ej. activar MFA) usando `@testing-library/user-event`.
3. Envoltura común: `renderWithProviders` agrega `ChakraProvider` y `MemoryRouter` para que los componentes funcionen en un entorno similar al runtime.

Ubicación:
`src/__tests__/` contiene archivos `*.test.tsx` y pruebas específicas de interacción (`*.interaction.test.tsx`).

Scripts disponibles:
- `npm test` → modo watch interactivo (si no se pasa `--run`).
- `npm run test:run` → ejecución completa una sola vez.
- `npm run test:coverage` → genera reporte de cobertura (usar luego para identificar áreas críticas: lógica, hooks y componentes reutilizables).

Archivo de configuración:
`vitest.config.ts` establece:
- `environment: jsdom` para simular DOM en Node.
- `setupFiles: ['./src/setupTests.ts']` para cargar extensiones (jest-dom) antes de cada test.
- `globals: true` para usar `describe/it/expect/vi` sin imports manuales (aunque se puede importar explícitamente).

Buenas prácticas adoptadas:
- Evitar aserciones frágiles (no se testean estilos de Chakra directamente, salvo que sean semánticos).
- Uso de roles accesibles (getByRole) cuando es estable (tabs, headings, tablas).
- Comprobaciones asíncronas con `findBy*` tras interacciones que disparan estado.

Próximos pasos sugeridos:
1. Añadir pruebas a hooks (mock de fetch / promesas) cuando se integren llamadas reales.
2. Tests de regresión visual (opcional) con Storybook + play functions.
3. Pipeline CI: ejecutar `npm run test:run` + cobertura mínima (threshold 60–70% inicial) antes de merge a main.
4. Integrar ESLint rule testing-library para mejores prácticas.

Ejemplo de interacción (MFA en Profile): ver `Profile.interaction.test.tsx`.

Generar cobertura:
```powershell
npm run test:coverage
```
Reporte (por defecto en `coverage/`), revisar HTML para detalles.
- Lazy load para páginas raramente usadas (ej. SystemSettings) usando `React.lazy`.
- Configurar prefetch dinámico según rutas críticas.
