import { Box, IconButton } from "@mui/material";
import { IBlogPropsResponseType } from "../../models/BlopProps";
import { Link } from "react-router-dom";
import { routeLocationsEnum } from "../../Router/Router";
import { CardSize, containerInfo, imgstyles, titleStyles } from "./styles";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { setEditPost } from "../../store/reducers/BlogReducer/actions";

interface CardProps {
  post: IBlogPropsResponseType;
}

const Card: React.FC<CardProps> = ({ post }) => {
  const { id, image, title, date, description, author } = post;
  const dispatch = useDispatch();

  const handleOpenEditDialog = () => {
    dispatch(setEditPost(post));
  };
  return (
    <Box key={id} sx={CardSize}>
      <Link
        to={`${routeLocationsEnum.post}/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Box sx={{ objectFit: "cover", borderRadius: "1em", height: "300px" }}>
          <img src={image} style={imgstyles} />
        </Box>
      </Link>
      <Box sx={containerInfo}>
        <Box sx={titleStyles}>{title}</Box>
        <Box>{description}</Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            borderTop: ".5px solid #808080",
          }}
        >
          <Box>
            <Box sx={{ fontWeight: "700" }}>{author}</Box>
            <Box sx={{ fontSize: "1rem", color: "#808080" }}>{date}</Box>
          </Box>
          <IconButton onClick={handleOpenEditDialog}>
            <EditIcon sx={{ color: "#000" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
