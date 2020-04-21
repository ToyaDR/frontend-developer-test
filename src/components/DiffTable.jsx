import React, {useEffect, useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";

export function DiffTable({ type, fetchData }) {
    const [data, setData] = useState(null);
    const fetchDataAndSet = () => fetchData()
        .then(({ data }) => setData(data))
        .catch(error => error);

    useEffect(() => { fetchDataAndSet() }, []);
    console.log("DATA: " + JSON.stringify(data));
    return (
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
                    ? data.map(({
                                    id,
                                    timestamp,
                                    diff,
                                }) => (
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
            </TableBody>
        </Table>
    )
}