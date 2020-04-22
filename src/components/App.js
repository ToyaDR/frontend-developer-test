import React, {useCallback} from 'react';
import api from '../lib/api';
import { Box, Container } from "@material-ui/core";
import {DiffTable} from "./DiffTable";

const fetchUserData = async () => await api.getUsersDiff();
const fetchProjectData = async () => await api.getProjectsDiff();

export const App = () => {
  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
          <DiffTable type='user' fetchData={useCallback(fetchUserData, [])}/>
          <DiffTable type='project' fetchData={useCallback(fetchProjectData, [])}/>
      </Box>
    </Container>
  );
};

export default App;
