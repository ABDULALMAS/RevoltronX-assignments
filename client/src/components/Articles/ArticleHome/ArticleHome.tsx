/* eslint-disable */
import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  
} from "@mui/material";
import { useDispatch } from "react-redux";
import { ThemeProvider ,createTheme} from '@mui/material/styles';


import { useNavigate, useLocation } from "react-router-dom";
import { MuiChipsInput } from 'mui-chips-input'


import Pagination from '../Pagination.tsx';
import Articles from "../AllArticles/Articles";

import { getArticlesBySearch } from "../../../actions/Articles";

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const ArticleHome = () => {
  let theme = createTheme();

    
  const [currentId, setCurrentId] = useState<any>(null);
 
 
  const query = useQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch<any>(getArticlesBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/articles/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/articles");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag: any) => {
    setTags(tag)
  };
     

  const addArticle = () => {
    navigate("/articles/create")
  }



  return (
    <ThemeProvider theme={theme}>
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          sx={{
            [theme.breakpoints.down("xs")]: {
              flexDirection: "column-reverse",
            },
          }}
          container
          
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Articles setCurrentId={setCurrentId} currentId={currentId}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
             sx={{
              marginTop: "1rem",
              marginRight: "100px",
              borderRadius: 4,
              marginBottom: "1rem",
              display: "flex",
              padding: "16px",
             }}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Articles"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <MuiChipsInput
                style={{ margin: "10px 0" }}
                value={tags}
                onChange={handleAdd}
               
                
                label="Search Tags"
                variant="outlined"
              />
              <Button
              sx={{  marginBottom: "10px"}}
                onClick={searchPost}
                
                color="primary"
                variant="contained"
              >
                Search
              </Button>
              <Button
                onClick={addArticle}
                
                color="primary"
                variant="contained"
              >
                ADD ARTICLE
              </Button>
            </AppBar>
            {!searchQuery && !tags.length && (
              <Paper elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
    </ThemeProvider>
  )
}

export default ArticleHome