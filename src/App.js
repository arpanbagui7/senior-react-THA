import Typography from '@mui/material/Typography';
import './App.css';
import Ballot from './Components/Ballot/Ballot';

function App() {
  // Feel free to remove the contents of the header tag to make more room for your code
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant='h3'>Awards 2021</Typography>
      </header>
      <Ballot />
    </div>
  );
}

export default App;
