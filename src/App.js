import Profiles from "./components/Profiles";
import VideoPlayer from './components/VideoPlayer';
import Status from './components/Status';

import './App.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DataAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import {User} from "./utils/Classes";
import {Tony} from "./constants";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            tabValue: 0,
            anchorEl: null,
            currentUser: 'Tony',
            users: {
                "Tony": Tony,
                "Guest": User.Default("Guest")
            }
        };

        this.updateUsersProfile = this.updateUsersProfile.bind(this)
    }

    updateUsersProfile(users) {
        console.log(users)
    }

    render() {
        return <LocalizationProvider dateAdapter={DataAdapter}>
            <div className="App">
                <div className="App-topper">
                    <header className="greeting-header">Welcome {this.state.currentUser}! This is your V-Happy!</header>
                    <IconButton aria-label="settings-button" size="large"
                                aria-controls={Boolean(this.state.anchorEl) ? 'user-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={Boolean(this.state.anchorEl) ? 'true' : undefined}
                                onClick={(event) => {
                                    this.setState({anchorEl: event.currentTarget});
                                }}
                                style={{position: 'absolute', bottom: '50px', right: '50px'}}>
                        <BrightnessHighIcon fontSize="large" style={{color: 'white'}}></BrightnessHighIcon>
                    </IconButton>
                    <Menu id="user-menu"
                          anchorEl={this.state.anchorEl}
                          open={Boolean(this.state.anchorEl)}
                          onClose={() => {
                              this.setState({anchorEl: null});
                          }}
                          MenuListProps={{
                              'aria-labelledby': 'settings-button'
                          }}
                          anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right'
                          }}
                          transformOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right'
                          }}>
                        {Object.entries(this.state.users).map(([userName, _]) => (
                            <MenuItem onClick={() => {
                                this.setState({anchorEl: null});
                                this.setState({currentUser: userName});
                            }}>{userName}</MenuItem>
                        ))}
                    </Menu>
                </div>

                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={this.state.tabValue} onChange={(event, newValue) => {
                            this.setState({tabValue: newValue})
                        }} aria-label="four major components">
                <Tab label="Status" {...a11yProps(0)} style={{width: '25%'}}></Tab>
                <Tab label="Historical" {...a11yProps(1)} style={{width: '25%'}}></Tab>
                <Tab label="Video" {...a11yProps(2)} style={{width: '25%'}}></Tab>
                <Tab label="Profiles" {...a11yProps(3)} style={{width: '25%'}}></Tab>
              </Tabs>
            </Box>
            <TabPanel value={this.state.tabValue} index={0}>
              <Status user={this.state.users[this.state.currentUser]}></Status>
            </TabPanel>
            <TabPanel value={this.state.tabValue} index={1}>
              <VideoPlayer />
            </TabPanel>
            <TabPanel value={this.state.tabValue} index={2}>
              <VideoPlayer />
            </TabPanel>
            <TabPanel value={this.state.tabValue} index={3}>
              <Profiles currentUser={this.state.users[this.state.currentUser]} users={this.state.users} action={this.updateUsersProfile}/>
            </TabPanel>
          </Box>
        </div>
      </LocalizationProvider>
  }
}

export default App;
