import { Reducer } from "@reduxjs/toolkit";
import { BlogReducerEnum } from "./actionType";
import { IBlogPropsResponseType } from "../../../models/BlopProps";

type BlogTMSReducerType = {
  posts: IBlogPropsResponseType[];
  isLoading: boolean;
  searchString: string;
  activePost: IBlogPropsResponseType | null;
  currentPage: number;
};

const defState: BlogTMSReducerType = {
  posts: [],
  isLoading: false,
  searchString: "",
  activePost: null,
  currentPage: 1,
};

const blogTMSReducer: Reducer<BlogTMSReducerType> = (
  state = defState,
  action
) => {
  switch (action.type) {
    case BlogReducerEnum.SET_BLOG_POSTS_TMS:
      return { ...state, posts: action.posts };
    case BlogReducerEnum.SET_SELECTED_BLOG_USER_ID_TMS:
      return { ...state, selectedUserId: action.selectedUserId };
    case BlogReducerEnum.SET_COMMENTS_MODAL_STATUS_TMS:
      return { ...state, commentsModalStatus: action.newStatus };
    case BlogReducerEnum.SET_IS_LOADING_STATUS_TMS:
      return { ...state, isLoading: action.newStatus };
    case BlogReducerEnum.SET_SEARCH_STRING_TMS:
      return { ...state, searchString: action.newSearchString };
    case BlogReducerEnum.SET_COMMENTS_TMS:
      return { ...state, comments: action.comments };
    case BlogReducerEnum.SET_ACTIVE_POST_TMS:
      return { ...state, activePost: action.activePost };
    case BlogReducerEnum.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    default:
      return { ...state };
  }
};

export default blogTMSReducer;
