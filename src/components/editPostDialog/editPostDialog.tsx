import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useAppSelector } from "../../store/store";
import { useDispatch } from "react-redux";
import { AddPostFormValueType, EditPostFormValueType } from "./types";
import { createPostFrom } from "../../api/services/postServices/service";
import { useFormik } from "formik";
import { editPostValidationSchema } from "./validationSchema";
import { setEditPost } from "../../store/reducers/BlogReducer/actions";
import ImageSelector from "../ImageSelector/ImageSelector";

const EditPostDialog: React.FC = () => {
  const { editPost, authors } = useAppSelector((state) => state.blogReducer);
  const dispatch = useDispatch();
  const [isError, setIsError] = useState<string | null>(null);

  const initialFormikValues: EditPostFormValueType = {
    title: "",
    description: "",
    image: "",
    date: "",
    author: "",
  };

  const handleSubmit = async (formikValues: AddPostFormValueType) => {
    if (formikValues.image === null) return;
    const { isSuccess } = await createPostFrom({
      image: formikValues.image,
      text: formikValues.description,
      title: formikValues.title,
      description: formikValues.description,
      lesson_num: 2020,
    });
    if (!isSuccess) {
      setIsError("server error");
      return;
    }
    handleClose();
  };

  const formik = useFormik({
    initialValues: initialFormikValues,
    validationSchema: editPostValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleImageChange = (newValue: string | null) => {
    formik.setFieldValue("image", newValue);
    formik.setTouched({ ...formik.touched, image: true });
    formik.setErrors({ ...formik.errors });
  };

  const handleClose = () => {
    formik.resetForm();
    dispatch(setEditPost(null));
  };

  const handleDone = () => {
    formik.submitForm();
  };
  const handleAuthorAutocompleteChange = (
    e: BaseSyntheticEvent,
    value: string | null
  ) => {
    formik.setFieldValue("author", value);
  };

  useEffect(() => {
    console.log(formik.errors, formik.touched);
  }, [formik.errors, formik.touched]);

  useEffect(() => {
    if (editPost === null) return;

    const { title, description, image, date, author } = editPost;

    formik.setFieldValue("title", title);
    formik.setFieldValue("text", description);
    formik.setFieldValue("image", image);
    formik.setFieldValue("date", date);
    formik.setFieldValue("author", author);
    formik.setTouched({ ...formik.touched, title: true });
    formik.setTouched({ ...formik.touched, description: true });
    formik.setTouched({ ...formik.touched, image: true });
    formik.setTouched({ ...formik.touched, date: true });
    formik.setTouched({ ...formik.touched, author: true });
  }, [editPost]);

  return (
    <Dialog open={!!editPost} onClose={handleClose}>
      <DialogTitle>Edit Post {editPost && editPost.title}</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <ImageSelector
            value={formik.values.image}
            onChange={handleImageChange}
          />
          <TextField
            label="title"
            name="title"
            value={formik.values.title}
            error={!!formik.errors.title}
            helperText={formik.errors.title}
            onChange={formik.handleChange}
          />
          <TextField
            label="description"
            name="description"
            value={formik.values.description}
            error={!!formik.errors.description}
            helperText={formik.errors.description}
            onChange={formik.handleChange}
          />
          <TextField
            label="date"
            name="date"
            value={formik.values.date}
            error={!!formik.errors.date}
            helperText={formik.errors.date}
            onChange={formik.handleChange}
          />
          <Autocomplete
            id="author"
            value={formik.values.author}
            renderInput={(params) => (
              <TextField
                {...params}
                label="author"
                error={!!formik.errors.author}
                helperText={formik.errors.author}
              />
            )}
            onChange={handleAuthorAutocompleteChange}
            options={authors}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Stack>
          {isError !== null && isError}
          <Box>
            <Button onClick={handleClose}>cancel</Button>
            <Button
              disabled={
                !!Object.values(formik.values).filter((value) => !value)
                  .length || !!Object.keys(formik.errors).length
              }
              onClick={handleDone}
            >
              done
            </Button>
          </Box>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostDialog;
