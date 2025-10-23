import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

const DebugIndex = () => {
  return (
    <main style={{fontFamily:'system-ui,Arial',padding:40}}>
      <h1>DEBUG: Minimal Index</h1>
      <p>If you can see this, React pages render correctly.</p>
      <p>Next step: check original index component for conditional rendering or errors.</p>
    </main>
  );
};

const App = () => {
  // Add debug logging
  console.log('APP-ENTRY-LOG: App component mounted (debug)');
  
  // Global error handler
  window.onerror = function(msg, src, line, col, err) {
    console.error('APP-ONERROR', { msg, src, line, col, err });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<DebugIndex />} />
              <Route path="*" element={<DebugIndex />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
