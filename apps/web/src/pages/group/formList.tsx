import React from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { RouteComponentProps } from '@reach/router';
import Grid from '@material-ui/core/Grid';
import Link from '../../components/Link';
import { useGroupQuery } from '../../graphql';

const FormList: React.FC<RouteComponentProps<{ id: string }>> = ({ id }) => {
  const { data, loading } = useGroupQuery({ variables: { groupId: parseInt(id!, 10) } });
  const group = data && data.group;
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <div style={{ padding: '10px 16px' }}>
        <Grid container alignContent="space-between" justify="space-between" spacing={3}>
          <Grid item>
            <Typography gutterBottom color="secondary" component="h2" variant="h6">
              {group && group.name} Forms
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="create form"
              component={Link as any}
              size="small"
              style={{ position: 'relative', top: 3 }}
              to={`/dashboard/group/${id}/form/create`}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
      {group && group.forms && group.forms.length !== 0 && (
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {group.forms.map((row) => (
              <TableRow key={row.id} hover style={{ cursor: 'pointer' }}>
                <TableCell>{row.displayName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {group && group.forms && group.forms.length === 0 && (
        <Typography
          gutterBottom
          color="textPrimary"
          component="p"
          style={{ padding: '10px 16px' }}
          variant="body1"
        >
          No forms, You can create a new form by pressing the + button above
        </Typography>
      )}
    </>
  );
};

export default FormList;
