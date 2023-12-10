import { Dispatch } from "react";
import {
  GetPostsFromOptionsType,
  GetPostsFromResponseType,
} from "../../../api/services/postServices/type";
import { AnyAction } from "redux";
import { getPostsFrom } from "../../../api/services/postServices/service";
import { IBlogPropsResponseType } from "../../../models/BlopProps";
import { BlogReducerEnum } from "./actionType";
import { postsLimit } from "../../../constants/constants";
export const getBlogPostsToStoreFromTMS = (
  page: number = 1,
  options?: GetPostsFromOptionsType
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoadingStatusFromTMS(true));

    const dataPosts = await getPostsFrom({
      ...options,
      limit: postsLimit,
      offset: (page - 1) * postsLimit,
    });

    if (!dataPosts) {
      dispatch(setIsLoadingStatusFromTMS(false));
      return;
    }

    const { count, results } = dataPosts as GetPostsFromResponseType;

    if (count === undefined || results === undefined) {
      dispatch(setIsLoadingStatusFromTMS(false));
      return;
    }

    dispatch(setCountOfPosts(count));
    dispatch(setBlogPostsToStoreFromTMS(results));

    dispatch(setIsLoadingStatusFromTMS(false));
  };
};

export const setBlogPostsWithCountToStoreFromTMS = (data: {
  data: IBlogPropsResponseType[];
  totalCount: number;
}) => {
  return {
    type: BlogReducerEnum.SET_BLOG_POSTS_WITH_COUNT_TMS,
    data,
  };
};

export const setBlogPostsToStoreFromTMS = (posts: IBlogPropsResponseType[]) => {
  return {
    type: BlogReducerEnum.SET_BLOG_POSTS_TMS,
    posts,
  };
};

export const setActivePostFromTMS = (
  activePost: IBlogPropsResponseType | null
) => {
  return {
    type: BlogReducerEnum.SET_ACTIVE_POST_TMS,
    activePost,
  };
};
export const setIsLoadingStatusFromTMS = (newStatus: boolean) => {
  return {
    type: BlogReducerEnum.SET_IS_LOADING_STATUS_TMS,
    newStatus,
  };
};
export const setSearchStringToStoreFromTMS = (newSearchString: string) => {
  return {
    type: BlogReducerEnum.SET_SEARCH_STRING_TMS,
    newSearchString,
  };
};

export const setCountOfPosts = (countOfPosts: number) => {
  return {
    type: BlogReducerEnum.SET_COUNT_OF_POSTS,
    countOfPosts,
  };
};

export const setCurrentPage = (page: number) => {
  return {
    type: BlogReducerEnum.SET_CURRENT_PAGE,
    page,
  };
};

export const setSearchStringToStore = (newSearch: string) => {
  return {
    type: BlogReducerEnum.SET_SEARCH,
    newSearch,
  };
};

export const setEditPost = (editPost: IBlogPropsResponseType | null) => {
  return {
    type: BlogReducerEnum.SET_EDIT_POST,
    editPost,
  };
};

export const setAuthors = (authors: string[]) => {
  return {
    type: BlogReducerEnum.SET_AUTHORS,
    authors,
  };
};
