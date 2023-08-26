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
                <ListItem
                  disablePadding key={index}
                  secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="bookmark">
                        <BookmarkIcon
                          color={data.bookmarks.includes(video) ? 'primary' : 'inherit'}
                          onClick={
                            () => {
                              if (data.bookmarks.includes(video)) {
                                const bookmarks = data.bookmarks.filter((item) => item !== video);
                                setData({ ...data, bookmarks });
                                localStorage.setItem('data', JSON.stringify({ ...data, bookmarks }));
                              } else {
                                const newList = [video, ...data.bookmarks];
                                setData({ ...data, bookmarks: newList });
                                localStorage.setItem('data', JSON.stringify({ ...data, bookmarks: newList }));
                              }
                            }
                          } />
                      </IconButton>

                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon onClick={() => {
                          const listVideos = data.listVideos.filter((item) => item !== video);
                          const bookmarks = data.bookmarks.filter((item) => item !== video);
                          setData({ ...data, listVideos, bookmarks });
                          localStorage.setItem('data', JSON.stringify({ ...data, listVideos, bookmarks }));
                        }} />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemButton
                    onClick={() => {
                      setData({ ...data, actualVideo: video });
                      localStorage.setItem('data', JSON.stringify({ ...data, actualVideo: video }));
                    }}>
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
    </Box >
  )
}
