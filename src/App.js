import { useState } from 'react';
import { withStyles } from '@mui/styles';
import MuiContainer from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiPaper from '@mui/material/Paper';
import FileUploadButton from './components/FileUploadButton/FIleUploadButton';
import PriceChart from './components/PriceChart';
import { simulateNumbers } from './helpers/api';

const Paper = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(1, 0),
    display: 'flex',
  }
}))(MuiPaper);

const AutoHeightPaper = withStyles({
  root: {
    flex: 1,
  }
})(Paper);

const Container = withStyles(({
  root: {
    display: 'flex !important',
    flex: 1,
    flexDirection: 'column',
  }
}))(MuiContainer);

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
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const onFileChange = (event) => {
    setSnackbarMessage(null);
    setLoading(true);
    const files = event.target.files;
    const file = files[0];
    const reader = new FileReader();

    reader.onload = async function (event) {
      const textContent = event.target.result;
      const numbers = textContent.split(/\r?\n/);

      try {
        const response = await simulateNumbers(numbers);
        const computedData = modifier(response);

        setSnackbarMessage('The query is successful!');
        setData(computedData);
      } catch (err) {
        console.error(err);
        setSnackbarMessage('The query has failed!');
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    reader.readAsText(file)
  };

  return (
    <Container maxWidth="lg">
      <Paper>
        <FileUploadButton onChange={onFileChange} disabled={isLoading} />
      </Paper>

      <AutoHeightPaper>
        <PriceChart data={data} />
      </AutoHeightPaper>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbarMessage}
        onClose={() => setSnackbarMessage(null)}
        autoHideDuration={5000}
        message={snackbarMessage}
      />
    </Container>
  );
}
