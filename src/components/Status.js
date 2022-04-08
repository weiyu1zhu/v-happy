import StatusGrid from './StatusGrid';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function Status(props) {
    const {user, sensorData} = props;

    return (
      <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
              <Grid item xs={6}>
                  <StatusGrid value={sensorData[0].toFixed(2)} index={0} threshold={user.temperature}></StatusGrid>
              </Grid>
              <Grid item xs={6}>
                  <StatusGrid value={sensorData[1].toFixed(2)} index={1} threshold={user.humidity}></StatusGrid>
              </Grid>
              <Grid item xs={6}>
                  <StatusGrid value={Math.round(sensorData[2])} index={2} threshold={user.airQuality}></StatusGrid>
              </Grid>
              <Grid item xs={6}>
                <StatusGrid value={sensorData[3].toFixed(2)} index={3} threshold={user.noise}></StatusGrid>
              </Grid>
          </Grid>
      </Box>
    )
}
export default Status;