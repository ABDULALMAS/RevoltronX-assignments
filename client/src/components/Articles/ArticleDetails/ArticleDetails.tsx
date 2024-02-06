
/* eslint-disable */
import React, { useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';
import { getArticle, getArticlesBySearch } from '../../../actions/Articles';
import './styles.css';

interface RootState {
  articles: {
    articles: Record<string, ArticleState>;
    isLoading: boolean;
    post: ArticleState;
  };
}

interface ArticleState {
  _id: string;
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
}

const Post = () => {
  let theme = createTheme();

  const { post, articles, isLoading } = useSelector((state: RootState) => state.articles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string | undefined }>();

  useEffect(() => {
    dispatch<any>(getArticle(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch<any>(getArticlesBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post, dispatch]);

  if (!post) return null;

  const openPost = (_id: string) => navigate(`/articles/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} sx={{
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '39vh',
      }}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  let recommendedPosts = Object.values(articles);

  recommendedPosts = recommendedPosts.filter((article) => article._id !== post._id);


  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ padding: '20px', borderRadius: '15px', marginTop: '30px', marginInline: '30px' }} elevation={6}>
      <Box 
      sx={{
        display: "flex",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
          flexWrap: "wrap",
          flexDirection: "column",
        },
      }}
      >
        <Box
        sx={{
          borderRadius: "20px",
          margin: "10px",
          flex: 1,
        }}
        >
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p"><span dangerouslySetInnerHTML={{ __html: post.message }}/></Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post}/>
          <Divider style={{ margin: '20px 0' }} />
        </Box>
        <Box 
        sx={{
          marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
        }}
        >
          <img className="media" src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </Box>
      </Box>

        {!!recommendedPosts.length && (
          <div className="section">
            <Typography gutterBottom variant="h5">You might also like:</Typography>
            <Divider />
            <Box sx={{
              display: 'flex',
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
              },
            }}>
              {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }: ArticleState) => (
                <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                  <Typography gutterBottom variant="h6">{title}</Typography>
                  <Typography gutterBottom variant="subtitle2">{name}</Typography>
                  <Typography gutterBottom variant="subtitle2">{message}</Typography>
                  <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              ))}
            </Box>
          </div>
        )}
           </Paper>
              </ThemeProvider>
  );
};

export default Post