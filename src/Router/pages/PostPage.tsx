import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import Card from "../../components/card/Card";
import { Box } from "@mui/material";
import Header from "../../components/Header/Header";

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { posts } = useAppSelector((state) => state.blogReducer);

  const selectedPost = posts.find((post) => post.id === Number(postId)) ?? null;

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10rem",
        }}
      >
        {selectedPost && <Card post={selectedPost} />}
      </Box>
    </>
  );
};

export default PostPage;
