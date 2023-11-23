import { Route, Routes } from "react-router-dom";
import { routeLocationsEnum } from "./Router";
import PostList from "./pages/PostList";
import PostPage from "./pages/PostPage";

const RouterRoutes = () => {
  return (
    <Routes>
      <Route path="">
        <Route path={routeLocationsEnum.home} Component={PostList} />
        <Route
          path={`${routeLocationsEnum.post}/:postId`}
          Component={PostPage}
        />
      </Route>
    </Routes>
  );
};

export default RouterRoutes;
