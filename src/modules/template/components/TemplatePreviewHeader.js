/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { RadioButtonGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { PreviewType } from '../templateOptions';
import { getPreviewType } from '../templateSelectors';
import handleRadioButtonChange from '../../../components/handlers/handleRadioButtonChange';
import styles from './TemplatePreviewHeader.module.css';


const TemplatePreviewHeader = ({ previewType, onPreviewTypeChange }) => (
  <div className={styles.header}>
    <span className={styles.headerTitle}>PDF preview</span>
    <div className={styles.headerOptions}>
      <label className={styles.headerLabel} aria-hidden="true">
        Preview template as
      </label>
      <RadioButtonGroup
        id="previewType"
        name="previewType"
        label="Preview template as"
        hideLabel
        value={previewType}
        className={styles.headerRadioGroup}
        options={Object.values(PreviewType)}
        inline
        onChange={handleRadioButtonChange(
          'previewType',
          onPreviewTypeChange,
        )}
      />
    </div>
  </div>
);

const mapStateToProps = state => ({
  previewType: getPreviewType(state),
});
export default connect(mapStateToProps)(TemplatePreviewHeader);
