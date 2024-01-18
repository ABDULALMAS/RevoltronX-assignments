<<<<<<< HEAD
 /* eslint-disable */
=======
// /* eslint-disable */
>>>>>>> role-based-access-control



import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, MenuItem , Box} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createArticle, updatePost } from "../../../actions/Articles";

interface FormProps {}

interface ArticleState {
  

  title: string,
  category: string,
  message: string,
  tags: string[],
  selectedFile: string,
  
}

interface RootState {
  articles: {

    articles: {
      _id: string ;
      category: string;
      selectedFile: string;
      name: string;
      createdAt: string;
      title: string;
      message: string;
      tags: string[];
      likes: string[];
      creator: string;
      comments: string[];
    }[]
  }
}

const Form: React.FC<FormProps> = () => {
  let theme = createTheme();

  const [artId, setArtId] = useState<string | null>(null);
  const { articleId } = useParams<{ articleId: string }>();

  useEffect(() => {
    setArtId(articleId || null);
  }, [articleId]);

  const [postData, setPostData] = useState<ArticleState>({
    title: "",
    category: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile")!) as { result: { name: string; _id: string } };
  const navigate = useNavigate();

  const post = useSelector((state: RootState) =>
    artId ? state.articles.articles.find((message) => message._id === artId) : null
  );

  useEffect(() => {
    if (post) setPostData(post); 
  }, [post]);

  const clear = () => {
    setPostData({
      title: "",
      category: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!artId) {
      dispatch<any>(createArticle({ ...postData, name: user?.result?.name, creator: user?.result?._id }, navigate));
      clear();
<<<<<<< HEAD
=======
      alert("Your article has been submitted to review!")
>>>>>>> role-based-access-control
    } else {
      dispatch<any>(updatePost(artId, { ...postData, name: user?.result?.name }, navigate));
      navigate("/articles");
      clear();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginInline: "auto",
          height: "135vh",
          width: "82%",
          padding: theme.spacing(2),
        }}
        elevation={6}
      >
      <Box 
      
      sx={{
            width: "100%",
            height: "500px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            "& .MuiTextField-root": {
              margin: theme.spacing(1),
            }}}
      >
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          >
        
            
            
          
          <Typography
            sx={{
              textAlign: "center",
              margin: theme.spacing(1),
            }}
            variant="h6"
          >
            {artId ? "Editing" : "Adding"} an Article
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
            value={postData.category}
            onChange={(e) => setPostData({ ...postData, category: e.target.value })}
          >
            <MenuItem value="Tech">Tech</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
            <MenuItem value="Lifestyle">Lifestyle</MenuItem>
          </TextField>

          <Box sx={{marginLeft: "15px"}}>

          <Editor
            apiKey="3v1bthfd37q9m337k14zqchmhh3d5sg6ltconwj4za9hnlu5"
            init={{
              width: 1000,
              height: 500,
              menubar: true,
              toolbar:
                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
            textareaName="Message"
            value={postData.message}
            onEditorChange={(newText) => setPostData({ ...postData, message: newText })}
          />
          </Box>

          <TextField
            style={{ marginTop: "20px" }}
            name="Tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags.join(",")}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
          />
          <div style={{ width: "97%", margin: "10px 0" }}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64}: any) => setPostData({ ...postData, selectedFile: base64})}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginInline: "auto",
            }}
          >
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
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default Form;

