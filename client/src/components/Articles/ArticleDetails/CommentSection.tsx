/* eslint-disable */
import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";

import { commentPost } from "../../../actions/Articles";

interface CommentSectionProps {
  post: {
    _id: string;
    comments: string[];
   
  };
}

const CommentSection: React.FC<CommentSectionProps> = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile")!);
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments || []);
  const [comment, setComment] = useState("");
  const commentsRef = useRef<HTMLDivElement>(null);

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch<any>(commentPost(finalComment, post._id));
    setComments(newComments);
    setComment("");

    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            height: "200px",
            overflowY: "auto",
            marginRight: "30px",
          }}
        >
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </Box>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Comment
            </Button>
          </div>
        )}
      </Box>
    </div>
  );
};

export default CommentSection;
