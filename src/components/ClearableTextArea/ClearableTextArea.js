import { Icons, TextArea } from '@myob/myob-widgets';
import React from 'react';

import styles from './ClearableTextArea.module.css';

const handleClear = (handler) => (e) => {
  e.preventDefault();
  handler();
};

const ClearableTextArea = ({
  name,
  placeholder,
  value,
  autoFocus,
  autoSize,
  rows,
  maxLength,
  onChange,
  onBlur,
  onClear,
}) => (
  <div className={styles.container}>
    <TextArea
      name={name}
      autoFocus={autoFocus}
      autoSize={autoSize}
      placeholder={placeholder}
      value={value}
      rows={rows}
      maxLength={maxLength}
      onChange={onChange}
      onBlur={onBlur}
    />
    <button
      type="button"
      tabIndex={-1}
      className={styles.clearButton}
      onMouseDown={handleClear(onClear)}
    >
      <Icons.Remove />
    </button>
  </div>
);

export default ClearableTextArea;
