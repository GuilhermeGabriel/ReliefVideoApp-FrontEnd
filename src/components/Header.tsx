import { Box, Typography } from '@mui/material';
import Play from '@mui/icons-material/PlayCircle';

export function Header() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    <Play htmlColor='#1976d2' fontSize='large' sx={{ mx: 2 }} />
    <Typography component="h1" variant="h4" fontWeight='bold'>
      Relief VideoApp
    </Typography>
  </Box>
  )
}