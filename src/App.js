import { useState } from 'react';
import { withStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import FileUploadButton from './components/FileUploadButton/FIleUploadButton';
import PriceChart from './components/PriceChart';
import { simulateNumbers } from './helpers/api';

const Paper = withStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 2)
  }
}))(MuiPaper);

const AWA_PROVIDER = 'AWA_PROVIDER';

function modifier(data) {
  const providers = data.routingResult.reduce((result, routingResult) => {
    const { id: providerId, routingSummary } = routingResult;
    const routingPaths = routingSummary.routingPaths;

    return routingPaths.reduce(
      (pricesPerProvider, routingPath) => ({
        ...pricesPerProvider,
        [routingPath.provider.id]: {
          name: routingPath.provider.name,
          totalCost: (pricesPerProvider[routingPath.provider.id]?.totalCost || 0) + routingPath.priceFactor.unitPrice
        }
      }),
      result
    )
  }, { [AWA_PROVIDER]: { name: 'Multiple Provider (AWA)', totalCost: data.totalMinCost }});

  return Object.values(providers);;
}

export default function App() {
  const [data, setData] = useState([]);

  const onFileChange = (event) => {
    const files = event.target.files;
    const file = files[0];
    const reader = new FileReader();

    reader.onload = async function (event) {
      const textContent = event.target.result;
      const numbers = textContent.split(/\r?\n/);

      try {
        const response = await simulateNumbers(numbers);
        console.log('response', response);
        const computedData = modifier(response);

        setData(computedData);
      } catch (err) {
        console.error(err);
        setData([]);
      }
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
          <PriceChart data={data} />
        </Paper>
      </Box>
    </Container>
  );
}
