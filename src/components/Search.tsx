import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useStore } from '../providers/store';

export function Search() {
  const { data, setData } = useStore();
  const [inputSearch, setInputSearch] = React.useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputSearch('');

    const infos = new FormData(event.currentTarget);
    const url = infos.get('email') as string;

    const list = localStorage.getItem('videoList');
    if (list) {
      const newList = [url, ...JSON.parse(list)];
      localStorage.setItem('data', JSON.stringify(newList));
      setData({ ...data, listVideos: newList });
    } else {
      localStorage.setItem('videoList', JSON.stringify([url]));
    }
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