import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStore } from '../providers/store';

export function History() {
  const { data, setData } = useStore();

  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      <nav aria-label="secondary mailbox folders">
        <Box style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
          <List
            sx={{ width: '100%' }}
            subheader={data.listVideos.length === 0 ?
              <Typography variant="h6" component="div" style={{ textAlign: 'center', margin: 16 }}>No history</Typography>
              : null
            }
          >
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
                        secondary=''
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
        </Box>
      </nav>
    </Box >
  )
}
