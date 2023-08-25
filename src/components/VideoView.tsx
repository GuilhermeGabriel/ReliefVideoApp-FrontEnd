import { Box } from '@mui/material';
import ReactPlayer from 'react-player';

import { useStore } from '../providers/store';

export function VideoView() {
  const { data } = useStore();

  return (
    <Box sx={{
      mt: 2, width: '70%',
      aspectRatio: '16 / 9',
    }}>
      <ReactPlayer
        style={{ cursor: 'pointer', border: '2px solid #000', borderRadius: '5px' }}
        width='100%'
        height='100%'
        loop={true}
        controls={true}
        url={data.actualVideo} />
    </Box>
  )
}