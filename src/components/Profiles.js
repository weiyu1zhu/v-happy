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
import {User} from "../utils/Classes";

class Profiles extends Component {
    // handleSubmit() {
    //     let updatedUsers = {}
    //     Object.assign(updatedUsers, this.props.users)
    //     updatedUsers["yes"] = User.Default("yes")
    //     console.log(updatedUsers)
    //     this.props.action(updatedUsers)
    // }

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
                                    <StyledTableCell align="right">{this.props.currentUser.name}'s Thresholds</StyledTableCell>
                                    <StyledTableCell align="right">Temperature&nbsp;(C)</StyledTableCell>
                                    <StyledTableCell align="right">Air Quality Index&nbsp;(AQI)</StyledTableCell>
                                    <StyledTableCell align="right">Noise&nbsp;(db)</StyledTableCell>
                                    <StyledTableCell align="right">Humidity&nbsp;(%)</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow key="low red">
                                    <StyledTableCell align="left">Low Red</StyledTableCell>
                                    <StyledTableCell align="right">{this.props.currentUser.temperature.lowRed}</StyledTableCell>
                                    <StyledTableCell align="right">N/A</StyledTableCell>
                                    <StyledTableCell align="right">N/A</StyledTableCell>
                                    <StyledTableCell align="right">{this.props.currentUser.humidity.lowRed}</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                            <TableBody>
                                <StyledTableRow key="low yellow">
                                    <StyledTableCell align="left">Low Yellow</StyledTableCell>
                                    <StyledTableCell align="right">{this.props.currentUser.temperature.lowYellow}</StyledTableCell>
                                    <StyledTableCell align="right">N/A</StyledTableCell>
                                    <StyledTableCell align="right">N/A</StyledTableCell>
                                    <StyledTableCell align="right">{this.props.currentUser.humidity.lowYellow}</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                            <TableBody>
                                <StyledTableRow key="high yellow">
                                    <StyledTableCell align="left">High Yellow</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{this.props.currentUser.temperature.highYellow}</StyledTableCell>
                                    <StyledTableCell align="right">{this.props.currentUser.airQuality.yellow}</StyledTableCell>
                                    <StyledTableCell align="right">{this.props.currentUser.noise.yellow}</StyledTableCell>
                                    <StyledTableCell align="right">{this.props.currentUser.humidity.highYellow}</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                            <TableBody>
                                <StyledTableRow key="high red">
                                    <StyledTableCell align="left">High Red</StyledTableCell>
                                    <StyledTableCell align="right">{this.props.currentUser.temperature.highRed}</StyledTableCell>
                                    <StyledTableCell align="right">{this.props.currentUser.airQuality.red}</StyledTableCell>
                                    <StyledTableCell align="right">{this.props.currentUser.noise.red}</StyledTableCell>
                                    <StyledTableCell align="right">{this.props.currentUser.humidity.highRed}</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>


                {/*<form>*/}
                {/*    <label>*/}
                {/*        Name:*/}
                {/*        <input type="text" name="name"/>*/}
                {/*    </label>*/}
                {/*    <input type="submit" value="Submit" onClick={this.props.action(this.props.users)}/>*/}
                {/*</form>*/}
            </div>
        )
    }
}

export default Profiles;