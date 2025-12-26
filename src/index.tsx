import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FilesPage } from "./pages/files/Files.page.tsx";
import { StatusPage } from "./pages/status/Status.page.tsx";

import { HashRouter, Route, Routes } from "react-router";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<StatusPage />} />
          <Route path="/files" element={<FilesPage />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  </StrictMode>
);
