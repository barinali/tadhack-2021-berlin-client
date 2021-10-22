import * as React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function FileUploadButton({ onChange, disabled }) {
  const changeHandler = (event) => {
    onChange(event);

    event.target.value = '';
  }

  return (
    <Button
      variant="contained"
      component="label"
      disabled={disabled}
      endIcon={disabled ? <CircularProgress size={24} /> : null}
    >
      Upload File
      <input
        onChange={changeHandler}
        type="file"
        hidden
      />
    </Button>
  );
}
