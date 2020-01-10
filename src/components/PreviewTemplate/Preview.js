import React, { useEffect, useRef, useState } from 'react';

import styles from './Preview.module.css';

const containerHorizontalPadding = parseFloat(styles.containerPadding) * 2;
const previewHorizontalPadding = parseFloat(styles.previewPadding) * 2;
const previewVerticalPadding = parseFloat(styles.previewPadding) * 2;

function calcScale(containerEl, previewOriginalWidth) {
  const containerWidth = parseFloat(window.getComputedStyle(containerEl.current).width);
  const spaceAvailableForPreview = containerWidth - containerHorizontalPadding;
  const spaceRequiredForPreview = previewOriginalWidth + previewHorizontalPadding;
  return spaceAvailableForPreview / spaceRequiredForPreview;
}

const Preview = ({
  preview,
  previewHeader,
  previewRatio = 1.41,
  previewOriginalWidth = 688,
}) => {
  const [scale, setScale] = useState(null);
  const containerEl = useRef(null);
  const headerEl = useRef(null);
  const contentEl = useRef(null);

  useEffect(() => {
    if (containerEl) {
      setScale(calcScale(containerEl, previewOriginalWidth));
      const onResize = () => {
        setScale(calcScale(containerEl, previewOriginalWidth));
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
    return () => {};
  }, [previewOriginalWidth, preview]);

  const previewOriginalHeight = previewOriginalWidth * previewRatio + previewVerticalPadding;

  const style = scale
    ? {
      transform: `scale(${scale})`,
      width: `calc(${previewOriginalWidth}px + ${previewHorizontalPadding}px)`,
      height: `${previewOriginalHeight}px`,
    }
    : {};
  const previewHeight = previewOriginalHeight * scale;
  return (
    <div className={styles.container}>
      <div
        className={styles.previewContainer}
        ref={containerEl}
      >
        <div className={styles.header} ref={headerEl}>
          {previewHeader}
        </div>
        <div style={{
          height: `${previewHeight}px`,
        }}
        >
          <div className={styles.preview} style={style} ref={contentEl}>
            {preview}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
