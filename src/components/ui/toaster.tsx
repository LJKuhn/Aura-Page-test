import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

// -----------------------------------------------------------------------------
// Toaster
// -----------------------------------------------------------------------------
// Contenedor que materializa (renderiza) todos los toasts acumulados en el
// estado gestionado por el hook `useToast`. Debe montarse una sola vez (por
// ejemplo en el layout raíz de la aplicación) para que cualquier parte del
// árbol pueda disparar notificaciones.
// -----------------------------------------------------------------------------

/**
 * Toaster
 * Recorre la colección `toasts` y crea una instancia visual por cada elemento.
 * Cada toast puede incluir: título, descripción, acción y botón de cierre.
 */
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

// Ejemplo:
// Colocar <Toaster /> una sola vez (por ejemplo en App.tsx) y luego:
// const { toast } = useToast();
// toast({ title: 'Operación exitosa', description: 'Se guardaron los cambios' });
