export const drawerStyles = {
  borderBottom: "1px solid #808080",
  paddingBottom: "5px",
  backgroundColor: "#318CE7",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
};

export const imgStyles = {
  display: "flex",
  margin: "0 auto",
  width: "96px",
  height: "96px",
};

export const listItemStyles = {
  display: "flex",
  margin: "auto",
  gap: "10px",
  width: "90%",
  height: "auto",
  borderRadius: "10px",
  transition: "background-color 0.3s ease",
  "&:hover": {
    border: "2px solid #318CE7",
    backgroundColor: "#fff",
    color: "#318CE7",
    transition: "0.1s ease",
    cursor: "pointer",
  },
};
