import { useStore } from '../providers/store';

import {
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import { getVideoId } from '../Utils/Utils';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function Bookmarks() {
  const { data, setData } = useStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/bookmark')
      .then((response) => {
        setData({ ...data, bookmarks: response.data });
        // localStorage.setItem('data', JSON.stringify({ ...data, bookmarks: response.data }));
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ my: 10, width: '100%' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      <nav aria-label="secondary mailbox folders">
        <Box style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
          <List
            sx={{ width: '100%' }}
            subheader={data.bookmarks.length === 0 ?
              <Typography variant="h6" component="div" style={{ textAlign: 'center', margin: 16 }}>No bookmarks</Typography>
              : null
            }
          >

            {
              data.bookmarks.map((video, index) => (
                <ListItem
                  disablePadding key={index}
                  secondaryAction={
                    <>
                      <IconButton
                        onClick={() => {
                          const bookmarks = data.bookmarks.filter((item) => item !== video);
                          setData({ ...data, bookmarks });
                          axios.delete(`http://localhost:8000/bookmark`, {
                            data: {
                              url: video
                            }
                          });
                        }}
                        edge="end"
                        aria-label="delete">
                        <BookmarkIcon
                          color='primary'
                        />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemButton
                    onClick={() => {
                      setData({ ...data, actualVideo: video });
                      // localStorage.setItem('data', JSON.stringify({ ...data, actualVideo: video }));
                    }}
                  >
                    <ListItemAvatar>
                      <img
                        style={{ marginRight: '8px' }}
                        width={90}
                        src={`https://img.youtube.com/vi/${getVideoId(video)}/default.jpg`}
                      ></img>
                    </ListItemAvatar>
                    <ListItemText
                      primary={video}
                      primaryTypographyProps={{ fontSize: '14px' }}
                      sx={{ wordBreak: 'break-word', marginRight: 4 }} />
                  </ListItemButton>
                </ListItem>
              ))
            }
          </List>
        </Box>
      </nav>
    </Box>
  )
}
