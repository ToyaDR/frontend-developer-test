import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import { LoadingButton } from "../LoadingButton";

import { formatTimestamp } from "../../util/util";
import { initialState, reducer } from "./reducer";

const useStyles = makeStyles({
    tableHeaderFont: {
        fontSize: '0.875rem',
        fontWeight: '600',
    },
});

export function DiffTable({ type, fetchData }) {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [state, dispatch] = useReducer(reducer, null, initialState);

    const fetchDataCallback = useCallback(() => {
        const fetchDataAndHandleLoading = async () => {
            setError(null);
            setLoading(true);
            return await fetchData();
        };

        fetchDataAndHandleLoading()
            .then(({ data }) => dispatch({ type: 'updateData', data }))
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, [fetchData]);

    useEffect(() => fetchDataCallback(), [fetchDataCallback]);

    return (
        <Paper>
            <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell onClick={() => dispatch({ type: 'toggleSortAscending' })}>
                            <Typography className={classes.tableHeaderFont}>
                                Date
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography className={classes.tableHeaderFont}>
                                {type === 'user' ? 'User ID' : 'Project ID'}
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
                            <TableRow key={id}>
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
            <LoadingButton
                loading={loading}
                error={error}
                errorMessage="We had problems fetching your data. Please try again."
                buttonProps={{
                    onClick: fetchDataCallback,
                    variant: "contained",
                }}
            />
        </Paper>
    )
}