import { useStore } from '../providers/store';

import {
  Box,
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

export function Bookmarks() {
  const { data, setData } = useStore();

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
        </Box>
      </nav>
    </Box>
  )
}
