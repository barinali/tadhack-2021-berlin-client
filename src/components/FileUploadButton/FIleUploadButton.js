import * as React from 'react';
import Button from '@mui/material/Button';

export default function FileUploadButton({ onChange }) {
  const changeHandler = (event) => {
    onChange(event);

    // to clear the file input
    event.target.value = '';
  }

  return (
    <Button
      variant="contained"
      component="label"
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
