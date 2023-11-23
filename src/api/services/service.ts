import { IServiceType } from "../../models/BlopProps";

export const getPostByIdFromTMS = async (): Promise<IServiceType> => {
  const rawData = await fetch(
    "https://studapi.teachmeskills.by/blog/posts/?limit=21"
  );
  return await rawData.json();
};
