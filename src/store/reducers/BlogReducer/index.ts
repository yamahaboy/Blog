import { Reducer } from "redux";
import { IBlogPropsResponseType } from "../../../models/BlopProps";
import { BlogReducerEnum } from "./actionType";

type BlogReducerType = {
    posts: IBlogPropsResponseType[];
}

const defaultState: BlogReducerType = {
    posts: [],
}

const blogReducer: Reducer<BlogReducerType> = (state = defaultState, action) => {
    switch (action.type) {
        case BlogReducerEnum.SET_POSTS:
            return { ...state, posts: action.postsData };
        default:
            return state;
    }
}

export default blogReducer;
