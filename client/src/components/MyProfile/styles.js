import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
 container: {
    margin: "10px",
    display: "flex",
  width: "300px",
  height: "50px",
  justifyContent: "center",
  alignItems: "center",
 },
 "& .MuiTextField-root": {
    margin: theme.spacing(1),
  },

paper: {
    display: "flex",
  padding: theme.spacing(2),
},
form: {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
},
fileInput: {
  width: "97%",
  margin: "10px 0",
},
buttonSubmit: {
  marginBottom: 10,
},
TextField: {
    marginBottom: "10px"
},
photoSubmit: {
    margin: "10px",
    width: "50px",
    height: "20px"
}
}));