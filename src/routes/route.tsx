import type { RouteObject } from "react-router-dom";
import Home from "../page/home/home";
import HomeV2 from "../page/home/HomeV2";
import UmkmDetail from "../page/UmkmDetail/UmkmDetail";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomeV2 />,
  },
  {
    path: "/home",
    element: <HomeV2 />,
  },
  {
    path: "/home-old",
    element: <Home />,
  },
  {
    path: "/umkm/detail/:id",
    element: <UmkmDetail />,
  },
];

export default routes;
