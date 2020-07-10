import { DropZone, Table } from '@myob/myob-widgets';
import React from 'react';

import styles from './InTrayDropzoneTableRow.module.css';

const InTrayDropzoneTableRow = ({ onAddAttachment }) => (
  <Table.Row className={styles.dropzone}>
    <DropZone onDrop={onAddAttachment} onFileSelected={onAddAttachment} />
    <div>
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
    </div>
  </Table.Row>
);

export default InTrayDropzoneTableRow;
