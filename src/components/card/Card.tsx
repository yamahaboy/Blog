import { Box } from "@mui/material"
import { IBlogPropsResponseType } from "../../models/BlopProps"

const Card:React.FC<IBlogPropsResponseType> = (props) => {
    const {id, image, title, date, description, author } = props;

    return(
        <Box>
            <Box>
                <Box>
                {date}
                  {title}
                  {description}
                  {author}  
                </Box>
                <Box>
                    {image}
                </Box> 
            </Box>
            <Box>

            </Box>
        </Box>
    )
}

export default Card