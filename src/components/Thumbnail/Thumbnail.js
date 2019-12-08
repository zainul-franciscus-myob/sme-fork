import React from 'react';
import classNames from 'classnames';

import styles from './Thumbnail.module.css';

const Thumbnail = ({ isUploading, thumbnailUri, alt }) => {
  const thumbnailClass = classNames({
    [styles.thumbnail]: true,
    [styles.thumbnailEmpty]: isUploading,
  });

  return (
    <div className={thumbnailClass}>
      {thumbnailUri && <img src={thumbnailUri} alt={alt} />}
    </div>
  );
};

export default Thumbnail;
