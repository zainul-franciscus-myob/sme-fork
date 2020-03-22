import { Input } from '@myob/myob-widgets';
import React, { useState } from 'react';
import shortid from 'shortid';

import {
  addCommasInPlace,
  addDecimalPlaces,
  formatValue,
  removeCommas,
} from './formatter';
import areValuesEqual from './areValuesEqual';
import copyEventWithValue from '../autoFormatter/AmountInput/copyEventWithValue';
import createValidator from './validate';
import evaluate from './evaluate';
import isCalculableExpression from './isCalculableExpression';
import styles from './Calculator.module.css';

const CalculatorTooltip = ({ value, width }) => {
  const tooltipStyle = { width };
  const tooltipTextStyle = { maxWidth: width };

  return (
    <div style={tooltipStyle} className={styles.tooltip}>
      <span style={tooltipTextStyle} className={styles.tooltipText}>
        {`= ${evaluate(removeCommas(value))}`}
      </span>
      <div className={styles.arrowDown} />
    </div>
  );
};

const onWrappedBlur = ({
  setCurrValue,
  onChange,
  onBlur,
  setIsActive,
  numeralDecimalScaleMin,
  numeralDecimalScaleMax,
}) => (e) => {
  const { value } = e.target;

  const parsedValue = evaluate(removeCommas(value));
  const formattedValue = formatValue(
    parsedValue,
    numeralDecimalScaleMin,
    numeralDecimalScaleMax,
  );

  // Trigger setCurrValue to update value visible to user
  setCurrValue(formattedValue);

  const valueWithDecimalPlaces = addDecimalPlaces(
    parsedValue,
    numeralDecimalScaleMin,
    numeralDecimalScaleMax,
  );
  const event = copyEventWithValue(e, valueWithDecimalPlaces);

  // Trigger onChange to give parsed value to parent
  if (value) {
    onChange(event);
  }

  onBlur(event);

  // Stop showing calculator tooltip
  setIsActive(false);
};

const onWrappedOnChange = ({
  setCurrValue,
  setIsActive,
  validate,
  onChange,
}) => (e) => {
  const { value } = e.target;
  const isValidValue = validate(value);

  if (isValidValue) {
    const event = copyEventWithValue(e, value);
    setCurrValue(addCommasInPlace(value));
    onChange(event);
    setIsActive(isCalculableExpression(value));
  }
};

const Calculator = ({
  id: propId,
  name,
  label,
  hideLabel,
  value,
  onBlur,
  onChange,
  numeralDecimalScaleMin = 0,
  numeralDecimalScaleMax = 2,
  numeralIntegerScale,
  className,
  disabled,
}) => {
  const formattedValue = formatValue(
    value,
    numeralDecimalScaleMin,
    numeralDecimalScaleMax,
  );
  // eslint-disable-next-line no-unused-vars
  const [id, _] = useState(shortid.generate());
  const [currValue, setCurrValue] = useState(formattedValue);
  const [target, setTarget] = useState(null);
  const [isActive, setIsActive] = useState(false);

  if (!areValuesEqual(currValue, value)) {
    setCurrValue(formattedValue);
  }

  const validate = createValidator({ numeralIntegerScale });
  const onCalculatorChange = onWrappedOnChange({
    setCurrValue,
    setIsActive,
    onChange,
    validate,
  });
  const onCalculatorBlur = onWrappedBlur({
    setCurrValue,
    onChange,
    onBlur,
    setIsActive,
    numeralDecimalScaleMin,
    numeralDecimalScaleMax,
  });

  const elementId = propId || id;
  const width = target ? target.offsetWidth : 0;

  return (
    <>
      {
        isActive && (
          <CalculatorTooltip
            value={currValue}
            width={width}
          />
        )
      }
      <Input
        id={elementId}
        reference={setTarget}
        name={name}
        label={label}
        hideLabel={hideLabel}
        value={currValue}
        onChange={onCalculatorChange}
        onBlur={onCalculatorBlur}
        className={className}
        disabled={disabled}
      />
    </>
  );
};

export default Calculator;
