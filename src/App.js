import { useState } from 'react';
import { withStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import FileUploadButton from './components/FileUploadButton/FIleUploadButton';
import PriceChart from './components/PriceChart';

const Paper = withStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 2)
  }
}))(MuiPaper);

export default function App() {
  const [data, setData] = useState(null);

  const onFileChange = (event) => {
    const files = event.target.files;
    const file = files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
      const textContent = event.target.result;
      console.log(textContent);
      // TODO: Do number simulation with AWA
    }

    reader.readAsText(file)
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Paper>
          <FileUploadButton onChange={onFileChange} />
        </Paper>
      </Box>

      <Box sx={{ my: 4 }}>
        <Paper>
          <PriceChart />
        </Paper>
      </Box>
    </Container>
  );
}
