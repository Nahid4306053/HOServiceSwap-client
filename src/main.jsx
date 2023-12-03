import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {  RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateDRouter from '../src/Routes/Routes'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const query = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>
      <QueryClientProvider client={query}>
          <RouterProvider router={CreateDRouter}></RouterProvider>
      </QueryClientProvider>
    </React.StrictMode> 

);
