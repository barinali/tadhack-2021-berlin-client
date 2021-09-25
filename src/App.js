import * as React from 'react';
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
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Paper>
          <FileUploadButton />
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
