import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// -----------------------------------------------------------------------------
// Label
// -----------------------------------------------------------------------------
// Etiqueta semántica asociada a controles de formulario. Basada en Radix Label.
// Incluye variantes (extensibles) definidas con cva para consistencia tipográfica.
// -----------------------------------------------------------------------------

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

/**
 * Label
 * Conecta visual y semánticamente con el control usando htmlFor.
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
