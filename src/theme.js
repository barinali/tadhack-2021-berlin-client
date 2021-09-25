import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      contrastText: '#FFFFFF',
      dark: '#0000C8',
      light: '#7141FF',
      main: '#0000FD',
    },
    secondary: {
      contrastText: 'rgba(0, 0, 94, 0.87)',
      dark: '#BFCC13',
      light: '#FFFF88c',
      main: '#F5FF54',
    },
    text: {
      disabled: 'rgba(0, 0, 94, 0.26)',
      primary: 'rgba(0, 0, 94, 0.87)',
      secondary: 'rgba(0, 0, 94, 0.6)',
    },
  },
});

export default theme;
