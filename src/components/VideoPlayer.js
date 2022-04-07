import { useCallback, useMemo, useState } from "react";
import { Cameras, HOST, USER_ID, USER_TOKEN } from "../constants";
import Video from "./Video";
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import styles from "./VideoPlayer.module.css";

const ONE_MINUTE_SECONDS = 60 * 1000;

function VideoPlayer() {
  const { start, end } = useMemo(
    () => ({
      start: Math.floor((Date.now() - 5 * ONE_MINUTE_SECONDS) / 1000),
      end: Math.floor((Date.now() - 4 * ONE_MINUTE_SECONDS) / 1000),
    }),
    []
  );

  const [videoMode, setVideoMode] = useState("live");

  const [value, setDateTime] = useState(new Date());

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
      <div>
        <FormControl fullWidth>
          <InputLabel id="camera-select-label"></InputLabel>
          <Select
            labelId="camera-select-label"
            id="camera-select-label"
            value={cameraId}
            label="Camera"
            onChange={(e) => setCameraId(e.target.value)}
          >
            {Cameras.map((camera) => (
              <MenuItem value={camera.id}>
                {camera.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="video-mode-select-label"></InputLabel>
          <Select
            labelId="video-mode-select-label"
            id="video-mode-select-label"
            value={videoMode}
            label="Video Mode"
            onChange={(e) => setVideoMode(e.target.value)}
          >
            <MenuItem value="live">Live</MenuItem>
            <MenuItem value="historical">Historical</MenuItem>
          </Select>
        </FormControl>
        <div>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="DateTimePicker"
              value={value}
              onChange={(newValue) => {
                  setDateTime(newValue);
                  console.log(newValue);
              }}
            />
        </div>
      </div>
      <Video className={styles.video} ref={onVideoElement} src={src} />
    </div>
  );
}
export default VideoPlayer;