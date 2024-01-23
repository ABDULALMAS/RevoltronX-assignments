




/* eslint-disable */
import React, { useEffect, useState, useRef} from 'react';
import {
  ThemeProvider,
  createTheme,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Box,
  Button,
  Slide,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';
import { getArticle, getArticlesBySearch, createHighlights, getHighlights , updateScrollPosition} from '../../../actions/Articles';
import './styles.css';
import debounce from 'debounce';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import Notes from './Notes';
import Tooltip from '@mui/material/Tooltip';


interface RootState {
  articles: {
    articles: Record<string, ArticleState>;
    isLoading: boolean;
    post: ArticleState;
  };
}

interface ArticleState {
  _id: string;
  tagId: string;
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
interface SelectionIndices {
  start: number;
  end: number;
}


interface highlightsState{
  highlights: {

    highlights: {
  
        _id: string;
        tagId: string;
        userId: string;
        highlights: string[];
    }[]
  }
}




const Post = () => {
  let theme = createTheme();

  const { post, articles, isLoading } = useSelector((state: RootState) => state.articles);
  const { highlights } = useSelector((state: any) => state.highlights)
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile")!);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string | undefined }>();

    const [scrollPosition, setScrollPosition] = useState(0);
    const [openNotes, setOpenNotes] = useState<boolean>(false)
    const [openNotesRender, setOpenNotesRender] = useState<boolean>(false);
    const articleContainerRef = useRef<HTMLParagraphElement | null>(null);
    const [highlightedContent, setHighlightedContent] = useState<string>(post?.message);

   

  useEffect(() => {
    dispatch<any>(getArticle(id));
  }, [id, dispatch]);

  const highlightsArray = highlights?.highlights || [];

  


  useEffect(() => {
    const fetchData = async () => {
      if (post) {
        await dispatch<any>(getArticlesBySearch({ search: 'none', tags: post?.tags.join(',') }));
        await dispatch<any>(getHighlights(user?.result?._id, post?.tagId));
        
      }
    };
  
    fetchData();
  }, [post, dispatch, user?.result?._id, post?.tagId, post?.tags]);

  
  useEffect(() => {
    

      window.scrollTo({
        top: highlights?.scrollPosition,
        behavior: 'smooth', 
      });
    
  }, [highlights?.scrollPosition]);

const handleScroll = () => {
  setScrollPosition(window.scrollY);
};

const debouncedHandleScroll = debounce(handleScroll, 500); 

useEffect(() => {
  window.addEventListener('scroll', debouncedHandleScroll);


  return () => {
    window.removeEventListener('scroll', debouncedHandleScroll);
  };
}, [post]);

const debouncedSendScrollPosition = debounce(() => {
 
  console.log('Sending scroll position to the backend:', scrollPosition);
  dispatch<any>(updateScrollPosition(scrollPosition, user?.result?._id, post?.tagId))
}, 5000); 


useEffect(() => {
  const intervalId = setInterval(() => {
    debouncedSendScrollPosition();
  }, 5000); 


  return () => {
    clearInterval(intervalId);
  };
}, [scrollPosition, post]);

 





  const highlightMatches = () => {
    const articleContainer = document.getElementById("article-container");

    if (articleContainer) {
      let highlightedContent = post.message;
    
    highlightsArray.forEach((highlight: any) => {
      const regex = new RegExp(highlight, "gi");
      highlightedContent = highlightedContent.replace(regex, (match: any) => `<span style="background-color: yellow;">${match}</span>`);
    });
  
    articleContainer.innerHTML = highlightedContent;
  };
   }

  useEffect(() => {
    highlightMatches();
  }, [highlightsArray]); 

 

  if (!post) return null;

  const openPost = (_id: string) => navigate(`/articles/${_id}`);



  const handleHighlight = async () => {
    console.log("Mouse up event triggered!");
    const selection = window.getSelection();
  
    if (selection) {
      const selectedText = selection.toString();
  
      if (selectedText) {
        console.log("Selected Text:", selectedText);
  
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.backgroundColor = 'yellow';
        range.surroundContents(span);
  
        console.log("Dispatching createHighlights");
        dispatch<any>(createHighlights(selectedText, user?.result?._id, post?.tagId));
      }
    }
  };
  
              
  
          


  
          const handleToggle = () => {
            
            setOpenNotesRender(!openNotesRender)

            if (openNotes) {
              setTimeout(() => {
                setOpenNotes(false);
              }, 800); 
            } else {
             
           
                setOpenNotes(true);
              
            }
          };
      
      
   


  
  





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
      <Tooltip title="Add Note" arrow>
      <Button
      sx={{
        display:"flex",
      }}
        onClick={handleToggle}
        size='small'
        >
          <NotesOutlinedIcon/>
        </Button>
        </Tooltip>

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

          <div id="article-container" onMouseUp={handleHighlight}>
          <Typography gutterBottom variant="body1" component="p"><span dangerouslySetInnerHTML={{ __html: post.message }} onMouseUp={handleHighlight}/></Typography>
          </div>
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
          <img className="media" src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title}  style={{   transition: 'none'  }}/>
        {openNotes &&

        <Notes open={openNotesRender} post={post} highlights={highlights}/>
          } 
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