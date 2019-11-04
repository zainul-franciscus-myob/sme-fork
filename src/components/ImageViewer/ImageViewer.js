import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import styles from './ImageViewer.module.css';

export const isElementContained = ({
  widthRatio,
  containerWidth,
  containerHeight,
  naturalHeight,
  naturalWidth,
}) => widthRatio * containerWidth / containerHeight <= naturalWidth / naturalHeight;

const ImageViewer = ({ mediaSrc, title, className }) => {
  const [openInViewer, setOpenInViewer] = useState(false);
  const [useFixedHeight, setUseFixedHeight] = useState(false);
  const closeViewer = () => setOpenInViewer(false);
  const openViewer = () => setOpenInViewer(true);

  const closeImageViewer = (event) => {
    event.preventDefault(); // disable tab on the help view while image viewer is open
    if (event.key === 'Escape' || event.code === 'Escape') {
      event.stopPropagation();
      setOpenInViewer(false);
    }
  };

  const imageViewerCloseRef = useCallback((node) => {
    if (node === null) return;
    node.focus();
    // Hotkeys-js is using native dom event to bind keypress event.
    // If we use React Synthetic event here, it would be called
    // after the global native keypress handler get called
    // TODO: refactor the following line after we have a better way to handle global keypress event
    node.addEventListener('keydown', closeImageViewer);
  }, []);

  const imageRef = useCallback((node) => {
    if (node === null) return;
    const { naturalHeight, naturalWidth } = node;
    const { innerWidth: containerWidth, innerHeight: containerHeight } = window;

    const widthRatio = Number.parseFloat(styles.imageDisplayRatio) * 0.01;
    const shouldUseFixHeight = !isElementContained({
      widthRatio,
      containerWidth,
      containerHeight,
      naturalHeight,
      naturalWidth,
    });
    setUseFixedHeight(shouldUseFixHeight);
  }, []);

  const viewer = openInViewer && (
    <div role="dialog" className={styles.imageViewer}>
      <button
        ref={imageViewerCloseRef}
        type="button"
        className={styles.imageViewer__close}
        onClick={closeViewer}
      >
        <img
          src={mediaSrc}
          alt={title}
          ref={imageRef}
          className={
            classNames(
              { [styles['image--fixed-height']]: useFixedHeight },
              { [styles['image--fixed-width']]: !useFixedHeight },
            )
          }
        />
      </button>
    </div>
  );

  const clickableImage = (
    <button
      type="button"
      className={classNames(className, styles.clickableImage)}
      onClick={openViewer}
    >
      <img src={mediaSrc} alt={title} />
    </button>
  );

  return (
    <React.Fragment>
      {clickableImage}
      {viewer}
    </React.Fragment>
  );
};

export default ImageViewer;
