import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './DocumentViewer.module.css';

const isEdge = () => navigator.userAgent.includes('Edge');
// copy from http://browserhacks.com/
const isSafari = () => !!navigator.userAgent.match(/safari/i)
  && !navigator.userAgent.match(/chrome/i)
  && typeof document.body.style.webkitFilter !== 'undefined'
  && !window.chrome;

const getType = (type) => {
  if (isEdge()) return 'text/html';
  if (isSafari()) return '';
  return type;
};

const DocumentViewer = ({
  src, title, className, type,
}) => {
  /**
   * We neet to force embed to rerender when src changed.
   * On safari, the prop change won't refresh the embed component.
   */
  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey(k => k + 1);
  }, [src]);

  return (
    <embed
      className={classNames(
        styles.documentViewer,
        className,
        {
          [styles.onSafari]: isSafari(),
        },
      )}
      key={key}
      src={src}
      title={title}
      type={getType(type)}
    />
  );
};

export default DocumentViewer;
