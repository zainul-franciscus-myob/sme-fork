import { Field, Input } from '@myob/myob-widgets';
import React from 'react';

import styles from './ColorPicker.module.css';

const ColorPicker = ({
  label = '',
  value = '#000000',
  onChange,
}) => {
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    if (onChange) {
      onChange(newColor);
    }
  };

  return (
    <Field
      label={label}
      renderField={() => (
        <div className={styles.container}>
          <Input value={value} maxLength={7} onChange={handleColorChange} />
          <input className={styles.trigger} type="color" value={value} onChange={handleColorChange} />
          <div className={styles.palette} style={{ backgroundColor: value }} />
        </div>
      )}
    />
  );
};

export default ColorPicker;
