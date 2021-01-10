import { DropZone } from '@myob/myob-widgets';
import React from 'react';
import classnames from 'classnames';

import styles from './DropZoneHorizontal.module.css';

const DropZoneHorizontal = ({ onUpload, className, ...props }) => (
  <div className={classnames(styles.dropZoneHorizontal, className)}>
    <DropZone onDrop={onUpload} onFileSelected={onUpload} {...props} />
  </div>
);

export default DropZoneHorizontal;
