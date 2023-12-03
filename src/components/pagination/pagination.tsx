import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  getBlogPostsToStoreFromTMS,
  setCurrentPage,
} from "../../store/reducers/BlogReducer/actions";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { postsLimit } from "../../constants/constants";
import { useEffect } from "react";

const PaginationComponent: React.FC = () => {
  const { count, currentPage } = useAppSelector((state) => state.blogReducer);
  const dispatch = useAppDispatch();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setCurrentPage(value));
  };
  useEffect(() => {
    dispatch(getBlogPostsToStoreFromTMS(currentPage));
  }, [dispatch, currentPage]);

  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(count / postsLimit)}
        page={currentPage}
        onChange={handlePageChange}
        shape="rounded"
        variant="outlined"
        sx={{
          '& .MuiPaginationItem-root': {
            borderRadius: "5px", 
            color: '#373737',
            fontSize: '18px', 
          },
          '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: '#318CE7', 
            color: 'white', 
          },
        }}
      />
    </Stack>
  );
};

export default PaginationComponent;
