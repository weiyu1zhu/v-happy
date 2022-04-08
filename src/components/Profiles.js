import {StyledTableCell, StyledTableRow} from "../utils/CustomizedTables";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, {Component} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {AirQualityIndex, Humidity, Noise, Temperature, User} from "../utils/Classes";
import TextField from '@mui/material/TextField';

class Profiles extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            tempLowRed: "",
            tempLowYellow: "",
            tempHighRed: "",
            tempHighYellow: "",
            aqiYellow: "",
            aqiRed: "",
            nYellow: "",
            nRed: "",
            humLowRed: "",
            humLowYellow: "",
            humHighRed: "",
            humHighYellow: "",

        }

    }

    handleSubmit = (event) => {
        event.preventDefault();
        let updatedUsers = {}
        Object.assign(updatedUsers, this.props.users)
        updatedUsers[this.state.name] =
            new User(this.state.name, new Temperature(Number(this.state.tempLowRed), Number(this.state.tempLowYellow), Number(this.state.tempHighYellow), Number(this.state.tempHighRed)), new AirQualityIndex(Number(this.state.aqiYellow), Number(this.state.aqiRed)), new Noise(Number(this.state.nYellow), Number(this.state.nRed)), new Humidity(Number(this.state.humLowRed), Number(this.state.humLowYellow), Number(this.state.humHighYellow), Number(this.state.humHighRed)))
        this.props.action(updatedUsers)
    }

    render() {
        return (
            <div>
                <h3>Profiles</h3>
                <FormControl>
                    <InputLabel id="user-select-label"/>
                </FormControl>
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 700}} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="right">{this.props.currentUser.name}'s
                                        Thresholds</StyledTableCell>
                                    <StyledTableCell align="right">Temperature&nbsp;(C)</StyledTableCell>
                                    <StyledTableCell align="right">Air Quality Index&nbsp;(AQI)</StyledTableCell>
                                    <StyledTableCell align="right">Noise&nbsp;(db)</StyledTableCell>
                                    <StyledTableCell align="right">Humidity&nbsp;(%)</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow key="low red">
                                    <StyledTableCell align="left">Low Red</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{this.props.currentUser.temperature.lowRed}</StyledTableCell>
                                    <StyledTableCell align="right">N/A</StyledTableCell>
                                    <StyledTableCell align="right">N/A</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{this.props.currentUser.humidity.lowRed}</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                            <TableBody>
                                <StyledTableRow key="low yellow">
                                    <StyledTableCell align="left">Low Yellow</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{this.props.currentUser.temperature.lowYellow}</StyledTableCell>
                                    <StyledTableCell align="right">N/A</StyledTableCell>
                                    <StyledTableCell align="right">N/A</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{this.props.currentUser.humidity.lowYellow}</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                            <TableBody>
                                <StyledTableRow key="high yellow">
                                    <StyledTableCell align="left">High Yellow</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{this.props.currentUser.temperature.highYellow}</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{this.props.currentUser.airQuality.yellow}</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{this.props.currentUser.noise.yellow}</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{this.props.currentUser.humidity.highYellow}</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                            <TableBody>
                                <StyledTableRow key="high red">
                                    <StyledTableCell align="left">High Red</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{this.props.currentUser.temperature.highRed}</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{this.props.currentUser.airQuality.red}</StyledTableCell>
                                    <StyledTableCell align="right">{this.props.currentUser.noise.red}</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{this.props.currentUser.humidity.highRed}</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <h3>Update Profile</h3>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id="name"
                        label="Name"
                        placeholder="new or existing name"
                        onChange={(e) => this.setState({"name": e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        id="tempLowRed"
                        label="Cold Emergency (°C)"
                        placeholder="emergency threshold for cold"
                        onChange={(e) => this.setState({"tempLowRed": e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        id="tempLowYellow"
                        label="Cold Warning (°C)"
                        placeholder="warning threshold for cold"
                        onChange={(e) => this.setState({"tempLowYellow": e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        id="tempHighYellow"
                        label="Hot Warning (°C)"
                        placeholder="warning threshold for hot"
                        onChange={(e) => this.setState({"tempHighYellow": e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        id="tempHighRed"
                        label="Hot Emergency (°C)"
                        placeholder="emergency threshold for hot"
                        onChange={(e) => this.setState({"tempHighRed": e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        id="aqiYellow"
                        label="AQI Warning"
                        placeholder="waring threshold for AQI"
                        onChange={(e) => this.setState({"aqiYellow": e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        id="aqiRed"
                        label="AQI Emergency"
                        placeholder="emergency threshold for AQI"
                        onChange={(e) => this.setState({"aqiRed": e.target.value})}
                        variant="standard"
                    />

                    <TextField
                        id="nYellow"
                        label="Noise Warning"
                        placeholder="waring threshold for Noise"
                        onChange={(e) => this.setState({"nYellow": e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        id="nRed"
                        label="Noise Emergency"
                        placeholder="emergency threshold for Noise"
                        onChange={(e) => this.setState({"nRed": e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        id="humLowRed"
                        label="Dry Emergency"
                        placeholder="emergency threshold for dry"
                        onChange={(e) => this.setState({"humLowRed": e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        id="humLowYellow"
                        label="Dry Warning "
                        placeholder="warning threshold for dry"
                        onChange={(e) => this.setState({"humLowYellow": e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        id="humHighYellow"
                        label="Wet Warning "
                        placeholder="warning threshold for wet"
                        onChange={(e) => this.setState({"humHighYellow": e.target.value})}
                        variant="standard"
                    />
                    <TextField
                        id="humHighRed"
                        label="Wet Emergency"
                        placeholder="emergency threshold for wet"
                        onChange={(e) => this.setState({"humHighRed": e.target.value})}
                        variant="standard"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Profiles;