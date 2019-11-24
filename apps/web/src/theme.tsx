import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff'
    },
    secondary: {
      main: '#1976d2'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    },
    text: {
      primary: '#000',
      secondary: '#000'
    }
  }
});

export default theme;
