import React, { useCallback } from 'react';
import classNames from 'classnames';

import styles from './DocumentViewer.module.css';

const EdgeDocumentViewer = ({
  src,
  title,
  className,
}) => {
  const containerEl = useCallback((node) => {
    if (!node) {
      return;
    }

    if (!src) {
      return;
    }

    const object = document.createElement('object');
    object.setAttribute('class', styles.object);
    object.setAttribute('data', src);
    object.setAttribute('aria-label', title);
    object.setAttribute('type', 'text/html');
    object.setAttribute('height', node.clientHeight);
    object.setAttribute('width', node.clientWidth);

    node.appendChild(object);
  }, [src, title]);

  return (
    <div
      className={classNames(styles.container, className)}
      ref={containerEl}
    />
  );
};

export default EdgeDocumentViewer;
