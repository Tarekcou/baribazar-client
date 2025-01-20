import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/Routes.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import { SweetAlertProvider } from "./provider/SweetAlertProvider.jsx";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SweetAlertProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </QueryClientProvider>
    </SweetAlertProvider>
  </StrictMode>
);
