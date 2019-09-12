import { FileBrowser, Icons } from '@myob/myob-widgets';
import React from 'react';

import styles from './SpendMoneyFileBrowser.module.css';

const SpendMoneyFileBrowser = ({
  accept,
  onAddAttachments,
}) => (
  <div className={styles.browseFiles}>
    <Icons.Upload set="lg" />
    <FileBrowser
      onFileSelected={onAddAttachments}
      buttonType="link"
      buttonLabel="Browse for files"
      accept={accept}
      multiple
    />
  </div>
);

export default SpendMoneyFileBrowser;
