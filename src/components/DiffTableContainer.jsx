import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { LoadingButton } from './LoadingButton';
import { DiffTable } from './diff-table/DiffTable';

export function DiffTableContainer({ type, fetchData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchDataCallback = useCallback(() => {
    const fetchDataAndHandleLoading = async () => {
      setError(null);
      setLoading(true);
      return await fetchData();
    };

    fetchDataAndHandleLoading()
      .then(({ data: newData }) => setData(existingData => existingData.concat(newData)))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [fetchData]);

  useEffect(() => fetchDataCallback(), [fetchDataCallback]);

  return (
    <Paper>
      <DiffTable values={data} type={type} />
      <LoadingButton
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
  type: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
};