import React from "react";
import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
                    ? <CircularProgress {...circularProgressProps} className={classes.circularProgress} />
                    : null }
            </Grid>
            <Grid item>
                { (!loading && error)
                    ? (
                        <Typography variant="subtitle2" color="error">
                            {errorMessage}
                        </Typography>
                    ) : null }
            </Grid>
            <Grid item>
                { !loading
                    ? (
                        <Button {...buttonProps} className={classes.button} >
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