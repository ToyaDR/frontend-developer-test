import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { LoadingButton } from './LoadingButton';
import { DiffTable } from './diff-table/DiffTable';

export function DiffTableContainer({ variant, fetchData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const fetchDataCallback = useCallback(() => {
    const fetchDataAndHandleLoading = async () => {
      setError(false);
      setLoading(true);
      return await fetchData();
    };

    fetchDataAndHandleLoading()
      .then(({ data: newData }) => setData(existingData => existingData.concat(newData)))
      .catch(error => {
        console.error(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [fetchData]);

  // using React.useEffect rather than importing useEffect directly here for testing purposes
  React.useEffect(() => fetchDataCallback(), [fetchDataCallback]);

  return (
    <Paper>
      <DiffTable data-testid="diff-table" values={data} variant={variant} />
      <LoadingButton
        data-testid="loading-button"
        loading={loading}
        error={error}
        errorMessage="We had problems fetching your data. Please try again."
        buttonProps={{
          onClick: fetchDataCallback,
          variant: 'contained',
        }}
      />
    </Paper>
  );
}

DiffTableContainer.propTypes = {
  variant: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
};