import { DropZone } from '@myob/myob-widgets';
import React from 'react';

import styles from './InTrayDropZone.module.css';

const InTrayDropZone = ({ onUpload }) => (
  <div className={styles.dropzone}>
    <DropZone onDrop={onUpload} onFileSelected={onUpload} />
    <div>
      <p>
        Your files need to be&nbsp;
        <strong>PDF</strong>
        ,&nbsp;
        <strong>TIFF</strong>
        ,&nbsp;
        <strong>JPEG</strong>
        &nbsp;or&nbsp;
        <strong>PNG</strong>
        &nbsp;and&nbsp;
        <strong>below 10MB</strong>.
      </p>
    </div>
  </div>
);

export default InTrayDropZone;
