import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useStore } from '../providers/store';
import axios from 'axios';

export function Search() {
  const { data, setData } = useStore();
  const [inputSearch, setInputSearch] = React.useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputSearch('');

    const infos = new FormData(event.currentTarget);
    const url = infos.get('email') as string;

    if(url === '') {
      alert('You must enter a valid URL');
      return;
    }

    if (data.listVideos.includes(url)) {
      alert('This video is already in the list');
      return;
    }

    const listVideos = [url, ...data.listVideos];
    setData({ ...data, listVideos, actualVideo: url });
    // localStorage.setItem('data', JSON.stringify({ ...data, listVideos, actualVideo: url }));
    axios.post('http://localhost:8000/history', { url })
  };

  return (
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
  );
}