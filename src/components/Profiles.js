import {StyledTableCell, StyledTableRow} from "../utils/CustomizedTables";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {User} from "../utils/Classes";

function Profiles() {
    const defaultUser = User.Default("default")
    return (
        <div>
            <h3>Profiles</h3>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="right">Default Threshold</StyledTableCell>
                                <StyledTableCell align="right">Temperature&nbsp;(F)</StyledTableCell>
                                <StyledTableCell align="right">Air Quality Index&nbsp;(AQI)</StyledTableCell>
                                <StyledTableCell align="right">Noise&nbsp;(db)</StyledTableCell>
                                <StyledTableCell align="right">Humidity&nbsp;(%)</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow key="low yellow">
                                <StyledTableCell align="left">Low Yellow</StyledTableCell>
                                <StyledTableCell align="right">{defaultUser.temperature.lowRed}</StyledTableCell>
                                <StyledTableCell align="right">N/A</StyledTableCell>
                                <StyledTableCell align="right">N/A</StyledTableCell>
                                <StyledTableCell align="right">{defaultUser.humidity.lowRed}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                        <TableBody>
                            <StyledTableRow key="low red">
                                <StyledTableCell align="left">Low Red</StyledTableCell>
                                <StyledTableCell align="right">{defaultUser.temperature.lowYellow}</StyledTableCell>
                                <StyledTableCell align="right">N/A</StyledTableCell>
                                <StyledTableCell align="right">N/A</StyledTableCell>
                                <StyledTableCell align="right">{defaultUser.humidity.lowYellow}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                        <TableBody>
                            <StyledTableRow key="high yellow">
                                <StyledTableCell align="left">High Yellow</StyledTableCell>
                                <StyledTableCell align="right">{defaultUser.temperature.highYellow}</StyledTableCell>
                                <StyledTableCell align="right">{defaultUser.airQuality.yellow}</StyledTableCell>
                                <StyledTableCell align="right">{defaultUser.noise.yellow}</StyledTableCell>
                                <StyledTableCell align="right">{defaultUser.humidity.highYellow}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                        <TableBody>
                            <StyledTableRow key="high red">
                                <StyledTableCell align="left">High Red</StyledTableCell>
                                <StyledTableCell align="right">{defaultUser.temperature.highRed}</StyledTableCell>
                                <StyledTableCell align="right">{defaultUser.airQuality.red}</StyledTableCell>
                                <StyledTableCell align="right">{defaultUser.noise.red}</StyledTableCell>
                                <StyledTableCell align="right">{defaultUser.humidity.highRed}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>


            <form>
                <label>
                    Name:
                    <input type="text" name="name"/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default Profiles;