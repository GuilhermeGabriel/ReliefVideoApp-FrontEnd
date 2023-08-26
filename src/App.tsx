import Grid from '@mui/material/Grid';

import { Header } from './components/Header';
import { CustomTabs } from './components/Tabs';
import { Search } from './components/Search';
import { VideoView } from './components/VideoView';

export default function App() {
  return (
    <Grid container padding={0}>
      <Grid
        xs={12}
        md={4}
        order={{ xs: 2, md: 1 }}
      >
        <CustomTabs />
      </Grid >

      <Grid
        order={{ xs: 1, md: 2 }}
        xs={12}
        md={8}
        sx={{

          display: 'flex',
          mt: 4,
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Header />
        <Search />
        <VideoView />
      </Grid>
    </Grid >
  );
}