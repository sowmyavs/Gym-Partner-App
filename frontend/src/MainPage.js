import * as React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab, Typography, Box} from '@mui/material';
import {positions} from '@mui/system';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LogoutIcon from '@mui/icons-material/Logout';

import ProfileTab from './ProfileTab.js';
import MatchTab from './MatchTab.js';
import ChatTab from './ChatTab.js';
import LogoutTab from './LogoutTab.js';
import Logout from '@mui/icons-material/Logout';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function MainPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: window.innerHeight }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        textColor='inherit'
        TabIndicatorProps={{style: {backgroundColor: '#c5050c', borderRadius: 2, width: 4}}}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Profile" icon={<AccountCircleIcon fontSize='large'/>} {...a11yProps(0)} />
        <Tab label="Match" icon={<FitnessCenterIcon fontSize='large'/>} {...a11yProps(1)} />
        <Tab label="Chat" icon={<ChatBubbleIcon fontSize='large'/>} {...a11yProps(2)} />
        <Tab label="Logout" icon={<LogoutIcon fontSize='large'/>} {...a11yProps(3)} sx={{position: 'absolute', bottom: 10}}/>
      </Tabs>
      <TabPanel value={value} index={0}>
        <ProfileTab/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MatchTab/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ChatTab/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <LogoutTab/>
      </TabPanel>
    </Box>
  );
}
