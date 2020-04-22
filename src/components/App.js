import React, {useCallback} from 'react';
import api from '../lib/api';
import { Box, Container, Grid } from '@material-ui/core';
import { DiffTableContainer } from './diff-table/DiffTableContainer';
import { makeStyles } from '@material-ui/core/styles';

const fetchUserData = async () => await api.getUsersDiff();
const fetchProjectData = async () => await api.getProjectsDiff();

const useStyles = makeStyles({
  container: {
    backgroundColor: '#f5f5f5'
  }
});

export const App = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container} fixed>
      <Box data-testid="app-box" m={2}>
        <Grid container direction="column" spacing={8}>
          <Grid item>
            <DiffTableContainer type='user' fetchData={useCallback(fetchUserData, [])}/>
          </Grid>
          <Grid item>
            <DiffTableContainer type='project' fetchData={useCallback(fetchProjectData, [])}/>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
