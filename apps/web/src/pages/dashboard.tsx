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
import { makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import Link from '../components/Link';
import Layout from '../Layout';
import { useMeQuery, useCreateGroupMutation } from '../graphql';
import DashboardIndex from './dashboard/info';
import CreateGroupPage from './group/createGroup';
import FormListPage from './group/formList';
import CreateFormPage from './form/createForm';
import FormDataPage from './form/formData';

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
    groupListItem: {
      [theme.breakpoints.up('md')]: {
        paddingLeft: 26,
        paddingRight: 26
      }
    },
    formListContainer: {
      [theme.breakpoints.up('md')]: {
        paddingLeft: 200
      }
    }
  })
);
// TODO: responsive
const DashboardPage: React.FC<RouteComponentProps> = ({ navigate }) => {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
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
    setGroupName(e.currentTarget.value);
  };

  const handleCreateGroupDialogCreateButtonClick = () => {
    createGroup({ variables: { name: groupName } }).then((d) => {
      handleCreateGroupDialogClose();
      navigate!(`/dashboard/group/${d.data!.createGroup}`);
      refetch();
    });
  };

  return (
    <Layout>
      <Drawer variant="permanent">
        <Toolbar />
        <Divider />
        <div className={classes.groupListTitle}>
          Groups
          <IconButton
            aria-label="create group"
            size="small"
            color="secondary"
            style={{ position: 'relative', left: 10, top: -1 }}
            onClick={handleCreateGroupButtonClick}
          >
            <AddIcon />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleCreateGroupDialogClose}
            aria-labelledby="create-group-dialog-title"
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle id="create-group-dialog-title">Create Group</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Group Name"
                fullWidth
                color="secondary"
                onChange={handleCreateGroupChange}
                value={groupName}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCreateGroupDialogClose}
                color="secondary"
                disabled={createGroupData.loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateGroupDialogCreateButtonClick}
                color="secondary"
                disabled={createGroupData.loading}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Divider />
        {loading && <div>Loading...</div>}
        {!loading && data && data.me && (
          <>
            {data.me.ownedGroups && (
              <>
                <Typography
                  component="h6"
                  variant="caption"
                  color="secondary"
                  style={{ paddingLeft: 0, paddingTop: 10, fontSize: 14, textAlign: 'center' }}
                >
                  My Groups:
                </Typography>
                <List>
                  {data!.me.ownedGroups!.map((group: any) => (
                    <ListItem
                      button
                      key={group.id}
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
            {data.me.groups!.length !== 0 && (
              <>
                <Typography
                  component="h6"
                  variant="caption"
                  color="secondary"
                  style={{ paddingLeft: 5 }}
                >
                  Other Groups
                </Typography>
                <List>
                  {data!.me.groups!.map((group: any) => (
                    <ListItem
                      button
                      key={group.id}
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
        {!loading && !data && (
          <Typography component="h6" variant="caption" color="secondary" style={{ padding: 10 }}>
            No Groups,
            <br />
            Add a group by <br />
            clicking the + symbol above
          </Typography>
        )}
      </Drawer>
      <Container maxWidth="lg" className={classes.formListContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              {loading && <div>Loading...</div>}
              {!loading && (
                <Router>
                  <DashboardIndex path="/" />
                  <CreateGroupPage path="group/create" />
                  <FormListPage path="group/:id" />
                  <CreateFormPage path="group/:id/form/create" />
                  <FormDataPage path="group/:gid/form/:fid" />
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
