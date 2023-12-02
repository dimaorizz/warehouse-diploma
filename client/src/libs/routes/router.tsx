import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../modules/MainLayout";
import Warehouse from "../../modules/Warehouse";
import Providers from "../../modules/Providers/Providers";
import Orders from "../../modules/Orders/Orders";
import Auth from "../../modules/Auth/Auth";

export const router = createBrowserRouter([
  { path: "/login", element: <Auth /> },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/warehouse", element: <Warehouse /> },
      { path: "/providers", element: <Providers /> },
      { path: "/orders", element: <Orders /> },
    ],
  },
]);
