import type { RouteObject } from "react-router-dom";
import Home from "../page/home/home";
import UmkmDetail from "../page/UmkmDetail/UmkmDetail";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/umkm/detail/:id",
    element: <UmkmDetail />,
  },
];

export default routes;
