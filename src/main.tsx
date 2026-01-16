import { StrictMode } from "react";
import './index.css'
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";

const queryclient = new QueryClient()
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryclient} >
 <ConfigProvider theme={{
      token:{
        colorPrimary:'#F65F42',
        colorLink:'F65F42'
      }
    }}>
      <RouterProvider router={router} />
    </ConfigProvider>
    </QueryClientProvider>
   
  </StrictMode>
);
