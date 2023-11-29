import { IBlogPropsResponseType } from "../../../models/BlopProps";

export type GetPostsFromTMSResponseType = {
  count?: number;
  next?: string;
  previous?: string;
  results?: IBlogPropsResponseType[];
};

export type CreatePostDataType = {
  image: string;
  text: string;
  lesson_num: number;
  title: string;
  description: string;
};

export type GetPostsFromTMSOptionsType = {
  author__course_group?: number;
  limit?: number;
  offset?: number;
  ordering?: string;
  search?: string;
};