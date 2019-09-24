import { FileBrowser } from '@myob/myob-widgets';
import React from 'react';

const InTrayFileBrowser = ({
  buttonType,
  buttonLabel,
  onFileSelected,
}) => (
  <FileBrowser
    onFileSelected={onFileSelected}
    buttonType={buttonType}
    buttonLabel={buttonLabel}
    accept=".pdf, .tiff, .tif, .jpeg, .jpg, .png"
    multiple
  />
);

export default InTrayFileBrowser;
