// Punto de entrada: monta el componente <App /> en el nodo root
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // Estilos globales

// createRoot habilita la nueva API concurrente de React 18
createRoot(document.getElementById("root")!).render(<App />);
