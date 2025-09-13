// -----------------------------------------------------------------------------
// Index.tsx
// Página placeholder inicial (fallback). Puede reemplazarse por un dashboard
// o redirección. Mantiene estilo mínimo con clases utilitarias.
// -----------------------------------------------------------------------------

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Bienvenido a tu App en Blanco</h1>
        <p className="text-xl text-muted-foreground">¡Comienza a construir tu proyecto increíble aquí!</p>
      </div>
    </div>
  );
};

export default Index;
