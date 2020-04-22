import {TableCell, TableRow, Typography} from "@material-ui/core";
import React from "react";

export function TableRowError({ error, message }) {
    return error ? (
        <TableRow>
            <TableCell>
                <Typography>
                    {message}
                </Typography>
            </TableCell>
        </TableRow>
    ) : null
}