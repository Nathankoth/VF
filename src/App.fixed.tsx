import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  // Add comprehensive error handling
  console.log('APP-ENTRY-LOG: App component mounted');
  
  // Global error handler
  window.onerror = function(msg, src, line, col, err) {
    console.error('APP-ONERROR', { msg, src, line, col, err });
    return false; // Don't prevent default error handling
  };

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    console.error('UNHANDLED-PROMISE-REJECTION', event.reason);
  });

  try {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<div>Login Page</div>} />
                <Route path="/signup" element={<div>Signup Page</div>} />
                <Route path="/dashboard" element={<div>Dashboard Page</div>} />
                <Route path="*" element={<div>Not Found</div>} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error('APP-RENDER-ERROR', error);
    return (
      <div style={{padding: 40, fontFamily: 'system-ui, Arial', background: '#fff', color: '#000'}}>
        <h1>Error Loading App</h1>
        <p>There was an error rendering the application.</p>
        <p>Check the console for more details.</p>
      </div>
    );
  }
};

export default App;
