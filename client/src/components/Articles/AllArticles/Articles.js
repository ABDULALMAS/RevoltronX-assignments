/* eslint-disable */
import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import Article from "../Article/Article";

// import Styles from "./styles";

const Articles = ({ setCurrentId , currentId}) => {
  const {selectedCategory} = useParams();
  let { articles, isLoading } = useSelector((state) => state.articles);
  // const classes = useStyles();
  // console.log(articles)

  if (!articles?.length && !isLoading) return "No posts";


  if(selectedCategory) {
    articles =  articles.filter((article) => article.category === selectedCategory)
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
    sx={{
      display: "flex",
    }}
      // className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {articles?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Article post={post} setCurrentId={setCurrentId} currentId={currentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Articles;