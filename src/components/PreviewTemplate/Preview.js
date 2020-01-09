import React, { useEffect, useRef, useState } from 'react';

import styles from './Preview.module.css';

const getScale = (styleWidth, originalWidth) => {
  const scale = (parseFloat(styleWidth) - 32) / parseFloat(originalWidth);
  return scale > 1 ? 1 : scale;
};

const verticalPadding = '32px';

const originalWidth = '720px';

const Preview = ({ preview, previewHeader }) => {
  const [scale, setScale] = useState(null);
  const containerEl = useRef(null);
  const headerEl = useRef(null);
  const contentEl = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    if (containerEl) {
      const computedStyle = window.getComputedStyle(containerEl.current);
      const onResize = () => {
        setScale(getScale(computedStyle.width, originalWidth));
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
    return () => {};
  }, [preview]);

  useEffect(() => {
    if (headerEl && contentEl) {
      const headerStyle = window.getComputedStyle(headerEl.current);
      const contentStyle = window.getComputedStyle(contentEl.current);
      setContentHeight(contentStyle.height);
      setHeaderHeight(headerStyle.height);

      const onResize = () => {
        setHeaderHeight(headerStyle.height);
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
    return () => {};
  }, [preview]);

  const style = scale
    ? {
      transform: `scale(${scale})`,
      width: originalWidth,
    }
    : {};
  return (
    <div className={styles.container}>
      <div
        className={styles.previewContainer}
        style={{
          height: `calc(${contentHeight} * ${scale} + ${headerHeight} + ${verticalPadding} + 16px)`,
        }}
        ref={containerEl}
      >
        <div className={styles.header} ref={headerEl}>
          {previewHeader}
        </div>
        <div className={styles.preview} style={style} ref={contentEl}>
          {preview}
        </div>
      </div>
    </div>
  );
};

export default Preview;
