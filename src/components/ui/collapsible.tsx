import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

// -----------------------------------------------------------------------------
// Collapsible
// -----------------------------------------------------------------------------
// Contenedor que muestra/oculta contenido sin animaciones complejas (Radix).
// Útil para casos simples donde no se requiere la semántica de Accordion.
// -----------------------------------------------------------------------------

const Collapsible = CollapsiblePrimitive.Root;

// Trigger para alternar (abre/cierra)
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

// Contenido que se oculta/muestra
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
