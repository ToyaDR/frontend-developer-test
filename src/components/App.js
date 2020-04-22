import React, {useCallback} from 'react';
import api from '../lib/api';
import { Box, Container, Grid } from "@material-ui/core";
import {DiffTable} from "./diff-table/DiffTable";

const fetchUserData = async () => await api.getUsersDiff();
const fetchProjectData = async () => await api.getProjectsDiff();

export const App = () => {
  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
          <Grid container direction="column" spacing={8}>
              <Grid item>
                  <DiffTable type='user' fetchData={useCallback(fetchUserData, [])}/>
              </Grid>
              <Grid item>
                  <DiffTable type='project' fetchData={useCallback(fetchProjectData, [])}/>
              </Grid>
          </Grid>
      </Box>
    </Container>
  );
};

export default App;
