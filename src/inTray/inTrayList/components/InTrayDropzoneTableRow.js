import { DropZone, Table } from '@myob/myob-widgets';
import React from 'react';

import styles from './InTrayDropzoneTableRow.module.css';

const InTrayDropzoneTableRow = ({ onAddAttachment }) => (
  <Table.Row className={styles.dropzone}>
    <DropZone
      onDrop={onAddAttachment}
      onFileSelected={onAddAttachment}
    />
  </Table.Row>
);


export default InTrayDropzoneTableRow;
