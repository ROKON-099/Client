import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import router from "./Routes/Routes.jsx";
import Authprovider from "./Provider/Authprovider";

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,               // Disable retries (avoids noisy logs)
      refetchOnWindowFocus: false // Prevent refetch on tab focus
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Authprovider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Authprovider>
  </React.StrictMode>
);
