import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../modules/MainLayout";
import Warehouse from "../../modules/Warehouse";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "/warehouse", element: <Warehouse /> }],
  },
]);
