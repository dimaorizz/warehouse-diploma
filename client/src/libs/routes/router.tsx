import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../modules/MainLayout";
import Warehouse from "../../modules/Warehouse";
import Providers from "../../modules/Providers/Providers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/warehouse", element: <Warehouse /> },
      { path: "/providers", element: <Providers /> },
    ],
  },
]);
