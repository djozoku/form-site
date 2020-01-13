import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

import { FormDataDisplay } from '@form/interfaces/types/FormData';

import Button from '@material-ui/core/Button';
import { useFormQuery, useGetFormDataQuery, useGetFormDataDisplaysQuery } from '../../graphql';

const FormDataPage: React.FC<RouteComponentProps<{ gid: string; fid: string }>> = ({
  gid,
  fid,
  navigate
}) => {
  const variables = {
    variables: { gid: parseInt(gid!, 10), fid: parseInt(fid!, 10) }
  };
  const formQuery = useFormQuery({ variables: { id: parseInt(fid!, 10) } });
  const formDataQuery = useGetFormDataQuery(variables);
  const formDataDisplaysQuery = useGetFormDataDisplaysQuery(variables);
  if (formQuery.loading || formDataQuery.loading || formDataDisplaysQuery.loading)
    return <div>Loading...</div>;
  const form = formQuery && formQuery.data && formQuery.data.form;
  const formData: any[] = JSON.parse(
    (formDataQuery && formDataQuery.data && formDataQuery.data.getFormData) || ''
  );
  const formDataDisplays: FormDataDisplay[] = JSON.parse(
    (formDataDisplaysQuery &&
      formDataDisplaysQuery.data &&
      formDataDisplaysQuery.data.getFormDataDisplays) ||
      ''
  );
  return (
    <>
      <div style={{ padding: '10px 16px' }}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography gutterBottom color="secondary" component="h2" variant="h6">
              {form && form.displayName}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => {
                navigate!(`/dashboard/group/${gid}/form/${fid}/add`);
              }}
            >
              Add Document
            </Button>
          </Grid>
        </Grid>
      </div>
      <Table size="medium">
        <TableBody>
          {formData.map((row, i) => (
            <TableRow key={formDataDisplays[i].name}>
              <TableCell>{formDataDisplays[i].displayName}</TableCell>
              <TableCell align="right">{row[formDataDisplays[i].name]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default FormDataPage;
