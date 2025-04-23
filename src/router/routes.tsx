import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Layout = lazy(() => import("@/Layout"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "404", element: <NotFoundPage /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
];

export default routes;
