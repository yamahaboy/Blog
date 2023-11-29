import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getPostsToStore } from "../../store/reducers/blogReducer/actions";
import { Box, Grid } from "@mui/material";
import Card from "../../components/card/Card";
import Header from "../../components/Header/Header";

const PostList: React.FC = () => {
  const { posts } = useAppSelector((state) => state.blogReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPostsToStore());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5rem",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ marginTop: "2rem", padding: "0", marginLeft: "5rem" }}
        >
          {posts &&
            posts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={3} lg={4}>
                <Card post={post} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default PostList;
