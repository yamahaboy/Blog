// import React, { BaseSyntheticEvent, useState } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
// } from "@mui/material";
// import {
//   createPostFromTMS,
//   generateImage,
// } from "../../api/services/postServices/service";

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }
// const AddPostDialog: React.FC<Props> = (props) => {
//   const { open, onClose } = props;

//   const [title, setTitle] = useState<string>("");
//   const [text, setText] = useState<string>("");
//   const [image, setImage] = useState<string | null>(null);

//   const handleChangeTitle = (e: BaseSyntheticEvent) => {
//     setTitle(e.target.value);
//   };

//   const handleChangeText = (e: BaseSyntheticEvent) => {
//     setText(e.target.value);
//   };

//   const handleChangeImage = async () => {
//     const newData = await generateImage();
//     setImage(newData ? URL.createObjectURL(newData) : null);
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   const handleDone = () => {
//     if (image === null) return;
//     createPostFromTMS({
//       image,
//       text,
//       title,
//       description: text,
//       lesson_num: 2020,
//     });
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Post form</DialogTitle>
//       <DialogContent>
//         <Box
//           sx={{ width: "150px", height: "150px", background: "#c4c4c4" }}
//           onClick={handleChangeImage}
//         >
//           {image && (
//             <img style={{ width: "100%", height: "100%" }} src={image} />
//           )}
//         </Box>

//         <TextField value={title} onChange={handleChangeTitle} />
//         <TextField value={text} onChange={handleChangeText} />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose}>cancel</Button>
//         <Button onClick={handleDone}>done</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddPostDialog;
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
                sx={{ width: "150px", height: "150px", background: "#c4c4c4" }}
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

              <div>
                <TextField
                  label="Title"
                  variant="outlined"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                />
                <ErrorMessage name="title" component="div" />
              </div>

              <div>
                <TextField
                  label="Text"
                  variant="outlined"
                  name="text"
                  value={values.text}
                  onChange={handleChange}
                />
                <ErrorMessage name="text" component="div" />
              </div>
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
