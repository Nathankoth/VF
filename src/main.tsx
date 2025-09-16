import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('VistaForge app starting...');
console.log('Environment:', import.meta.env.MODE);
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Not set');

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Root element not found!');
  throw new Error('Root element not found');
}

createRoot(rootElement).render(<App />);
