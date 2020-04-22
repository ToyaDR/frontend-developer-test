import React, { useReducer }  from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@material-ui/core';
import { initialState, reducer } from './reducer';

import { formatTimestamp } from '../../util/util';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  tableHeaderFont: {
    fontSize: '0.875rem',
    fontWeight: '600',
  },
});

export function DiffTable({ values, variant }) {
  const classes = useStyles();

  const [state, dispatch] = useReducer(reducer, values, initialState);

  // using React.useEffect rather than importing useEffect directly here for testing purposes
  React.useEffect(() => dispatch({ type: 'updateData', data: values }), [values]);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={state.sortState === 'date'}
                direction={state.sortAscending ? 'asc' : 'desc'}
                onClick={() => {
                  if (state.sortState === 'date') {
                    dispatch({ type: 'toggleSortAscending' });
                  } else {
                    dispatch({ type: 'setSortState', sortState: 'date'});
                  }
                }}
              >
                <Typography className={classes.tableHeaderFont}>
                  Date
                </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <Typography className={classes.tableHeaderFont}>
                {variant === 'user' ? 'User ID' : 'Project ID'}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.tableHeaderFont}>
                Old value
              </Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.tableHeaderFont}>
                New value
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            state.data.map(({ id, timestamp, diff }) => (
              <TableRow key={id} data-testid="diff-table-body-row">
                <TableCell>
                  <Typography variant="subtitle2">
                    {formatTimestamp(timestamp)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    {id}
                  </Typography>
                </TableCell>
                <TableCell>
                  {diff
                    ? diff.map(({field, oldValue}) => (
                      <Typography key={`${id}-${field}-old`} variant="subtitle2">
                        {oldValue}
                      </Typography>
                    )) : null
                  }
                </TableCell>
                <TableCell>
                  {diff
                    ? diff.map(({field, newValue}) => (
                      <Typography key={`${id}-${field}-new`} variant="subtitle2">
                        {newValue}
                      </Typography>
                    )) : null
                  }
                </TableCell>
              </TableRow>)
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DiffTable.propTypes = {
  variant: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    diff: PropTypes.arrayOf(PropTypes.shape({
      field: PropTypes.string.isRequired,
      oldValue: PropTypes.string.isRequired,
      newValue: PropTypes.string.isRequired,
    })),
  })),
};

DiffTable.defaultProps = {
  values: [],
};