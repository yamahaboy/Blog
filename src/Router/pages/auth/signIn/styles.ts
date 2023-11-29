type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";


export const signInFormStyles = {
    display: "flex",
    flexDirection: "column"as FlexDirection,
    margin: "10rem auto",
    width: "40rem",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    background: "#318CE7",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
    padding: "5rem",
    borderRadius: "10px",
  }


  export const titleStyles = {
    fontSize: "40px",
    textAlign: "center",
    color: "#fff",
    marginBottom: "20px",
  }


  export const buttonContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  }

  export const buttonStyles = {
    width: "20rem",
    fontSize: "16px",
    marginTop: "20px",
    padding: "0 80px",
    height: "60px",
    background: "#fff",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    color: "#318CE7",
    borderRadius: "30px",
    border: "2px solid trasnparent",
    transition: "0.3s ease-out",
    justifyContent: "center",
    '&:hover': {
      background: '#d0cfcf', 
    },
  }