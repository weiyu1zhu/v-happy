import VideoPlayer from './components/VideoPlayer';

import './App.css';
import Button from '@mui/material/Button';
import DataAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={DataAdapter}>
      <div className="App">
        <header className="App-header">
          Welcome Tony! This is your V-Happy!
        </header>
        <VideoPlayer />
      </div>
    </LocalizationProvider>
  );
}

export default App;
