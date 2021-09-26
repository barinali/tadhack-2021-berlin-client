import { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import MuiContainer from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiPaper from '@mui/material/Paper';
import FileUploadButton from './components/FileUploadButton/FIleUploadButton';
import PriceChart from './components/PriceChart/PriceChart';
import MCCPieChart from './components/MCCPieChart/MCCPieChart';
import { simulateNumbers } from './helpers/api';

import mockData from './mocks/small_campaign.json';

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

function checkRawDataValidity(data) {
  return Object.values(data).length > 0;
}

function preparePriceData(data) {
  if (!checkRawDataValidity(data)) return [];

  const providers = data.routingResult.reduce((result, routingResult) => {
    const { id: providerId, routingSummary } = routingResult;
    const routingPaths = routingSummary.routingPaths;

    // there are 4 providers available in the account. if any entry has less than 4 routes/providers
    // omit them.
    if (routingPaths.length < 4) return result;

    const cheapestCost = routingSummary.routingPaths.reduce((cheapest, routingPath) => {
      const cost = routingPath.priceFactor.unitPrice;
      return cheapest < cost ? cheapest : cost;
    }, Infinity);

    const currentAwaTotalCost = result[AWA_PROVIDER].totalCost;
    const newAwaTotalCost = currentAwaTotalCost + cheapestCost;

    return routingPaths.reduce(
      (pricesPerProvider, routingPath) => {
        return ({
          ...pricesPerProvider,
          [AWA_PROVIDER]: {
            name: result[AWA_PROVIDER].name,
            totalCost: newAwaTotalCost,
          },
          [routingPath.provider.id]: {
            name: routingPath.provider.name,
            totalCost: (pricesPerProvider[routingPath.provider.id]?.totalCost || 0) + routingPath.priceFactor.unitPrice
          }
        })
      },
      result
    )
  }, { [AWA_PROVIDER]: { name: 'Multiple Providers (AWA)', totalCost: 0 }});

  return Object.values(providers);
}

function prepareMCCData(data) {
  if (!checkRawDataValidity(data)) return [];

  const pairs = data.routingResult.reduce((result, routingResult) => {
    const { mcc } = routingResult;

    const currentMccCount = result[mcc]?.value || 0;

    return {
      ...result,
      [mcc]: {
        name: mcc,
        value: currentMccCount + 1
      }
    };
  }, {});

  return Object.values(pairs);
}

export default function App() {
  const [isLoading, setLoading] = useState(false);
  const [rawData, setRawData] = useState({});
  const [priceData, setPriceData] = useState([]);
  const [mccData, setMccData] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  // useEffect(() => {
  //   setRawData(mockData);
  // }, [])

  useEffect(() => {
    setPriceData(preparePriceData(rawData));
    setMccData(prepareMCCData(rawData));
  }, [rawData]);

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

        setRawData(response);
        setSnackbarMessage('The query is successful!');
      } catch (err) {
        console.error(err);
        setSnackbarMessage('The query has failed!');
        setRawData({});
      } finally {
        setLoading(false);
      }
    }

    reader.readAsText(file)
  };

  return (
    <Container maxWidth={false}>
      <Paper>
        <FileUploadButton onChange={onFileChange} disabled={isLoading} />
      </Paper>

      <AutoHeightPaper>
        <Grid container>
          <Grid item xs={12} md={6} pr={2}>
            <PriceChart data={priceData} />
          </Grid>

          <Grid item xs={12} md={6} pl={2}>
            <MCCPieChart data={mccData} />
          </Grid>
        </Grid>
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
