import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from './Login';
import Register from "./Register";
import "../../index.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function HomePage() {
  const [value, setValue] = React.useState(0);
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='home-page'>
      <h1 className='header-title'>Chat Please</h1>
    <Box style={{className:"box"}} className="box">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" st>
          <Tab label="Logins"  {...a11yProps(0)}  style={{width:"50%"}}/>
          <Tab label="Register" className="tab" {...a11yProps(1)} style={{width:"50%"}}/>
         
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Login/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Register/>
      </TabPanel>
      
    </Box>
    
    </div>
  );
}