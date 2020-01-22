import { Field, Input } from '@myob/myob-widgets';
import React, { useState } from 'react';

import styles from './ColorPicker.module.css';

const ColorPicker = ({
  label = '',
  value = '#000000',
  onChange,
  defaultColorIfBlack,
}) => {
  // defaultColorIfBlack is added to show a different color seleced in
  // the color picker on first load if the value supplied is black.
  // This is because a native color picker is unintuituve to use when
  // black is selected.

  const [showValue, shouldShowValue] = useState(!(defaultColorIfBlack && value === '#000000'));

  const handleColorChange = (e) => {
    shouldShowValue(true);
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
          <input className={styles.trigger} type="color" value={showValue ? value : defaultColorIfBlack} onChange={handleColorChange} />
          <div className={styles.palette} style={{ backgroundColor: value }} />
        </div>
      )}
    />
  );
};

export default ColorPicker;
