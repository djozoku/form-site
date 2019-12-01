import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import MUILink from '@material-ui/core/Link';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from './components/Link';
import { useMeQuery } from './graphql';

const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    }
  })
);

const Copyright = () => {
  return (
    <Typography align="center" color="textPrimary" variant="body2">
      Copyright ©
      <MUILink color="inherit" href="https://github.com/djozoku/form-site/">
        Form Site
      </MUILink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};

const NavLink: React.FC = ({ children }) => (
  <Typography style={{ textTransform: 'none', fontSize: 14 }} variant="caption">
    {children}
  </Typography>
);

const Layout: React.FC = ({ children }) => {
  const { data, loading } = useMeQuery();
  const loggedIn = !!data && !!data.me;
  let name;
  if (loading) name = 'Loading...';
  else if (loggedIn) name = data!.me!.firstName;
  else name = 'Account';
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleAccountClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLLIElement>) => {
    handleMenuClose();
    navigate(`/account/${event.currentTarget.innerText.toLowerCase()}`);
  };

  return (
    <>
      <AppBar className={classes.appBar} color="secondary" elevation={0} position="sticky">
        <Toolbar>
          <Button
            color="primary"
            component={Link as any}
            size="large"
            startIcon={<HomeIcon />}
            to="/"
          >
            <NavLink>Home</NavLink>
          </Button>
          {loggedIn && (
            <Button
              color="primary"
              component={Link as any}
              size="large"
              startIcon={<ViewCompactIcon />}
              to="/dashboard"
            >
              <NavLink>Dashboard</NavLink>
            </Button>
          )}
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            color="primary"
            endIcon={<AccountCircleIcon />}
            size="large"
            style={{ position: 'absolute', right: 20 }}
            onClick={handleAccountClick}
          >
            <NavLink>{name}</NavLink>
          </Button>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            id="account-menu"
            open={!!anchorEl}
            onClose={handleMenuClose}
          >
            {loggedIn ? (
              <MenuItem onClick={handleMenuClick}>Logout</MenuItem>
            ) : (
              <MenuItem onClick={handleMenuClick}>Login</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xl" style={{ marginTop: 20 }}>
        {children}
      </Container>
      <Container component="footer" maxWidth="xl" style={{ position: 'absolute', bottom: 0 }}>
        <Box m={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default Layout;
