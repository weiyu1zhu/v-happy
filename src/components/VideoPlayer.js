import { useCallback, useState } from "react";
import { Cameras, HOST, USER_ID, USER_TOKEN } from "../constants";
import Video from "./Video";
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import styles from "./VideoPlayer.module.css";

const ONE_MINUTE_SECONDS = 60 * 1000;

function VideoPlayer() {
  const [start, setStart] = useState(Math.floor((Date.now() - 5 * ONE_MINUTE_SECONDS) / 1000));
  const [end, setEnd] = useState(Math.floor((Date.now() - 4 * ONE_MINUTE_SECONDS) / 1000));
  
  const [videoMode, setVideoMode] = useState("live");

  const [date, setDateTime] = useState(new Date());
  const [interval, setInterval] = useState(1);

  const [cameraId, setCameraId] = useState(Cameras[0].id);
  const src =
    videoMode === "historical"
      ? `${HOST}/devices/${cameraId}/history/video.m3u8?user=${USER_ID}&token=${USER_TOKEN}&start=${start}&end=${end}`
      : `${HOST}/devices/${cameraId}/liveVideo.m3u8?user=${USER_ID}&token=${USER_TOKEN}`;

  const onVideoElement = useCallback((ref) => {
    // Ref is the `video` element
  }, []);

  return (
    <div>
      <h3>Video Player</h3>
      <div style={{marginBottom: '20px'}}>
        <FormControl>
          <InputLabel id="camera-select-label"></InputLabel>
          <Select
            labelId="camera-select-label"
            id="camera-select-label"
            value={cameraId}
            label="Camera"
            onChange={(e) => setCameraId(e.target.value)}
            style={{marginRight: '20px'}}
          >
            {Cameras.map((camera) => (
              <MenuItem value={camera.id}>
                {camera.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="video-mode-select-label"></InputLabel>
          <Select
            labelId="video-mode-select-label"
            id="video-mode-select-label"
            value={videoMode}
            label="Video Mode"
            onChange={(e) => setVideoMode(e.target.value)}
            style={{marginRight: '20px'}}
          >
            <MenuItem value="live">Live</MenuItem>
            <MenuItem value="historical">Historical</MenuItem>
          </Select>
        </FormControl>
        {videoMode === 'historical' ?
        <div style={{marginTop: '20px'}}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Start time"
            value={date}
            onChange={(newDate) => {
              setDateTime(newDate.toDate());
              const newStart = newDate.toDate().getTime() / 1000;
              setStart(newStart);
              setEnd(newStart + interval * 60);
            }}
          />
          <FormControl>
            <InputLabel id="video-mode-select-label"></InputLabel>
            <Select
              labelId="interval-select-label"
              id="interval-select-label"
              value={interval}
              label="Interval"
              onChange={(e) => {
                setInterval(e.target.value);
                setStart(start);
                setEnd(start + e.target.value * 60);
              }}
              style={{marginLeft: '20px'}}
            >
              <MenuItem value="1">1 min</MenuItem>
              <MenuItem value="2">2 min</MenuItem>
              <MenuItem value="5">5 min</MenuItem>
              <MenuItem value="10">10 min</MenuItem>
            </Select>
          </FormControl>
        </div> : ''}
      </div>
      <Video className={styles.video} ref={onVideoElement} src={src} />
    </div>
  );
}
export default VideoPlayer;