import { IBlogPropsResponseType } from "../../models/BlopProps"

 export const getPostByIdFromTMS = async (): Promise<IBlogPropsResponseType[]>=> {
        const rawData = await fetch("https://studapi.teachmeskills.by/blog/posts/")
        return await rawData.json()
    }
