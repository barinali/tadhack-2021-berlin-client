import * as React from 'react';
import Button from '@mui/material/Button';

export default function FileUploadButton({ onChange }) {
  return (
    <Button
      variant="contained"
      component="label"
    >
      Upload File
      <input
        onChange={onChange}
        type="file"
        hidden
      />
    </Button>
  );
}
