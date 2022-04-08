import Profiles from "./components/Profiles";
import VideoPlayer from './components/VideoPlayer';
import Status from './components/Status';
import Historical from "./components/Historical";
import {Speakers, Sensors, HOST, USER_ID, USER_TOKEN} from './constants';

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
import Avatar from '@mui/material/Avatar';
import {red, yellow, lightGreen} from '@mui/material/colors';

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

const colors = [lightGreen[400], yellow[700], red[500]];
const texts = ['Safe', 'Warning!', 'Danger!'];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        tabValue: 0,
        anchorEl: null,
        sensorData: [0, 0, 0, 0],
        statusColor: colors[0],
        statusText: texts[0],
        currentUser: 'Tony',
        users: {
            "Tony": Tony,
            "Guest": User.Default("Guest")
        },
        audioFileData: null,
        fileRef: React.createRef(null),
    };

    this.updateUsersProfile = this.updateUsersProfile.bind(this);
    this.updateSensorData();
  }

  updateSensorData() {
    let newSensorData = [...this.state.sensorData];
    async function run() {
      const end = Math.floor(Date.now() / 1000);
      const start = end - 5;
      const noises = [];
      // Temperature
      const resp = await fetch(
        `${HOST}/sensors/${Sensors[0].id}/sensor_data?start=${start}&end=${end}&aggregateInterval=1s&user=${USER_ID}&token=${USER_TOKEN}`
      );
      if (resp.ok) {
        const temps = [];
        const json = await resp.json();
        for (const data of json) {
          temps.push(data['calibrated_temperature']);
          noises.push(data['noise_level']);
        }
        const temp = temps.reduce((a, b) => a + b, 0) / temps.length;
        newSensorData[0] = temp;
      } else {
        const text = await resp.text();
        console.log(`Error message: ${text}`);
      }
      // Humidity
      const resp_1 = await fetch(
        `${HOST}/sensors/${Sensors[1].id}/sensor_data?start=${start}&end=${end}&aggregateInterval=1s&user=${USER_ID}&token=${USER_TOKEN}`
      );
      if (resp.ok) {
        const humids = [];
        const json = await resp_1.json();
        for (const data of json) {
          humids.push(data['calibrated_humidity']);
          noises.push(data['noise_level']);
        }
        const humid = humids.reduce((a, b) => a + b, 0) / humids.length;
        newSensorData[1] = humid;
      } else {
        const text = await resp_1.text();
        console.log(`Error message: ${text}`);
      }
      // FOg machine, for air quality index
      const resp_2 = await fetch(
        `${HOST}/sensors/${Sensors[2].id}/sensor_data?start=${start}&end=${end}&aggregateInterval=1s&user=${USER_ID}&token=${USER_TOKEN}`
      );
      if (resp.ok) {
        const json = await resp_2.json();
        const aqis = [];
        for (const data of json) {
          aqis.push(data['usa_air_quality_index']);
          noises.push(data['noise_level']);
        }
        const aqi = aqis.reduce((a, b) => a + b, 0) / aqis.length;
        newSensorData[2] = aqi;
      } else {
        const text = await resp_2.text();
        console.log(`Error message: ${text}`);
      }
      if (noises.length > 0) {
        const noise = noises.reduce((a, b) => a + b, 0) / noises.length;
        newSensorData[3] = noise;
      }
    }
    run();
    this.setState({sensorData: newSensorData});
    this.performSafetyCheck();
  }

  performSafetyCheck() {
    const temp = this.state.sensorData[0];
    const humid = this.state.sensorData[1];
    const aqi = this.state.sensorData[2];
    const noise = this.state.sensorData[3];
    const tempThreshold = this.state.users[this.state.currentUser].temperature;
    const humidThreshold = this.state.users[this.state.currentUser].humidity;
    const aqiThreshold = this.state.users[this.state.currentUser].airQuality;
    const noiseThreshold = this.state.users[this.state.currentUser].noise;
    if (tempThreshold.isRed(temp) || humidThreshold.isRed(humid) || aqiThreshold.isRed(aqi) || noiseThreshold.isRed(noise)) {
      this.setState({statusColor: colors[2]});
      this.setState({statusText: texts[2]});
      this.sendAlarm();
    } else if (tempThreshold.isYellow(temp) || humidThreshold.isYellow(humid) || aqiThreshold.isYellow(aqi) || noiseThreshold.isYellow(noise)) {
      this.setState({statusColor: colors[1]});
      this.setState({statusText: texts[1]});
    } else {
      this.setState({statusColor: colors[0]});
      this.setState({statusText: texts[0]});
    }
  }

  sendAlarm() {
    const endpoint = `${HOST}/audio/${Speakers[1].id}/upload?user=${USER_ID}&token=${USER_TOKEN}`;
    const audioFileData = this.state.audioFileData;
    if (audioFileData == null) {
      return;
    }
    async function upload() {
      try {
        const resp = await fetch(endpoint,{
          method: 'post',
          body: audioFileData,
        });
        if (resp.ok) {
          console.log('Successfullt send alarm audio');
        } else {
          const respText = await resp.text();
          console.log(`Error message: ${respText}`);
        }
      } catch (e) {
        console.log(e);
      }
    }
    upload();
  }

  updateUsersProfile(users) {
    this.setState({"users":users})
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.updateSensorData();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onFileUpload = event => {
    event.preventDefault();
    const fileInput = event.target.elements[0];
    if (fileInput.length < 1) {
      console.log("Error: You must select a file");
      return;
    }
    try {
      const formData = new FormData(event.target);
      this.setState({audioFileData: formData});
      this.state.audioFileData = formData;
    } catch (e) {
      console.log(e.message);
    }
  }

  render() {
    return <LocalizationProvider dateAdapter={DataAdapter}>
        <div className="App">
          <div className="App-topper">
            <header className="greeting-header">Welcome {this.state.currentUser}! This is your V-Happy!</header>
            <Avatar sx={{ bgcolor: this.state.statusColor, width: 360, height: 360, fontSize: 60}}>{this.state.statusText}</Avatar>
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
            <div style={{position: 'absolute', top: '100px', right: '50px'}}>
                <form onSubmit={this.onFileUpload}>
                  <div style={{fontSize: 24}}>
                    <input name="audio" ref={this.state.fileRef} type="file" accept="audio/wav"/>
                    <button>Upload</button>
                  </div>
                </form>
            </div>
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
              <Status user={this.state.users[this.state.currentUser]} sensorData={this.state.sensorData}></Status>
            </TabPanel>
            <TabPanel value={this.state.tabValue} index={1}>
              <Historical />
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
