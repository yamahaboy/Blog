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
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              sx={{ width: "35rem", background: "#fff", borderRadius: "5px" }}
            />
            <TextField
              placeholder="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ width: "35rem", background: "#fff", borderRadius: "5px" }}
            />
            <TextField
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ width: "35rem", background: "#fff", borderRadius: "5px" }}
            />
            <TextField
              placeholder="Group"
              type="number"
              name="group"
              value={values.group}
              onChange={handleChange}
              error={touched.group && Boolean(errors.group)}
              helperText={touched.group && errors.group}
              sx={{ width: "35rem", background: "#fff", borderRadius: "5px" }}
            />
            <Box sx={buttonContainer}>
              <Button type="submit" sx={buttonStyles} onClick={handleSignUp}>
                Sign Up
              </Button>
            </Box>
          </Stack>
        </form>
      ) : (
        <form onSubmit={handleActivate}>
          <Stack>
            <TextField
              label="User ID"
              name="userId"
              value={values.userId}
              onChange={handleChange}
              error={touched.userId && Boolean(errors.userId)}
              helperText={touched.userId && errors.userId}
              sx={{ width: "35rem", background: "#fff", borderRadius: "5px" }}
            />
            <TextField
              label="Token"
              name="token"
              value={values.token}
              onChange={handleChange}
              error={touched.token && Boolean(errors.token)}
              helperText={touched.token && errors.token}
              sx={{ width: "35rem", background: "#fff", borderRadius: "5px" }}
            />
            <Button type="submit" sx={buttonStyles}>
              Activate
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default SingUpPage;

// import { useNavigate } from "react-router-dom";
// import useAuth from "../../../../hooks/useAuth";
// import { BaseSyntheticEvent, useReducer, useState } from "react";
// import { activation } from "../../../../api/services/authServices/services";
// import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
// import { ArrowBack } from "@mui/icons-material";
// import { routeLocationsEnum } from "../../../Router";

// const SingUpPage = () => {
//   const { register } = useAuth();
//   const navigation = useNavigate();
//   const [loginValue, setLoginValue] = useState<string>("");
//   const [passwordValue, setPasswordValue] = useState<string>("");
//   const [emailValue, setEmailValue] = useState<string>("");
//   const [userId, onChangeUserId] = useReducer(
//     (_: string, event: BaseSyntheticEvent) => event.target.value,
//     ""
//   );
//   const [token, onChangeToken] = useReducer(
//     (_: string, event: BaseSyntheticEvent) => event.target.value,
//     ""
//   );
//   const [loginError, setLoginError] = useState<string | undefined>(undefined);
//   const [groupValue, setGroupValue] = useState<number>(1);
//   const [showSecondStep, setShowSecondStep] = useState<boolean>(false);

//   const handlePasswordValueChange = (e: BaseSyntheticEvent) => {
//     setPasswordValue(e.target.value);
//   };
//   const handleLoginValueChange = (e: BaseSyntheticEvent) => {
//     setLoginValue(e.target.value);
//   };
//   const handleEmailValueChange = (e: BaseSyntheticEvent) => {
//     setEmailValue(e.target.value);
//   };
//   const handleGroupValueChange = (e: BaseSyntheticEvent) => {
//     setGroupValue(e.target.value);
//   };

// const handleSignUp = async () => {
//   const { isSuccess, error } = await register({
//     username: loginValue,
//     password: passwordValue,
//     email: emailValue,
//     course_group: groupValue,
//   });

//   if (!isSuccess) {
//     setLoginError(error);
//     return;
//   }

//   setShowSecondStep(true);
// };

// const handleActivate = async () => {
//   const { isSuccess } = await activation({ uid: userId, token });

//   if (isSuccess) {
//     navigation(routeLocationsEnum.signIn);
//   }
// };

//   return (
//     <Box>
//       <IconButton onClick={() => navigation(routeLocationsEnum.signIn)}>
//         <ArrowBack />
//       </IconButton>

//       {!showSecondStep ? (
//         <Stack sx={{ gap: "5px" }}>
//           <TextField
//             label="username"
//             placeholder="username"
//             value={loginValue}
//             onChange={handleLoginValueChange}
//           />
//           <TextField
//             label="password"
//             placeholder="password"
//             value={passwordValue}
//             onChange={handlePasswordValueChange}
//           />
//           <TextField
//             label="email"
//             placeholder="email"
//             value={emailValue}
//             onChange={handleEmailValueChange}
//           />
//           <TextField
//             label="group"
//             placeholder="group"
//             type="number"
//             value={groupValue}
//             onChange={handleGroupValueChange}
//           />
//           {loginError && <div style={{ color: "#f00" }}>{loginError}</div>}
//           <Button onClick={handleSignUp}>sign up</Button>
//         </Stack>
//       ) : (
//         <Stack>
//           <TextField
//             label="user id"
//             placeholder="user id"
//             value={userId}
//             onChange={onChangeUserId}
//           />
//           <TextField
//             label="token"
//             placeholder="token"
//             value={token}
//             onChange={onChangeToken}
//           />
//           <Button onClick={handleActivate}>activate</Button>
//         </Stack>
//       )}
//     </Box>
//   );
// };

// export default SingUpPage;
