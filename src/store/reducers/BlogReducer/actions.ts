import { Dispatch } from "react"
import { IBlogPropsResponseType } from "../../../models/BlopProps"
import { BlogReducerEnum } from "./actionType"
import { AnyAction } from "redux"
import { getPostByIdFromTMS } from "../../../api/services/service"

export const setPosts = (postsData: IBlogPropsResponseType[]) => {
    return { type: BlogReducerEnum.SET_POSTS, postsData}
}

export const getPostsToStore = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        const [dataposts] = await Promise.all([getPostByIdFromTMS()])
        dispatch(setPosts(dataposts))
     }
}