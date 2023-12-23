import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBarSearch: {
    marginTop: "1rem",
    marginRight: "100px",
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
  addArticleButton: {
    marginTop: "10px",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    marginInline: "auto",
    height: "130vh",
    width: "82%",
    padding: theme.spacing(2),
  },
  form: {
    width: "100%",
    height: "500px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    display: "flex",
    height: "45px",
    
    width: "250px",
    marginBottom: 10,
  },
  buttonClear: {
    // display: "inline-block",
    width: "250px",
    height: "45px",
    marginBottom: 10,
  },
  buttons: {
    display: "flex",
    flexDirection: "column"
  },
  Editor : {
    marginBottom: "20px",
  }
 
}));