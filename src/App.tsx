import Grid from '@mui/material/Grid';

import { Header } from './components/Header';
import { CustomTabs } from './components/Tabs';
import { Search } from './components/Search';
import { VideoView } from './components/VideoView';

export default function App() {
  return (
    <Grid container>
      <Grid
        xs={12}
        sm={4}
        order={{ xs: 2, sm: 1 }}
      >
        <CustomTabs />
      </Grid >

      <Grid
        order={{ xs: 1, sm: 2 }}
        xs={12}
        sm={8}
        sx={{
          
          display: 'flex',
          mt: 4,
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Header />
        <Search />
        <VideoView/>
      </Grid>
    </Grid >
  );
}