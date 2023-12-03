import { IBlogPropsResponseType } from "../../../models/BlopProps";

export type GetPostsFromResponseType = {
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

export type GetPostsFromOptionsType = {
  author__course_group?: number;
  limit?: number;
  offset?: number;
  ordering?: string;
  search?: string;
  page?: number;
};
