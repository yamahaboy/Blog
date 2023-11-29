import { signUp } from "../api/services/authServices/services";
import { SignUpDataType } from "../api/services/authServices/types";

export type AuthMethodsReturnType = {
  isSuccess: boolean;
  error?: string;
};

const useAuth = () => {
  const register = async (
    data: SignUpDataType
  ): Promise<AuthMethodsReturnType> => {
    const responseData = await signUp(data);

    return {
      isSuccess: !(responseData.id === undefined),
      error: responseData.id === undefined ? "error" : undefined,
    };
  };

  const login = (data: SignUpDataType): AuthMethodsReturnType => {
    return { isSuccess: false, error: "user not found" };
  };
  return { login, register };
};

export default useAuth;
