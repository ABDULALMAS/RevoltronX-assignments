// /* eslint-disable */



import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import { useSelector,shallowEqual } from "react-redux";
import { useParams } from 'react-router-dom';

import Article from "../Article/Article";

interface ArticlesProps {
  setCurrentId: (id: string) => void;
  // setCurrentId: string;
  currentId: string;
 
}

interface RootState {
  articles: {
    articles: Record<string, ArticleState>;
    isLoading: boolean;
  };
}

interface ArticleState {
  _id: string; 
  category: string , 
  selectedFile: string;
     name: string;
     createdAt: string;
     title: string;
     message: string;
     tags: string[];
     likes: string[];
     creator: string;
     comments: string[];

}
  
  
 
 

const Articles: React.FC<ArticlesProps> = ({ setCurrentId, currentId }) => {
  const { selectedCategory } = useParams<{ selectedCategory: string | undefined }>();
  let { articles, isLoading} = useSelector((state: RootState) => state.articles);

 
  
 

  if (!articles?.length && !isLoading) return <div>No posts</div>;

 

 
  let filteredArticles = Object.values(articles);
  

  if (selectedCategory) {
    filteredArticles = filteredArticles.filter((article) => article.category === selectedCategory);
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      sx={{
        display: "flex",
      }}
      container
      alignItems="stretch"
      spacing={3}
    >
      {filteredArticles?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Article post={post} setCurrentId={setCurrentId} currentId={currentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Articles;