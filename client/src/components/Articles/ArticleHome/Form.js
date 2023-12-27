/* eslint-disable */
import React, { useState, useEffect } from "react";

import { TextField, Button, Typography, Paper, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { ThemeProvider ,createTheme} from '@mui/material/styles';

// import {
//   advlist, autolink, lists ,link, image, charmap, print, preview, anchor,
//   searchreplace ,visualblocks ,code, fullscreen,
//   insertdatetime ,media ,table, paste,help, wordcount

// }from 'tinymce/plugins'

// import useStyles from "./styles";
import { createArticle , updatePost} from "../../../actions/Articles";

const Form = ({ currentId }) => {
  let theme = createTheme();


  const [artId, setArtId] = useState(0);
  const { articleId } = useParams() ;


  useEffect(() => {
    setArtId(articleId);
  }, [articleId]);
  
  
  const [postData, setPostData] = useState({
    title: "",
    category: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const post = useSelector((state) =>
  artId
    ? state.articles.articles.find((message) => message._id === articleId)
    : null
);


  const dispatch = useDispatch();
  // const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    
    setPostData({ title: "", message: "", tags: [], selectedFile: "" });
    
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (artId === undefined) {
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

 



  return (
   <ThemeProvider theme={theme}>
    <Paper  sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginInline: "auto",
      height: "135vh",
      width: "82%",
      padding: theme.spacing(2),
     
    }}
    elevation={6}>
      <form
        autoComplete="off"
        noValidate
        // className={`${classes.root} ${classes.form}`}
        sx={{
          width: "100%",
          height: "500px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          "& .MuiTextField-root": {
            margin: theme.spacing(1),
          },
        }}
        onSubmit={handleSubmit}
      >
        <Typography sx={{
          textAlign: "center",
          margin: theme.spacing(1),
         
        }}variant="h6">
          {articleId ? "Editing" : "Adding"} an Article
          
        </Typography>

        <TextField
        sx={{
          marginBlock: theme.spacing(2),

        }}
          name="Title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
       <TextField 
           sx={{
            marginBlock: theme.spacing(2),
  
          }}
          select
          
         
         variant="outlined"
         label="Select Category"
         fullWidth
         value={postData.category || "Tech"}
         onChange={(e) => setPostData({ ...postData, category: e.target.value})}
         >
          <MenuItem value="Tech">Tech </MenuItem>
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
          <MenuItem value="Lifestyle">Lifestyle</MenuItem>
          </TextField>
        
        <Editor
   apiKey="3v1bthfd37q9m337k14zqchmhh3d5sg6ltconwj4za9hnlu5"
  
init={{
  width: 1000,
  height: 500,
  menubar: true,
  // plugins: [
  //   'advlist autolink lists link image charmap print preview anchor',
  //   'searchreplace visualblocks code fullscreen',
  //   'insertdatetime media table paste code help wordcount'
  // ],
 
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
        <div style={{
          width: "97%",
              margin: "10px 0",
        }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <div style={{
            display: "flex",
            flexDirection: "column",
            marginInline: "auto",
        }}>

        <Button
        sx={{
          display: "flex",
          height: "45px",
          marginInline: "auto",
          alignContent: "center",
          width: "250px",
          marginBottom: "10px",
        }}
          
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
         sx={{
          display: "flex",
          height: "45px",
          marginInline: "auto",
          
          width: "250px",
          marginBottom: "10px",
        }}
        

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
   
</ThemeProvider>
  );
};

export default Form;

