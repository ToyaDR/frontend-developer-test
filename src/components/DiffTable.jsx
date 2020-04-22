import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import {formatTimestamp } from "../util/util";

const sortByDate = (sortAscending) => ({ timestamp: date1 }, { timestamp: date2 }) => {
    if (sortAscending) {
        if (date1 < date2) { return -1; }
        else if (date1 === date2) { return 0; }
        else { return 1; }
    } else {
        if (date2 < date1) { return -1; }
        else if (date1 === date2) { return 0; }
        else { return 1; }
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'updateData':
            const updatedData = state.data.concat(action.data);
            updatedData.sort(sortByDate(state.sortAscending));
            return {
                data: updatedData,
            };
        case 'toggleSortAscending':
            return {
                sortAscending: !state.sortAscending,
                data: state.data.sort(sortByDate(!state.sortAscending)),
            };
        default:
            throw new Error();
    }
}
function initialState() {
    return {
        data: [],
        sortAscending: false,
    };
}

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
                    {
                        error
                        ? (
                            <TableRow>
                                <TableCell>
                                    <Typography>
                                        We had problems fetching your data. Please try again.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            ) : null
                    }
                </TableBody>
            </Table>
            {
                loading
                    ? (
                        <CircularProgress />
                    ) : (
                        <Button onClick={fetchDataCallback}>
                            {error ? 'Retry' : 'Load More'}
                        </Button>
                    )
            }
        </TableContainer>
    )
}