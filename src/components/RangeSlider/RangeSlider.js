import { Field } from '@myob/myob-widgets';
import React, { useState } from 'react';

import styles from './RangeSlider.module.css';

const RangeSlider = ({
  min = 0,
  max = 100,
  value = 0,
  label = '',
  onChange,
}) => {
  const [rangeValue, setRangeValue] = useState(value);
  const widthOfRangeValue = `${rangeValue * 1}%`;
  const handleSlide = (e) => {
    const newValue = e.target.value;
    setRangeValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <Field
      label={label}
      renderField={() => (
        <div className={styles.container}>
          <div className={styles.range}>
            <span className={styles.rangeValue} style={{ width: widthOfRangeValue }} />
            <input
              className={styles.rangeSlide}
              type="range"
              min={min}
              max={max}
              value={rangeValue}
              onChange={handleSlide}
            />
          </div>
          <div className={styles.meter}>
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>
      )}
    />
  );
};

export default RangeSlider;
