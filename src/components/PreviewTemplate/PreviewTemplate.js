import { BaseTemplate } from '@myob/myob-widgets';
import React from 'react';

import Details from './Details';
import Preview from './Preview';
import styles from './PreviewTemplate.module.css';

const PreviewTemplate = ({
  details,
  pageHead,
  preview,
  previewHeader,
  previewRatio,
  previewOriginalWidth,
  alert,
}) => (
  <BaseTemplate>
    {alert}
    {pageHead}
    <div className={styles.container}>
      <Details details={details} />
      <Preview
        preview={preview}
        previewHeader={previewHeader}
        previewRatio={previewRatio}
        previewOriginalWidth={previewOriginalWidth}
      />
    </div>
  </BaseTemplate>
);

export default PreviewTemplate;
