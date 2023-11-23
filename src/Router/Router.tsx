import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouterRoutes from "./RouterRoutes";

export enum routeLocationsEnum {
  home = "/",
  post = "/postPage",
}

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <RouterRoutes />
    </BrowserRouter>
  );
};

export default Router;
