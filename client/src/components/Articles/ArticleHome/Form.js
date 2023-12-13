import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Dialog } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";

// import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";
import { createArticle , updatePost} from "../../../actions/Articles";

const Form = ({ currentId, setCurrentId, opened , setOpened}) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const post = useSelector((state) =>
  currentId
    ? state.articles.articles.find((message) => message._id === currentId)
    : null
);
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: [], selectedFile: "" });
    // setOpen(false);
    
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createArticle({ ...postData, name: user?.result?.name, creator: user?.result?._id }, navigate));
      setOpened(false)
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      setOpened(false);
      clear();
    }
  };

  console.log(currentId)

//   if (!user?.result?.name) {
//     return (
//       <Paper className={classes.paper}>
//         <Typography variant="h6" align="center">
//           Please Sign In to create your own memories and like other's memories.
//         </Typography>
//       </Paper>
//     );
//   }

  return (
    <Dialog open={opened}>
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Adding"} an Article
        </Typography>

        <TextField
          name="Title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="Message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="Tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
    </Dialog>
  );
};

export default Form;
