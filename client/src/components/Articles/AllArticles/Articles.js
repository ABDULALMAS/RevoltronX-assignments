import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Article from "../Article/Article";

import useStyles from "./styles";

const Articles = ({ setCurrentId , currentId}) => {
  const { articles, isLoading } = useSelector((state) => state.articles);
  const classes = useStyles();
  // console.log(articles)

  if (!articles?.length && !isLoading) return "No posts";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
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