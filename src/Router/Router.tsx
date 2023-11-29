import { BrowserRouter } from "react-router-dom";
import RouterRoutes from "./RouterRoutes";

export enum routeLocationsEnum {
  home = "/home",
  post = "/postPage",
  signIn = '/',
  signUp = 'sign-up'
}

const Router: React.FC = () => {


  return (
    <BrowserRouter>
      <RouterRoutes />
    </BrowserRouter>
  );
};

export default Router;
