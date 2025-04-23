import routes from "@/router/routes";
import { useRoutes } from "react-router-dom";

function Routes() {
  return useRoutes(routes);
}

export default function App() {
  return <Routes />;
}
