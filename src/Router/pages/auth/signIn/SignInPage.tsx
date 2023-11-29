import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/store";
import {
  setAccessTokenToStore,
  setUserDataToStore,
} from "../../../../store/reducers/userReducer/actions";
import { routeLocationsEnum } from "../../../Router";
import { login } from "../../../../api/services/authServices/services";
import {
  LoginFailReturnType,
  LoginReturnType,
  LoginSuccessReturnType,
} from "../../../../api/services/authServices/types";
import { setLocalStorageWithTime } from "../../../../utils/addTimeToExpireToStorage";
import { buttonContainer, buttonStyles, signInFormStyles, titleStyles } from "./styles";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("* Email is Required"),
  password: Yup.string().required("* Password is Required"),
});

const isLoginFailure = (
  loginData: LoginReturnType
): loginData is LoginFailReturnType => {
  if ((loginData as LoginFailReturnType)?.detail) {
    return true;
  }
  return false;
};

const SingInPage: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: any, { setFieldError }: any) => {
    const loginReturnData = await login({
      email: values.email,
      password: values.password,
    });

    if (isLoginFailure(loginReturnData)) {
      setFieldError("email", "Invalid credentials");
      return;
    }

    const loginSuccess = loginReturnData as LoginSuccessReturnType;
    setLocalStorageWithTime("refreshToken", loginSuccess.refresh, 30000000);
    setLocalStorageWithTime("authToken", loginSuccess.access, 30000);

    dispatch(
      setUserDataToStore({ email: values.email, password: values.password })
    );
    dispatch(setAccessTokenToStore(loginSuccess.access));
    navigation(routeLocationsEnum.home);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form
        style={signInFormStyles}
      >
        <Stack sx={{ gap: "10px" }}>
          <Box
            sx={titleStyles}
          >
            Sing In
          </Box>
          <Field
            type="text"
            name="email"
            placeholder="Email"
            as={TextField}
            sx={{ width: "35rem", background: "#fff", borderRadius: "5px" }}
          />
          <ErrorMessage name="email">
            {(msg) => <Box style={{ color: "#000" }}>{msg}</Box>}
          </ErrorMessage>

          <Field
            type="password"
            name="password"
            placeholder="Password"
            as={TextField}
            sx={{ width: "35rem", background: "#fff", borderRadius: "5px" }}
          />
          <ErrorMessage name="password">
            {(msg) => <Box style={{ color: "#000" }}>{msg}</Box>}
          </ErrorMessage>
          <Box
            sx={buttonContainer}
          >
            <Button
              type="submit"
              sx={buttonStyles}
            >
              Sign In
            </Button>

            <Button
              onClick={() => navigation(routeLocationsEnum.signUp)}
              sx={buttonStyles}
            >
              Create Account
            </Button>
          </Box>
        </Stack>
      </Form>
    </Formik>
  );
};

export default SingInPage;
