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

function createData(id: number, name: string, amount?: number) {
  return { id, name, amount };
}

const forms = [
  createData(0, 'Form1', 312),
  createData(1, 'Form2', 866),
  createData(2, 'Form3', 100),
  createData(3, 'Form4', 654),
  createData(4, 'Form5', 212)
];

const FormList: React.FC<RouteComponentProps<{ id: string }>> = ({ id }) => {
  const { data, loading } = useGroupQuery({ variables: { groupId: parseInt(id!, 10) } });
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <div style={{ padding: '10px 16px' }}>
        <Grid container spacing={3} alignContent="space-between" justify="space-between">
          <Grid item>
            <Typography component="h2" variant="h6" color="secondary" gutterBottom>
              {data && data.group && data.group.name} Forms
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
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Documents</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forms.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default FormList;
