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

import DeleteIcon from '@mui/icons-material/Delete';

export function Bookmarks() {
  const [listBookmarks, setListBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const list = localStorage.getItem('bookmarks');
    if (list) {
      setListBookmarks(JSON.parse(list));
    }
  }, []);

  return (
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
                  {/* onClick={() => setActualVideo(video)} */}
                  <ListItemButton >
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
                      primaryTypographyProps={{ fontSize: '14px' }}
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
  )
}
