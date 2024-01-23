import React, { useState } from 'react'
import { Paper, Typography, TextField, Button , Box} from '@mui/material'
import "./styles.css";
import { useDispatch } from 'react-redux';
import { createNotes } from '../../../actions/Articles';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';


interface NotesProps {
  open: boolean;
  post: any;
  highlights: any;
}

const Notes: React.FC<NotesProps> = ({open, post, highlights}) => {
 const dispatch = useDispatch();
 const user = JSON.parse(localStorage.getItem("profile")!);

   const [noteData, setNoteData] = useState<any>({
    title: '',
    content: '',
   })




    
    
    const handleNoteAdd =(e: any) => {
    e.preventDefault();
      dispatch<any>(createNotes(noteData, post?.tagId, user?.result?._id ))
      setNoteData({
        title: '',
        content: '',
      })
     
    }

  return (
    <div className={`notes-container ${open ? 'slide-in' : ''}`}>
    <Paper style={{ padding: '20px', borderRadius: '15px', marginTop: '30px', marginInline: '0px', maxWidth: "600px" }} elevation={6}>
    <Typography variant="h5" gutterBottom>
        New Note
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        value={noteData.title} 
        fullWidth
        margin="normal"
        onChange={(e) => setNoteData({ ...noteData, title: e.target.value})}
       
      />
      <TextField
        label="Content"
        variant="outlined"
        value={noteData.content}
        fullWidth
        multiline
        rows={4}
        margin="normal"
        onChange={(e) => setNoteData({ ...noteData, content: e.target.value})}

       />
      <Button variant="contained" color="primary" onClick={handleNoteAdd} disabled={!noteData.title || !noteData.content}>
        Save Note
      </Button>

      <Box>
       <Typography variant='h5' gutterBottom sx={{marginTop: "20px"}}>{highlights?.notes ? "Previous Notes": ""}</Typography>
       {highlights?.notes?.map((note: any) => (

      <Accordion sx={{ marginBottom: '8px', backgroundColor: '#f8f8f8', border: '1px solid #ddd' }} key={note._id}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" sx={{ backgroundColor: '#f0f0f0' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>{note.title} </Typography>
        <Typography variant="caption" color="textSecondary" sx={{ marginLeft: 'auto' }}>
          {moment(note.createdAt).format('DD/MM/YYYY')}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '16px', backgroundColor: '#fff' }}>
        <Typography>{note.content}</Typography>
      </AccordionDetails>
    </Accordion>
       ))

       }
</Box>
        </Paper>
    </div>
  )
}

export default Notes