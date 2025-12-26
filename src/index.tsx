import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, RouterProvider } from "./components/Router.tsx";
import { FilesPage } from "./pages/files/Files.page.tsx";
import { StatusPage } from "./pages/status/Status.page.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider>
        <Route route="files">
          <FilesPage />
        </Route>
        <Route route="status">
          <StatusPage />
        </Route>
      </RouterProvider>
    </QueryClientProvider>
  </StrictMode>
);
