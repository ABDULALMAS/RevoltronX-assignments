import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Dialog, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

// import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";
import { createArticle , updatePost} from "../../../actions/Articles";

const Form = ({ currentId, setCurrentId, opened , setOpened}) => {
  const { articleId } = useParams();
  
  const [postData, setPostData] = useState({
    title: "",
    category: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const post = useSelector((state) =>
  articleId
    ? state.articles.articles.find((message) => message._id === articleId)
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
    
    // setCurrentId(0);
    setPostData({ title: "", message: "", tags: [], selectedFile: "" });
    // setOpen(false);
    
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (articleId === undefined) {
      dispatch(createArticle({ ...postData, name: user?.result?.name, creator: user?.result?._id }, navigate));

      // setOpened(false)
      clear();
    } else {
      dispatch(
        updatePost(articleId, { ...postData, name: user?.result?.name }, navigate)
        );
        navigate("/articles")
      // setOpened(false);
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
    // <Dialog open={opened}>
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {articleId ? "Editing" : "Adding"} an Article
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
          className={classes.TextField} 
          select
         name='gender'
         variant="outlined"
         label="Select Category"
         fullWidth
         value={postData.category}
         onChange={(e) => setPostData({ ...postData, category: e.target.value})}
         >
          <MenuItem value="Tech">Tech </MenuItem>
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
          <MenuItem value="Lifestyle">Lifestyle</MenuItem>
          </TextField>
        
        <Editor 
     className={classes.Editor}
     
init={{
  width: 1000,
  height: 500,
  menubar: true,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount'
  ],
  toolbar: 'undo redo | formatselect | ' +
  'bold italic backcolor | alignleft aligncenter ' +
  'alignright alignjustify | bullist numlist outdent indent | ' +
  'removeformat | help',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
}}
        textareaName="Message"
        // fullWidth
        // initialValue="write your content here..."
        value={postData.message}
        onEditorChange={(newText) =>
          setPostData({ ...postData, message: newText })
        }
        
        />
       
        <TextField
        style={{marginTop: "20px"}}
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
        <div className={classes.buttons}>

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
          className={classes.buttonClear}

          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
        </div>
      </form>
    </Paper>
    // </Dialog>
  );
};

export default Form;
