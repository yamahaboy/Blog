import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  createPostFromTMS,
  generateImage,
} from "../../api/services/postServices/service";

interface Props {
  open: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  text: Yup.string().required("Text is required"),
});

const AddPostDialog: React.FC<Props> = ({ open, onClose }) => {
  const initialValues = {
    title: "",
    text: "",
    image: null,
  };
  const handleDone = (values: any) => {
    if (values.image === null) return;

    const postData = {
      image: values.image,
      text: values.text,
      title: values.title,
      description: values.text,
      lesson_num: 2020,
    };

    createPostFromTMS(postData);
    console.log(createPostFromTMS(postData), "Post");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleDone(values);
        setSubmitting(false);
        onClose();
      }}
    >
      {({ values, setFieldValue, handleChange, isSubmitting }) => (
        <Form>
          <Dialog
            open={open}
            onClose={onClose}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <DialogTitle
              sx={{
                textAlign: "center",
                width: "30rem",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              Post form
            </DialogTitle>
            <DialogContent>
              <Box
                sx={{
                  width: "250px",
                  height: "250px",
                  background: "#c4c4c4",
                  marginBottom: "10px",
                }}
                onClick={async () => {
                  const newData = await generateImage();
                  setFieldValue(
                    "image",
                    newData ? URL.createObjectURL(newData) : null
                  );
                }}
              >
                {values.image && (
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={values.image}
                    alt="Selected"
                  />
                )}
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Box>
                  <TextField
                    label="Title"
                    variant="outlined"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    sx={{ width: "30rem" }}
                  />
                  <ErrorMessage name="title" component="div" />
                </Box>

                <Box>
                  <TextField
                    label="Text"
                    variant="outlined"
                    name="text"
                    value={values.text}
                    onChange={handleChange}
                    sx={{ width: "30rem" }}
                  />
                  <ErrorMessage name="text" component="div" />
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button type="button" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleDone}>
                Done
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default AddPostDialog;
