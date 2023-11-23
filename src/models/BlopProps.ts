export type IServiceType = {
  results: IBlogPropsResponseType[];
};

export type IBlogPropsResponseType = {
  id: number;
  image: string;
  text: string;
  date: string;
  lesson_num: number;
  title: string;
  description: string;
  author: number;
};
