/* eslint-disable */
import React, { useState , MouseEvent, TouchEvent} from "react";
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Typography,
  CardContent,
  ButtonBase,
  
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/Articles";
import './styles.css';


import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
// import useStyles from "./styles";


interface PostState {
  post : {

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
  setCurrentId: (id: string) => void;
  // setCurrentId : string;
  currentId: string;
}




const Article: React.FC<PostState> = ({ post, setCurrentId , currentId, }) => {
  // const classes = useStyles()   
  const navigate = useNavigate();
 
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(post?.likes);
  const user = JSON.parse(localStorage.getItem("profile")!);
  const [opened, setOpened] = useState(false);



  const [open, setOpen] = React.useState(false);
  // const anchorRef = React.useRef(null);
  const anchorRef = React.useRef<HTMLButtonElement | null>(null);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
    
  };
      const handleClose = ( event: any) => {
    event.stopPropagation();

    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }

    setOpen(false);
  };
  const handleEdit = (event: any) => {
    event.stopPropagation();
    setCurrentId(post._id)
    setOpened(true);
    navigate(`/articles/edit/${post._id}`)

    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }

    setOpen(false);
  };
  const handleSave = (event: any) => {
    event.stopPropagation();

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }




  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const handleLike = async () => {
    dispatch<any>(likePost( post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    navigate(`/articles/${post._id}`);
  };
  return (
    <>
    <Card 
    sx={{
      marginTop:"10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRadius: "15px",
      height: "100%",
      position: "relative",
    }}
    
    raised elevation={6}>
      <ButtonBase
      sx={{
        display: "block",
        textAlign: "initial",
      }}
        component="span"
      
        onClick={openPost}
      >
        
        <CardMedia

        sx={{
          height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
        }}
          
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        />
          

        
        <div className="overlay">
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className="overlay2">
            



<Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          style={{color: "white"}}
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MoreHorizIcon fontSize="medium" />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
              <ClickAwayListener onClickAway={(event:any) => handleClose(event)}>


                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleEdit}>Edit Article</MenuItem>
                    <MenuItem onClick={handleSave}>Save Article</MenuItem>
                    
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
          </div>
        )}
        <div className="details">
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography

        sx={{
          padding: "0 16px",
        }}
          
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
          <span dangerouslySetInnerHTML={{ __html: post.message.split(" ").splice(0, 20).join(" ") + "..." } as { __html: string }} />
          
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions 
      sx={{
        padding: "0 16px 8px 16px",
        display: "flex",
        justifyContent: "space-between",
      }}
      
      >
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch<any>(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
   
    </>
  );
  
};

export default Article;
