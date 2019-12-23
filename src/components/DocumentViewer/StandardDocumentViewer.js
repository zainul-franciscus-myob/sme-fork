import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import styles from './DocumentViewer.module.css';

const StandardDocumentViewer = ({
  src,
  type,
  title,
  className,
}) => {
  const [size, setSize] = useState({
    height: 0,
    width: 0,
  });

  const containerEl = useCallback((node) => {
    if (!node) {
      return;
    }

    setSize({
      height: node.clientHeight,
      width: node.clientWidth,
    });
  }, []);

  return (
    <div
      className={classNames(styles.container, className)}
      ref={containerEl}
    >
      <object
        className={styles.object}
        data={src}
        aria-label={title}
        type={type}
        height={size.height}
        width={size.width}
      />
    </div>
  );
};

export default StandardDocumentViewer;
