import React, { useState } from 'react';
import { RouteComponentProps, Router } from '@reach/router';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Link from '../components/Link';
import Layout from '../Layout';
import { useMeQuery, useCreateGroupMutation } from '../graphql';
import DashboardIndex from './dashboard/info';
import FormListPage from './group/formList';
import CreateFormPage from './form/createForm';
import FormDataPage from './form/formData';
import AddDocumentPage from './form/addDocument';

const useStyles = makeStyles((theme) =>
  createStyles({
    groupListTitle: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 20,
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 20,
        paddingRight: 20
      }
    },
    groupListHeader: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 20,
        paddingRight: 20
      }
    },
    groupListItem: {
      [theme.breakpoints.up('md')]: {
        paddingLeft: 26,
        paddingRight: 26
      }
    },
    formListContainer: {
      [theme.breakpoints.up('md')]: {
        paddingLeft: 250
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 300
      },
      [theme.breakpoints.up('xl')]: {
        paddingLeft: 400
      }
    },
    paper: {
      maxWidth: 150,
      [theme.breakpoints.up('sm')]: {
        maxWidth: 200
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: 250
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: 300
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: 400
      }
    }
  })
);
// TODO: mobile friendly (sliding drawer)
const DashboardPage: React.FC<RouteComponentProps> = ({ navigate, location }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const id = location!.pathname.split('/').slice(3)[0];
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');
  const { data, loading, refetch } = useMeQuery();
  const [createGroup, createGroupData] = useCreateGroupMutation();
  const classes = useStyles();

  const loggedIn = !!data && !!data.me;

  if (!loading && !loggedIn) navigate!('/');

  const handleCreateGroupButtonClick = () => {
    setOpen(true);
  };

  const handleCreateGroupDialogClose = () => {
    setOpen(false);
    setGroupName('');
  };

  const handleCreateGroupChange = (e: any) => {
    if (e.currentTarget.value.length > 100)
      setError('Group name must not be longer than 100 characters.');
    else setError('');
    setGroupName(e.currentTarget.value);
  };

  const handleCreateGroupDialogCreateButtonClick = () => {
    if (error) return;
    createGroup({ variables: { name: groupName } }).then((d) => {
      handleCreateGroupDialogClose();
      navigate!(`/dashboard/group/${d.data!.createGroup}`);
      refetch();
    });
  };

  return (
    <Layout>
      <Drawer classes={{ paper: classes.paper }} variant="permanent">
        <Toolbar />
        <Divider />
        <Grid container alignItems="center" className={classes.groupListHeader} justify="center">
          <Grid item>
            <div className={classes.groupListTitle}>Groups</div>
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              size={matches ? 'small' : 'medium'}
              startIcon={<AddIcon />}
              variant="contained"
              onClick={handleCreateGroupButtonClick}
            >
              Create Group
            </Button>
          </Grid>
          <Dialog
            fullWidth
            aria-labelledby="create-group-dialog-title"
            maxWidth="xs"
            open={open}
            onClose={handleCreateGroupDialogClose}
          >
            <DialogTitle id="create-group-dialog-title">Create Group</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                fullWidth
                color="secondary"
                error={!!error}
                helperText={error}
                id="name"
                label="Group Name"
                margin="dense"
                value={groupName}
                onChange={handleCreateGroupChange}
              />
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                disabled={createGroupData.loading}
                onClick={handleCreateGroupDialogClose}
              >
                Cancel
              </Button>
              <Button
                color="secondary"
                disabled={createGroupData.loading}
                onClick={handleCreateGroupDialogCreateButtonClick}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Divider />
        {loading && <div>Loading...</div>}
        {!loading && data && data.me && (
          <>
            {data.me.ownedGroups!.length !== 0 && (
              <>
                <Typography
                  color="secondary"
                  component="h6"
                  style={{ paddingLeft: 0, paddingTop: 10, fontSize: 14, textAlign: 'center' }}
                  variant="caption"
                >
                  My Groups:
                </Typography>
                <List>
                  {data!.me.ownedGroups!.map((group) => (
                    <ListItem
                      key={group.id}
                      button
                      className={classes.groupListItem}
                      component={Link as any}
                      selected={group.id === parseInt(id, 10)}
                      to={`/dashboard/group/${group.id}`}
                    >
                      <ListItemText primary={group.name} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
            {data.me.groups!.length !== 0 && (
              <>
                <Typography
                  color="secondary"
                  component="h6"
                  style={{ paddingLeft: 5 }}
                  variant="caption"
                >
                  Other Groups
                </Typography>
                <List>
                  {data.me.groups!.map((group) => (
                    <ListItem
                      key={group.id}
                      button
                      className={classes.groupListItem}
                      component={Link as any}
                      to={`/dashboard/group/${group.id}`}
                    >
                      <ListItemText primary={group.name} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </>
        )}
        {!loading && data!.me!.groups!.length === 0 && data!.me!.ownedGroups!.length === 0 && (
          <Typography color="secondary" component="h6" style={{ padding: 10 }} variant="caption">
            No Groups, <br />
            Add a group by <br />
            pressing the + button above
          </Typography>
        )}
      </Drawer>
      <Container className={classes.formListContainer} maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              {loading && <div>Loading...</div>}
              {!loading && (
                <Router>
                  <DashboardIndex path="/" />
                  <FormListPage path="group/:id" />
                  <CreateFormPage path="group/:id/form/create" />
                  <FormDataPage path="group/:gid/form/:fid" />
                  <AddDocumentPage path="group/:gid/form/:fid/add" />
                </Router>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default DashboardPage;
