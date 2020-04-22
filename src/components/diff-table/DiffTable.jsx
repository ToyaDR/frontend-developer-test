import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import { TableRowError } from "../TableRowError";
import { LoadingButton } from "../LoadingButton";

import { formatTimestamp } from "../../util/util";
import { initialState, reducer } from "./reducer";

export function DiffTable({ type, fetchData }) {
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
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell onClick={() => dispatch({ type: 'toggleSortAscending' })}>
                            <Typography>
                                Date
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                {type === 'user' ? 'User ID' : 'Project ID'}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                Old value
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
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
                                        <Typography>
                                            {formatTimestamp(timestamp)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {diff
                                            ? diff.map(({field, oldValue}) => (
                                                <Typography key={`${id}-${field}-old`}>
                                                    {oldValue}
                                                </Typography>
                                            )) : null
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {diff
                                            ? diff.map(({field, newValue}) => (
                                                <Typography key={`${id}-${field}-new`}>
                                                    {newValue}
                                                </Typography>
                                            )) : null
                                        }
                                    </TableCell>
                                </TableRow>))
                    }
                    <TableRowError error={error} message="We had problems fetching your data. Please try again" />
                </TableBody>
            </Table>
            <LoadingButton
                loading={loading}
                error={error}
                buttonProps={{
                    onClick: fetchDataCallback,
                    variant: "contained",
                    color: "primary"
                }}
            />
        </TableContainer>
    )
}