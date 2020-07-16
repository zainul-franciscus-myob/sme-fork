import { Card, DropZone } from '@myob/myob-widgets';
import React from 'react';

import styles from './DropZoneCardBody.module.css';

const DropZoneCardBody = ({ children, onDrop, onFileSelected }) => (
  <Card.Body
    classes={[styles.cardBody]}
    child={
      <div className={styles.dropZone}>
        <DropZone onDrop={onDrop} onFileSelected={onFileSelected}>
          {children}
        </DropZone>
      </div>
    }
  />
);
export default DropZoneCardBody;
