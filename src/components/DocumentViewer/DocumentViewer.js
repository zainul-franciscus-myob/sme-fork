import React from 'react';
import classNames from 'classnames';

import styles from './DocumentViewer.module.css';

const getType = (type) => {
  const isEdge = navigator.userAgent.includes('Edge');

  return isEdge ? 'text/html' : type;
};

const DocumentViewer = ({
  src,
  title,
  className,
  type,
}) => (
  <embed
    className={classNames(styles.documentViewer, className)}
    src={src}
    title={title}
    type={getType(type)}
  />
);

export default DocumentViewer;
