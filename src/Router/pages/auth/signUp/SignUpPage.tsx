import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { routeLocationsEnum } from "../../../Router";
import { activation } from "../../../../api/services/authServices/services";
import { useState } from "react";
import { signUpstyles } from "./styles";
import { buttonContainer, buttonStyles, titleStyles } from "../signIn/styles";

const SingUpPage = () => {
  const { register } = useAuth();
  const navigation = useNavigate();
  const [showSecondStep, setShowSecondStep] = useState<boolean>(false);
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    group: Yup.number().required("Group is required"),
    userId: Yup.string().required("User ID is required"),
    token: Yup.string().required("Token is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      group: 1,
      userId: "",
      token: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        if (!formik.isValid) {
          return;
        }

        const { isSuccess, error } = await register({
          username: values.username,
          password: values.password,
          email: values.email,
          course_group: values.group,
        });

        if (!isSuccess) {
          setFieldError("username", error);
          return;
        }

        formik.setValues({
          ...formik.values,
          userId: "",
          token: "",
        });

        formik.setTouched({
          ...formik.touched,
          userId: false,
          token: false,
        });

        formik.setErrors({
          ...formik.errors,
          userId: "",
          token: "",
        });

        formik.setSubmitting(false);
        formik.setFieldTouched("userId");
        formik.setFieldTouched("token");

        setShowSecondStep(true);
      } catch (error) {
        console.error("Error during registration:", error);
      }
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const handleSignUp = async () => {
    const { isSuccess, error } = await register({
      username: values.username,
      password: values.password,
      email: values.email,
      course_group: values.group,
    });

    if (!isSuccess) {
      formik.setFieldError("username", error);
      return;
    }

    setShowSecondStep(true);
  };
  const handleActivate = async () => {
    try {
      const { isSuccess } = await activation({
        uid: values.userId,
        token: values.token,
      });

      if (isSuccess) {
        navigation(routeLocationsEnum.signIn);
      }
    } catch (error) {
      console.error("Error during activation:", error);
    }
  };

  return (
    <Box sx={signUpstyles}>
      <IconButton
        onClick={() => navigation(routeLocationsEnum.signIn)}
        sx={{ position: "absolute", top: "0", left: "0" }}
      >
        <ArrowBack />
      </IconButton>

      {!showSecondStep ? (
        <form onSubmit={handleSubmit}>
          <Stack sx={{ gap: "10px" }}>
            <Box sx={titleStyles}>Sing Up</Box>
            <TextField
              placeholder="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              helperText={touched.username && errors.username}
              sx={{ width: "35rem", background: "#fff", borderRadius: "5px" }}
            />
            <TextField
              placeholder="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              helperText={touched.password && errors.password}
              sx={{ width: "35rem", background: "#fff", borderRadius: "5px" }}
            />
            <TextField
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              helperText={touched.email && errors.email}
              sx={{ width: "35rem", background: "#fff", borderRadius: "5px" }}
            />
            <TextField
              placeholder="Group"
              type="number"
              name="group"
              value={values.group}
              onChange={handleChange}
              helperText={touched.group && errors.group}
              sx={{ width: "35rem", background: "#fff", borderRadius: "5px" }}
            />
            <Box sx={buttonContainer}>
              <Button sx={buttonStyles} onClick={handleSignUp}>
                Sign Up
              </Button>
            </Box>
          </Stack>
        </form>
      ) : (
        <form>
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <TextField
              placeholder="User ID"
              name="userId"
              value={values.userId}
              onChange={handleChange}
              helperText={touched.userId && errors.userId}
              sx={{ width: "35rem", background: "#fff", borderRadius: "5px" }}
            />
            <TextField
              placeholder="Token"
              name="token"
              value={values.token}
              onChange={handleChange}
              helperText={touched.token && errors.token}
              sx={{ width: "35rem", background: "#fff", borderRadius: "5px" }}
            />
            <Button sx={buttonStyles} onClick={handleActivate}>
              Activate
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default SingUpPage;
