/* eslint-disable jsx-a11y/label-has-for */
import { Label, RadioButtonGroup } from '@myob/myob-widgets';
import React from 'react';

import styles from './TemplatePreviewHeader.module.css';

const TemplatePreviewHeader = () => (
  <div className={styles.header}>
    <span className={styles.header__title}>PDF preview</span>
    <div className={styles.header__options}>
      <Label>Preview template as</Label>
      <RadioButtonGroup
        id="previewType"
        name="previewType"
        label="Preview template as"
        hideLabel
        options={['Invoice', 'Quote', 'Statement']}
        className={styles.header__radioGroup}
        inline
        onChange={() => ({})}
      />
    </div>
  </div>
);

export default TemplatePreviewHeader;
