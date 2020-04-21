import React, {useEffect, useState} from 'react';
import api from '../lib/api';
import { Box, Container } from "@material-ui/core";
import {DiffTable} from "./DiffTable";

const fetchUserData = async () => await api.getUsersDiff();
const fetchProjectData = async () => await api.getProjectsDiff();

export const App = () => {
  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
          <DiffTable type='user' fetchData={fetchUserData}/>
          <DiffTable type='project' fetchData={fetchProjectData}/>
      </Box>
    </Container>
  );
};

export default App;
