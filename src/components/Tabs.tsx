import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { History } from './History';
import { Bookmarks } from './Bookmarks';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </Box>
  );
}

export function CustomTabs() {
  const [valueTab, setValueTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={valueTab} onChange={handleChange} centered>
          <Tab label="History" />
          <Tab label="Bookmarks" />
        </Tabs>
      </Box>

      <CustomTabPanel value={valueTab} index={0}>
        <History />
      </CustomTabPanel>

      <CustomTabPanel value={valueTab} index={1}>
        <Bookmarks />
      </CustomTabPanel>
    </Box>
  );
}
