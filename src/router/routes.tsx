import { lazy } from "react";

const Layout = lazy(() => import("../Layout"));
const HomePage = lazy(() => import("../pages/HomePage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage.tsx"));

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
