import { Route, Routes } from "react-router-dom";
import { routeLocationsEnum } from "./Router";
import PostList from "./pages/PostList";
import PostPage from "./pages/PostPage";
import SignInPage from "./pages/auth/signIn/SignInPage";
import SignUpPage from "./pages/auth/signUp/SignUpPage";

const RouterRoutes = () => {
  return (
    <Routes>
      <Route path="">
        <Route path={routeLocationsEnum.home} Component={PostList} />
        <Route
          path={`${routeLocationsEnum.post}/:postId`}
          Component={PostPage}
        />
        <Route path={routeLocationsEnum.signIn} Component={SignInPage} />
        <Route path={routeLocationsEnum.signUp} Component={SignUpPage} />
      </Route>
    </Routes>
  );
};

export default RouterRoutes;
