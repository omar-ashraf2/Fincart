import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./router/routes";

const App = () => {
  const element = useRoutes(routes);

  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
};

export default App;
