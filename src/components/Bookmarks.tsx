import { useStore } from '../providers/store';

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

// import DeleteIcon from '@mui/icons-material/Delete';
//bookmark icon
import BookmarkIcon from '@mui/icons-material/Bookmark';

export function Bookmarks() {
  const { data, setData } = useStore();

  return (
    <Box sx={{ mt: 2, width: '100%', padding: '8px', bgcolor: 'background.paper' }}>
      <nav aria-label="secondary mailbox folders">
        <Paper style={{ maxHeight: '80vh', overflow: 'auto' }}>
          <List sx={{ width: '100%' }}>
            {
              data.bookmarks.map((video, index) => (
                <ListItem
                  disablePadding key={index}
                  secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="delete">
                        <BookmarkIcon
                          color='primary'
                          onClick={() => {
                            const bookmarks = data.bookmarks.filter((item) => item !== video);
                            setData({ ...data, bookmarks });
                          }} />
                      </IconButton>
                    </>
                  }
                >
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
