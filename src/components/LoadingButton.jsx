import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  grid: {
    padding: '8px',
  },
  button: {
    backgroundColor: '#03a9f4',
    color: '#ffffff',
    textTransform: 'initial',
  },
  circularProgress: {
    color: '#03a9f4',
  },
});

export function LoadingButton({ loading, error, errorMessage, circularProgressProps, buttonProps }) {
  const classes = useStyles();
  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      spacing={2}
      className={classes.grid}
    >
      <Grid item>
        { loading
          ? <CircularProgress
            {...circularProgressProps}
            className={classes.circularProgress}
            data-testid='circular-progress'
          />
          : null }
      </Grid>
      <Grid item>
        { (!loading && error)
          ? (
            <Typography variant="subtitle2" color="error" data-testid='error-message'>
              {errorMessage}
            </Typography>
          ) : null }
      </Grid>
      <Grid item>
        { !loading
          ? (
            <Button {...buttonProps} className={classes.button} data-testid='loading-button'>
              <Typography variant="subtitle2">
                {error ? 'Retry' : 'Load more'}
              </Typography>
            </Button>
          ) : null
        }
      </Grid>
    </Grid>
  );
}

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  circularProgressProps: PropTypes.object,
  buttonProps: PropTypes.object,
};

LoadingButton.defaultProps = {
  loading: false,
  error: false,
  errorMessage: 'An error occurred.',
  circularProgressProps: {},
  buttonProps: {},
};