import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar/Navbar";
import Feed from "@/pages/Feed/Feed";
import PromptDetail from "@/pages/PromptDetail/PromptDetail";
import CreatePrompt from "@/pages/CreatePrompt/CreatePrompt";
import Profile from "@/pages/Profile/Profile";
import Login from "@/pages/Login/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/prompt/:id" element={<PromptDetail />} />
          <Route path="/create" element={<CreatePrompt />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
