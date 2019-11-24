import React from 'react';
import { RouteComponentProps, navigate, Router } from '@reach/router';
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

import Link from '../components/Link';
import Layout from '../Layout';
import { useMeQuery } from '../graphql';
import DashboardIndex from './dashboard/info';
import CreateGroupPage from './group/createGroup';
import FormListPage from './group/formList';
import CreateFormPage from './form/createForm';
import FormDataPage from './form/formData';

function createData(id: number, name: string, amount?: number) {
  return { id, name, amount };
}

const groups = [
  createData(0, 'Group1'),
  createData(1, 'Group2'),
  createData(2, 'Group3'),
  createData(3, 'Group4'),
  createData(4, 'Group5'),
  createData(5, 'Group6'),
  createData(6, 'Group7')
];

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
        paddingLeft: 26
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
const DashboardPage: React.FC<RouteComponentProps> = () => {
  const { data, loading } = useMeQuery();
  const loggedIn = data && data.me;
  const classes = useStyles();
  if (!loading && !loggedIn) navigate('/');
  if (loading) return <Layout>Loading...</Layout>;
  return (
    <Layout>
      <Drawer variant="permanent">
        <Toolbar />
        <Divider />
        <div className={classes.groupListTitle}>
          Groups
          <IconButton
            aria-label="create"
            size="small"
            style={{ position: 'relative', left: 10, top: -1 }}
            component={Link as any}
            to="/dashboard/group/create"
          >
            <AddIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {groups.map((group) => (
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
      </Drawer>
      <Container maxWidth="lg" className={classes.formListContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <Router>
                <DashboardIndex path="/" />
                <CreateGroupPage path="group/create" />
                <FormListPage path="group/:id" />
                <CreateFormPage path="group/:id/form/create" />
                <FormDataPage path="group/:gid/form/:fid" />
              </Router>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default DashboardPage;
