import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import {red, yellow, lightGreen} from '@mui/material/colors';

function StatusGrid(props) {
    const {value, index, threshold} = props;

    const names = ['Temperature', 'Humidity', 'Air Quality Index', 'Noise'];
    const units = ['°C', '%', '', 'dB'];

    const colors = [lightGreen[400], yellow[700], red[500]];
    const texts = ['Common', 'Warning!', 'Danger!'];
    const getColor = () => {
        if (threshold.isRed(value)) {
            return colors[2];
        } else if (threshold.isYellow(value)) {
            return colors[1];
        } else {
            return colors[0];
        }
    }
    const getText= () => {
        if (threshold.isRed(value)) {
            return texts[2];
        } else if (threshold.isYellow(value)) {
            return texts[1];
        } else {
            return texts[0];
        }
    }

    return (
        <Box fullwidth style={{ textAlign: '-webkit-center', paddingBottom: 20, paddingTop: 20}}>
            <Avatar sx={{ bgcolor: getColor(), width: 180, height: 180, fontSize: 30 }}>{getText()}</Avatar>
            <header style={{ marginTop: 12 }}>{ names[index] + ': ' + value + units[index] }</header>
        </Box>
    );
}
export default StatusGrid;