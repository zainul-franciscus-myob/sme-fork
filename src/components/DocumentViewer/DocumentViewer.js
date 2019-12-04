import React from 'react';
import classnames from 'classnames';

import styles from './DocumentViewer.module.css';

const DocumentViewer = ({
  src,
  title,
  className,
}) => (
  <object
    className={classnames(styles.documentViewer, className)}
    data={src}
    aria-label={title}
  />
);

export default DocumentViewer;
