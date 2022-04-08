import VideoPlayer from './components/VideoPlayer';

import './App.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DataAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';
import Profiles from "./components/Profiles";

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
            users: []
        };
    }

    render() {
        return <LocalizationProvider dateAdapter={DataAdapter}>
            <div className="App">
                <header className="App-header">
                    Welcome Tony! This is your V-Happy!
                </header>

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
                        <VideoPlayer/>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={1}>
                        <VideoPlayer/>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={2}>
                        <VideoPlayer/>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={3}>
                        <Profiles/>
                    </TabPanel>
                </Box>
            </div>
        </LocalizationProvider>
    }

}

export default App;
