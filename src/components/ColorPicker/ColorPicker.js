import { Field, Input } from '@myob/myob-widgets';
import React, { useState } from 'react';

import styles from './ColorPicker.module.css';

const ColorPicker = ({
  label = '',
  value = '#000000',
  onChange,
}) => {
  const [color, setColor] = useState(value);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    if (onChange) {
      onChange(newColor);
    }
  };

  return (
    <Field
      label={label}
      renderField={() => (
        <div className={styles.container}>
          <Input value={color} maxLength={7} onChange={handleColorChange} />
          <input className={styles.trigger} type="color" value={color} onChange={handleColorChange} />
          <div className={styles.palette} style={{ backgroundColor: color }} />
        </div>
      )}
    />
  );
};

export default ColorPicker;
