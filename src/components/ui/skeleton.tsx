import { cn } from "@/lib/utils";

// -----------------------------------------------------------------------------
// Skeleton
// -----------------------------------------------------------------------------
// Placeholder animado para indicar carga de contenido. Ajustar tamaño/forma
// vía className.
// -----------------------------------------------------------------------------

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export { Skeleton };
