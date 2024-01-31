/* eslint-disable */
import React, { useEffect , useState} from 'react'
import { useDispatch , useSelector} from 'react-redux'

import { getBookMarks } from '../../actions/BookMarks'
import Article from '../Articles/Article/Article'
import { Grid, Container } from '@mui/material'

interface RootState {
    articles: {
      articles: Record<string, ArticleState>;
      isLoading: boolean;
    };
  }
  
  interface ArticleState {
    _id: string; 
    category: string ;
    selectedFile: string;
       name: string;
       createdAt: string;
       title: string;
       message: string;
       tags: string[];
       likes: string[];
       creator: string;
       comments: string[];
       status: string;
  
  }

const BookMarks: React.FC = () => {
    const dispatch = useDispatch();
    let { articles, isLoading} = useSelector((state: RootState) => state.articles);
    const [currentId, setCurrentId] = useState<any>(null);
    const { bookMarks } = useSelector((state: any) => state.bookMarks)
    console.log(bookMarks)

  let articlesArray = Object.values(articles);

   const bookMarkedArticles =  articlesArray.filter((bookMarkedArticles) => bookMarks?.bookmarks?.includes(bookMarkedArticles._id))
  console.log(bookMarkedArticles)



const user = JSON.parse(localStorage.getItem("profile")!)

useEffect(() => {

    dispatch<any>(getBookMarks(user.result._id))
},[dispatch]);


  return (
    <div>
<Container maxWidth="xl">
       <Grid item xs={12} sm={6} md={9}>
<Grid
      sx={{
        display: "flex",
      }}
      container
      alignItems="stretch"
      spacing={3}
    >
     

{
  bookMarkedArticles.map((post) => (
    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
    <Article post={post} setCurrentId={setCurrentId} currentId={currentId}/>
    </Grid>
  ))
}
</Grid>
</Grid>
</Container>
    </div>
  )
}

export default BookMarks