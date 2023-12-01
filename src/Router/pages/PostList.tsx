import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Box, Grid, IconButton } from "@mui/material";
import Card from "../../components/card/Card";
import Header from "../../components/Header/Header";
import { getBlogPostsToStoreFromTMS } from "../../store/reducers/BlogReducer/actions";
import AddIcon from "@mui/icons-material/Add";
import AddPostDialog from "../../components/addPostDialog/addPostDialog";

const PostList: React.FC = () => {
  const { posts } = useAppSelector((state) => state.blogReducer);
  const dispatch = useAppDispatch();
  const [isAddPostDialogOpen, setIsAddPostDialogOpen] =
    useState<boolean>(false);
  const handleChangeDialogIsOpenStatus = (newStatus: boolean) => {
    setIsAddPostDialogOpen(newStatus);
  };

  useEffect(() => {
    dispatch(getBlogPostsToStoreFromTMS());
  }, [dispatch]);

  return (
    <>
      <Header />
      <IconButton
        onClick={() => handleChangeDialogIsOpenStatus(true)}
        sx={{
          marginTop: "1rem",
          marginLeft: "1rem",
          paddingBottom: "0",
          marginBottom: "0",
        }}
      >
        <AddIcon
          sx={{
            fontSize: "30px",
            color: "#fff",
            background: "#318CE7",
            borderRadius: "50%",
            padding: "5px",
          }}
        />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
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
      <AddPostDialog
        open={isAddPostDialogOpen}
        onClose={() => setIsAddPostDialogOpen(false)}
      />
    </>
  );
};

export default PostList;
