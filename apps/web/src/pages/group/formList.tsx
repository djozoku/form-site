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
        <Grid container spacing={3} alignContent="space-between" justify="space-between">
          <Grid item>
            <Typography component="h2" variant="h6" color="secondary" gutterBottom>
              {group && group.name} Forms
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="create form"
              size="small"
              component={Link as any}
              to={`/dashboard/group/${id}/form/create`}
              style={{ position: 'relative', top: 3 }}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
      {group && group.forms && group.forms.length !== 0 && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {group.forms.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.displayName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {group && group.forms && group.forms.length === 0 && (
        <Typography component="p" variant="body1" color="textPrimary" gutterBottom>
          {/* TODO: write text about creating a new form */}
          {group && group.name} Forms
        </Typography>
      )}
    </>
  );
};

export default FormList;
