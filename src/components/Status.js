import StatusGrid from './StatusGrid';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function Status(props) {
    const {user} = props;

    const temp = 400;
    const humidity = 40;
    const aqi = 20;
    const noise = 50.5;
    return (
      <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
              <Grid item xs={6}>
                  <StatusGrid value={temp} index={0} threshold={user.temperature}></StatusGrid>
              </Grid>
              <Grid item xs={6}>
                  <StatusGrid value={humidity} index={1} threshold={user.humidity}></StatusGrid>
              </Grid>
              <Grid item xs={6}>
                  <StatusGrid value={aqi} index={2} threshold={user.airQuality}></StatusGrid>
              </Grid>
              <Grid item xs={6}>
                <StatusGrid value={noise} index={3} threshold={user.noise}></StatusGrid>
              </Grid>
          </Grid>
      </Box>
    )
}
export default Status;