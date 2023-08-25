import { useEffect, useState } from 'react';

import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper
} from '@mui/material';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStore } from '../providers/store';

export function History() {
  const { data, setData } = useStore();

  return (
    <Box sx={{ mt: 2, width: '100%', padding: '8px', bgcolor: 'background.paper' }}>
      <nav aria-label="secondary mailbox folders">
        <Paper style={{ maxHeight: '80vh', overflow: 'auto' }}>
          <List sx={{ width: '100%' }}>
            {
              data.listVideos.map((video, index) => (
                <ListItem onClick={() => {

                  setData({ ...data, actualVideo: video }); 

                }}
                  disablePadding key={index}
                  secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="bookmark">
                        <BookmarkIcon
                          color={data.bookmarks.includes(video) ? 'primary' : 'inherit'}
                          onClick={
                            () => {
                              if (data.bookmarks.includes(video)) {
                                const newList = data.bookmarks.filter((item) => item !== video);
                                setData({ ...data, bookmarks: newList });
                                localStorage.setItem('bookmarks', JSON.stringify(newList));
                              } else {
                                const newList = [video, ...data.bookmarks];
                                console.log(newList);
                                // setListBookmarks(newList);
                                setData({ ...data, bookmarks: newList });
                                localStorage.setItem('bookmarks', JSON.stringify(newList));
                              }
                            }
                          } />
                      </IconButton>

                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon onClick={() => {
                          const newList = data.listVideos.filter((item) => item !== video);
                          // setListVideos(newList);
                          setData({ ...data, listVideos: newList });
                          localStorage.setItem('videoList', JSON.stringify(newList));
                        }} />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <img
                        style={{ marginRight: '8px' }}
                        width={90}
                        src={
                          `https://img.youtube.com/vi/${video.split('=')[1]}/0.jpg`

                        } />
                    </ListItemAvatar>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                      }}>
                      <ListItemText
                        primary={video}
                        primaryTypographyProps={{ fontSize: '14px' }}
                        sx={{
                          wordBreak: 'break-word',
                          marginRight: 4,
                          mt: 0
                        }} />
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))
            }
          </List>
        </Paper>
      </nav>
    </Box>
  )
}
