/* eslint-disable */



import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Button,
  Paper,
  Typography,
  Container,
  TextField,
  Dialog,
  MenuItem,
} from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProfile, updateProfile } from '../../actions/profile';


interface RootState {
  profiles: ProfileData[];
}

interface ProfileData {
  userId?: string;
  _id?: number;
  photo?: string;
  name?: string;
  email?: string;
  age?: string;
  gender?: string;
  DOB?: string;
  phoneNumber?: string;
}

interface User {
  result: {
    _id: string;
  };
}

interface FormProps {
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  currentId: number | undefined;
  setCurrentId: React.Dispatch<React.SetStateAction<number | undefined>>;
  upload: boolean;
  setUpload: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: React.FC<FormProps> = ({
  edit,
  setEdit,
  currentId,
  setCurrentId,
  upload,
  setUpload,
}) => {
  const theme = createTheme();

  const user = JSON.parse(localStorage.getItem('profile')!) as User;

  const post = useSelector((state: RootState) =>
    currentId ? state.profiles.find((message) => message._id === currentId) : null
  );

  useEffect(() => {
    if (post) setProfileData(post);
  }, [post]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<ProfileData>({
    photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AColor-white.JPG&psig=AOvVaw3DKsT7y3-RNlpQ2MSMANuI&ust=1704276150089000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMj11Ma5voMDFQAAAAAdAAAAABAX",
    name: '',
    email: '',
    age: '',
    gender: '',
    DOB: '',
    phoneNumber: '',
  });

  const setProfileDataField = (field: string, value: string) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value === '' ? undefined : value,
    }));
  };

  const clear = () => {
    setCurrentId(0);
    setProfileData({
      photo: '',
      name: '',
      email: '',
      age: '',
      gender: '',
      DOB: '',
      phoneNumber: '',
    });
    setEdit(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch<any>(
        createProfile({ ...profileData, userId: user?.result?._id }, navigate)
      );
      setEdit(false);
      setUpload(false);
    } else {
      dispatch<any>(updateProfile(currentId, { ...profileData }, navigate));
      setEdit(false);
      setUpload(false);
      clear();
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Dialog open={edit}>
          <Paper
            sx={{
              display: 'flex',
              padding: theme.spacing(2),
            }}
          >
            <form
              autoComplete='off'
              noValidate
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                margin: theme.spacing(1),
              }}
              onSubmit={handleSubmit}
            >
              <Typography variant='h6' sx={{ margin: theme.spacing(1) }}>
                Editing Profile
              </Typography>

              <TextField
                sx={{ marginBottom: '10px' }}
                name='name'
                variant='outlined'
                label='Your Name'
                fullWidth
                value={profileData.name}
                onChange={(e) => setProfileDataField('name', e.target.value)}
              />
              <TextField
                sx={{ marginBottom: '10px' }}
                name='email'
                variant='outlined'
                label='Your Email'
                fullWidth
                value={profileData.email}
                onChange={(e) => setProfileDataField('email', e.target.value)}
              />

              <TextField
                sx={{ marginBottom: '10px' }}
                name='age'
                variant='outlined'
                label='Your Age'
                fullWidth
                value={profileData.age}
                onChange={(e) => setProfileDataField('age', e.target.value)}
              />
              <TextField
                sx={{ marginBottom: '10px' }}
                select
                name='gender'
                variant='outlined'
                label='Your Gender'
                fullWidth
                value={profileData.gender}
                onChange={(e) => setProfileDataField('gender', e.target.value)}
              >
                <MenuItem value='male'>Male </MenuItem>
                <MenuItem value='female'>Female</MenuItem>
              </TextField>

              <TextField
                type='date'
                sx={{ marginBottom: '10px' }}
                name='DOB'
                variant='outlined'
                label='Date Of Birth'
                fullWidth
                value={profileData.DOB}
                onChange={(e) => setProfileDataField('DOB', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                sx={{ marginBottom: '10px' }}
                name='phoneNumber'
                variant='outlined'
                label='Phone Number'
                fullWidth
                value={profileData.phoneNumber}
                onChange={(e) =>
                  setProfileDataField('phoneNumber', e.target.value)
                }
              />

              <Button
                sx={{
                  marginBottom: '10px',
                }}
                variant='contained'
                color='primary'
                size='large'
                type='submit'
                fullWidth
              >
                Submit
              </Button>
              <Button
                sx={{
                  height: '40px',
                }}
                variant='contained'
                color='secondary'
                size='small'
                onClick={clear}
                fullWidth
              >
                Clear
              </Button>
            </form>
          </Paper>
        </Dialog>

        <Dialog open={upload}>
          <Container
            sx={{
              margin: '10px',
              display: 'flex',
              width: '300px',
              height: '50px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Paper className='paper'>
              <form autoComplete='off' noValidate onSubmit={handleSubmit}>
                <FileBase
                  type='file'
                  multiple={false}
                  onDone={({ base64 }: any) =>
                    setProfileData({ ...profileData, photo: base64 })
                  }
                />
                <Button
                  sx={{
                    margin: '10px',
                    width: '50px',
                    height: '20px',
                  }}
                  variant='contained'
                  color='primary'
                  size='large'
                  type='submit'
                >
                  Submit
                </Button>
              </form>
            </Paper>
          </Container>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default Form;