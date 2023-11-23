import { Box } from "@mui/material";
import { IBlogPropsResponseType } from "../../models/BlopProps";
import { Link } from "react-router-dom";
import { routeLocationsEnum } from "../../Router/Router";
import { CardSize, containerInfo, imgstyles, titleStyles } from "./styles";

interface CardProps {
  post: IBlogPropsResponseType;
}

const Card: React.FC<CardProps> = ({ post }) => {
  const { id, image, title, date, description, author } = post;

  return (
    <Link
      to={`${routeLocationsEnum.post}/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box key={id} sx={CardSize}>
        <Box sx={{ objectFit: "cover", borderRadius: "1em", height: "300px" }}>
          <img src={image} style={imgstyles} />
        </Box>

        <Box sx={containerInfo}>
          <Box sx={titleStyles}>{title}</Box>
          <Box>{description}</Box>
          <Box sx={{ borderTop: ".5px solid #808080" }}>
            <Box sx={{ fontWeight: "700" }}>{author}</Box>
            <Box sx={{ fontSize: "1rem", color: "#808080" }}>{date}</Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default Card;
