import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import Form from "./Form";
import Pagination from '../Pagination';
import Articles from "../AllArticles/Articles";

import { getArticlesBySearch } from "../../../actions/Articles";

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const ArticleHome = () => {
    const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const [opened, setOpened] = useState(false);
  const query = useQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getArticlesBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/articles/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/articles");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag != tagToDelete));
  };


  const addArticle = () => {
    setOpened(true);
    navigate("/articles/create")
  }

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Articles setCurrentId={setCurrentId} currentId={currentId}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
              <Button
                onClick={addArticle}
                className={classes.addArticleButton}
                color="primary"
                variant="contained"
              >
                ADD ARTICLE
              </Button>
            </AppBar>
{/* <Form currentId={currentId} setCurrentId={setCurrentId} opened={opened} setOpened={setOpened}/> */}
            {!searchQuery && !tags.length && (
              <Paper elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default ArticleHome