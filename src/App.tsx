import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import YouTubeIcon from '@mui/icons-material/YouTube';
import HistoryIcon from '@mui/icons-material/History';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/BookmarkBorder';

// import BookmarkIcon from '@mui/icons-material/Bookmark';


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Typography from '@mui/material/Typography';

import ReactPlayer from 'react-player'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        children
      )}
    </Box>
  );
}

export default function App() {
  const [actualVideo, setActualVideo] = React.useState<string>('');
  const [listVideos, setListVideos] = React.useState<string[]>([]);
  const [listBookmarks, setListBookmarks] = React.useState<string[]>([]);
  const [inputSearch, setInputSearch] = React.useState<string>('');

  const [valueTab, setValueTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  React.useEffect(() => {
    const list = localStorage.getItem('videoList');
    if (list) {
      setListVideos(JSON.parse(list));
      setActualVideo(JSON.parse(list)[0]);
    }

    const bookmarks = localStorage.getItem('bookmarks');
    if (bookmarks) {
      setListBookmarks(JSON.parse(bookmarks));
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const url = data.get('email') as string;

    // so insere se não tiver lá
    if (listVideos.includes(url)) {
      alert('Video already added');
      return;
    }

    const newList = [url, ...listVideos,];
    setActualVideo(url);
    setInputSearch('');
    setListVideos(newList);
    localStorage.setItem('videoList', JSON.stringify(newList));
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      <CssBaseline />

      <Grid
        item
        xs={12}
        sm={4}
        order={{ xs: 2, sm: 1 }}
        sx={{
          backgroundColor: '#fff',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs onChange={handleChange} centered>
                <Tab label="History" />
                <Tab label="Bookmarks" />
              </Tabs>
            </Box>
            <CustomTabPanel value={valueTab} index={0}>
              <Box sx={{ mt: 2, width: '100%', padding: '8px', bgcolor: 'background.paper' }}>
                <nav aria-label="secondary mailbox folders">
                  <Paper style={{ maxHeight: '80vh', overflow: 'auto' }}>
                    <List sx={{ width: '100%' }}>
                      {
                        listVideos.map((video, index) => (
                          <ListItem
                            disablePadding key={index}
                            secondaryAction={
                              <>
                                <IconButton edge="end" aria-label="bookmark">
                                  <BookmarkIcon onClick={() => {
                                    const newList = [video, ...listBookmarks];
                                    setListBookmarks(newList);
                                    localStorage.setItem('bookmarks', JSON.stringify(newList));
                                  }} />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete">
                                  <DeleteIcon onClick={() => {
                                    const newList = listVideos.filter((item) => item !== video);
                                    setListVideos(newList);
                                    localStorage.setItem('videoList', JSON.stringify(newList));
                                  }} />
                                </IconButton>
                              </>
                            }
                          >

                            <ListItemButton onClick={() => setActualVideo(video)}>
                              <ListItemAvatar>
                                <img
                                  style={{ marginRight: '8px' }}
                                  width={90}
                                  src={
                                    `https://img.youtube.com/vi/${video.split('=')[1]}/0.jpg`

                                  }></img>
                              </ListItemAvatar>
                              <ListItemText
                                primary={video}
                                secondary={'Added at: ' + new Date().toLocaleDateString()}
                                sx={{ wordBreak: 'break-word', marginRight: 4 }} />
                            </ListItemButton>
                          </ListItem>
                        ))
                      }
                    </List>
                  </Paper>
                </nav>
              </Box>

            </CustomTabPanel>
            <CustomTabPanel value={valueTab} index={1}>

              <Box sx={{ mt: 2, width: '100%', padding: '8px', bgcolor: 'background.paper' }}>
                <nav aria-label="secondary mailbox folders">
                  <Paper style={{ maxHeight: '80vh', overflow: 'auto' }}>
                    <List sx={{ width: '100%' }}>
                      {
                        listBookmarks.map((video, index) => (
                          <ListItem
                            disablePadding key={index}
                            secondaryAction={
                              <>
                                <IconButton edge="end" aria-label="delete">
                                  <DeleteIcon onClick={() => {
                                    const newList = listBookmarks.filter((item) => item !== video);
                                    setListBookmarks(newList);
                                    localStorage.setItem('bookmarks', JSON.stringify(newList));
                                  }} />
                                </IconButton>
                              </>
                            }
                          >

                            <ListItemButton onClick={() => setActualVideo(video)}>
                              <ListItemAvatar>
                                <img
                                  style={{ marginRight: '8px' }}
                                  width={90}
                                  src={
                                    `https://img.youtube.com/vi/${video.split('=')[1]}/0.jpg`

                                  }></img>
                              </ListItemAvatar>
                              <ListItemText
                                primary={video}
                                secondary={'Added at: ' + new Date().toLocaleDateString()}
                                sx={{ wordBreak: 'break-word', marginRight: 4 }} />
                            </ListItemButton>
                          </ListItem>
                        ))
                      }
                    </List>
                  </Paper>
                </nav>
              </Box>

            </CustomTabPanel>
          </Box>
        </Box>
      </Grid >

      <Grid order={{ xs: 1, sm: 2 }} item xs={12} sm={8} component={Paper} square>
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <YouTubeIcon htmlColor='#ff0000' fontSize='large' sx={{ mx: 2 }} />
            <Typography component="h1" variant="h4" fontWeight='bold'>
              Relief VideoApp
            </Typography>
          </Box>

          <Box
            component="form"
            width={'70%'}
            noValidate
            onSubmit={handleSubmit}>

            <TextField
              sx={{ mt: 4 }}
              margin="normal"
              fullWidth
              id="email"
              value={inputSearch}
              onChange={(event) => setInputSearch(event.target.value)}
              label="Youtube video link"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                size='medium'
                variant="contained"
              >
                Add the video
              </Button>
            </Box>
          </Box>

          <Box sx={{
            mt: 2, width: '70%',
            aspectRatio: '16 / 9',
          }}>
            <ReactPlayer
              style={{ cursor: 'pointer', border: '2px solid #000', borderRadius: '5px' }}
              width='100%'
              height='100%'
              loop={true}
              controls={true}
              url={actualVideo} />
          </Box>
        </Box>
      </Grid>
    </Grid >
  );
}