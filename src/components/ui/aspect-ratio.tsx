import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

/**
 * AspectRatio
 * Contenedor que mantiene una relación de aspecto constante (ej. 16/9, 1/1) para imágenes, videos u otros elementos.
 * Útil para reservar espacio antes de que cargue el contenido y evitar layout shift.
 *
 * Uso mínimo:
 * <AspectRatio ratio={16/9}>
 *   <img src="..." className="h-full w-full object-cover" />
 * </AspectRatio>
 */
const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };
