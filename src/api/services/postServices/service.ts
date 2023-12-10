import { postsLimit } from "../../../constants/constants";
import { UserReducerEnum } from "../../../store/reducers/userReducer/actionTypes";
import { store } from "../../../store/store";
import { getLocalStorageWithTime } from "../../../utils/addTimeToExpireToStorage";
import { refresh } from "../../../utils/refreshAuthToken";
import {
  CreatePostDataType,
  GetPostsFromOptionsType,
  GetPostsFromResponseType,
} from "./type";

const getQueryParams = (options: any) => {
  if (options === undefined) return "";
  if (
    Object.keys(options).filter((key) => options[key] !== undefined).length ===
    0
  ) {
    return "";
  }
  let queryParamsString: string = "?";
  Object.keys(options).forEach((key, index, arr) => {
    queryParamsString += `${key}=${options[key]}${
      index === arr.length - 1 ? "" : "&"
    }`;
  });
  return queryParamsString;
};

export const getPostByIdFrom = async (postId: number) => {
  const rawData = await fetch(
    `https://studapi.teachmeskills.by/blog/posts/${postId}`
  );

  return await rawData.json();
};

export const getPostsFrom = async (options?: GetPostsFromOptionsType) => {
  let authToken = getLocalStorageWithTime("authToken");
  if (authToken === false) {
    const response = await refresh();
    if (!response) {
      store.dispatch({ type: UserReducerEnum.LOGOUT_BY_REFRESH });
      return false;
    }
  }

  authToken = getLocalStorageWithTime("authToken") as string;

  const rawData = await fetch(
    `https://studapi.teachmeskills.by/blog/posts${getQueryParams({
      ...options,
      limit: postsLimit,
    })}`
  );

  const { count, results }: GetPostsFromResponseType = await rawData.json();
  if (!results) return;

  return { count, results };
};

export const createPostFrom = async (createPostData: CreatePostDataType) => {
  let authToken = getLocalStorageWithTime("authToken");
  if (authToken === false) {
    const response = await refresh();
    if (!response) {
      store.dispatch({ type: UserReducerEnum.LOGOUT_BY_REFRESH });
      return false;
    }
  }

  authToken = getLocalStorageWithTime("authToken");
  const rawData = await fetch(`https://studapi.teachmeskills.by/blog/posts/`, {
    method: "POST",
    body: JSON.stringify(createPostData),
  });
  return await rawData.json();
};

export const generateImage = async () => {
  let authToken = getLocalStorageWithTime("authToken");
  if (authToken === false) {
    const response = await refresh();
    if (!response) {
      store.dispatch({ type: UserReducerEnum.LOGOUT_BY_REFRESH });
      return false;
    }
  }

  authToken = getLocalStorageWithTime("authToken");

  const rawData = await fetch("https://random.imagecdn.app/360/300");
  return await rawData.blob();
};
