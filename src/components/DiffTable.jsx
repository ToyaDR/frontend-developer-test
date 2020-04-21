import React, {useCallback, useEffect, useState} from 'react';
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

export function DiffTable({ type, fetchData }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDataCallback = useCallback(() => {
        const fetchDataAndHandleLoading = async () => {
            setError(null);
            setLoading(true);
            return await fetchData();
        };

        fetchDataAndHandleLoading()
            .then(({ data }) => setData(existingData => existingData.concat(data)))
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, [fetchData]);

    useEffect(() => fetchDataCallback(), [fetchDataCallback]);

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
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
                    { data
                        ? data.map(({ id, timestamp, diff }) => (
                            <TableRow key={id}>
                                <TableCell>
                                    <Typography>
                                        {timestamp}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {diff
                                        ? diff.map(({ field, oldValue }) => (
                                            <Typography key={`${id}-${field}-old`}>
                                                {oldValue}
                                            </Typography>
                                        )) : null
                                    }
                                </TableCell>
                                <TableCell>
                                    {diff
                                        ? diff.map(({ field, newValue }) => (
                                            <Typography key={`${id}-${field}-new`}>
                                                {newValue}
                                            </Typography>
                                        )) : null
                                    }
                                </TableCell>
                            </TableRow>
                        )) : []
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