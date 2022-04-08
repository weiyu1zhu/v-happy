import { useState } from "react";
import {Sensors, HOST, USER_ID, USER_TOKEN} from "../constants";
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Plot from 'react-plotly.js';

const ONE_MINUTE_SECONDS = 60 * 1000;

function Historical() {
    const intervals = [1, 5, 10, 20, 30];
    const params = [
        {full_name: 'calibrated_temperature', short_name: 'Temperature'},
        {full_name: 'calibrated_humidity', short_name: 'Humidity'},
        {full_name: 'usa_air_quality_index', short_name: 'Aiq Quality'},
        {full_name: 'noise_level', short_name: 'Noise'},
    ]
    const [param_index, setParam] = useState(0);
    const [interval, setInterval] = useState(intervals[0]);
    const [date, setDateTime] = useState(new Date());
    const [start, setStart] = useState(Math.floor((Date.now() - 5 * ONE_MINUTE_SECONDS) / 1000));
    const [end, setEnd] = useState(Math.floor((Date.now() - 4 * ONE_MINUTE_SECONDS) / 1000));
    const [xValues, setXValues] = useState([]);
    const [yValues, setYValues] = useState([]);


    const retreiveHistoricalData = () => {
        const src = `${HOST}/sensors/${Sensors[param_index].id}/sensor_data?start=${start}&end=${end}&aggregateInterval=${interval}s&user=${USER_ID}&token=${USER_TOKEN}`;
        async function run() {
            const resp = await fetch(src);
            if (resp.ok) {
                const json = await resp.json();
                let y_values = [];
                const x_values = Array.from(Array(json.length).keys())
                for (const dataPoint of json) {
                    y_values.push(dataPoint[params[param_index].full_name]);
                }
                setXValues(x_values);
                setYValues(y_values);
            } else {
                const text = await resp.text();
                console.log(`Error message: ${text}`);
            }
        }
        run();
    }

    return (
        <Box fullwidth style={{textAlign: '-webkit-center'}}>
            <Stack spacing={2} direction="row" style={{width: 'fit-content'}}>
                <FormControl>
                    <InputLabel id="param-select-label"></InputLabel>
                    <Select
                        labelId="param-select-label"
                        id="param-select-label"
                        value={param_index}
                        label="Parameter"
                        onChange={(e) => setParam(e.target.value)}>
                        <MenuItem value={0}>{params[0].short_name}</MenuItem>
                        <MenuItem value={1}>{params[1].short_name}</MenuItem>
                        <MenuItem value={2}>{params[2].short_name}</MenuItem>
                        <MenuItem value={3}>{params[3].short_name}</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="interval-select-label"></InputLabel>
                    <Select
                        labelId="interval-select-label"
                        id="interval-select-label"
                        label="Interval"
                        value={interval}
                        onChange={(e) => {
                            setInterval(e.target.value);
                            setEnd(start + e.target.value * 60);
                            }}>
                            <MenuItem value={1}>1 min</MenuItem>
                            <MenuItem value={5}>5 min</MenuItem>
                            <MenuItem value={10}>10 min</MenuItem>
                            <MenuItem value={20}>20 min</MenuItem>
                            <MenuItem value={30}>30 min</MenuItem>
                    </Select>
                </FormControl>
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
                <Button variant="contained" onClick={() => {
                    retreiveHistoricalData();
                }}>Submit</Button>
            </Stack>
            <Plot
            data = {[{
                x: xValues,
                y: yValues,
                type: 'scatter',
                mode: 'line+markers',
                marker: {color: 'red'}
            }]}
            layout={ {width: 640, height: 480, title: params[param_index].short_name}}
            ></Plot>
        </Box>
    );
}
export default Historical;