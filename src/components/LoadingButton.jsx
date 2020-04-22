import React from "react";
import { Button, CircularProgress } from "@material-ui/core";

export function LoadingButton(props) {
    const { loading, error, circularProgressProps, buttonProps } = props;
    return loading
        ? <CircularProgress {...circularProgressProps} />
        : <Button {...buttonProps} >{error ? 'Retry' : 'Load More'}</Button>
}