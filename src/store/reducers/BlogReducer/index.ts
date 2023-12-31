import { Reducer } from "@reduxjs/toolkit";
import { BlogReducerEnum } from "./actionType";
import { IBlogPropsResponseType } from "../../../models/BlopProps";

type BlogTMSReducerType = {
  posts: IBlogPropsResponseType[];
  isLoading: boolean;
  searchString: string;
  activePost: IBlogPropsResponseType | null;
  currentPage: number;
  count: number;
  newSearch: string;
  editPost: IBlogPropsResponseType | null;
  authors: string[];
};

const defState: BlogTMSReducerType = {
  posts: [],
  isLoading: false,
  searchString: "",
  activePost: null,
  currentPage: 1,
  count: 1,
  newSearch: "",
  editPost: null,
  authors: [],
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
      return { ...state, currentPage: action.page };
    case BlogReducerEnum.SET_COUNT_OF_POSTS:
      return { ...state, count: action.countOfPosts };
    case BlogReducerEnum.SET_SEARCH:
      return { ...state, newSearch: action.newSearch };
    case BlogReducerEnum.SET_EDIT_POST:
      return { ...state, editPost: action.editPost };
    case BlogReducerEnum.SET_AUTHORS:
      return { ...state, authors: action.authors };
    default:
      return { ...state };
  }
};

export default blogTMSReducer;
