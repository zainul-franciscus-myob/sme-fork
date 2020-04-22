import { InputBox } from '@myob/myob-widgets';
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import shortid from 'shortid';

import { addCommasInPlace, addDecimalPlaces, removeCommas } from './formatter';
import FieldMessagePopup from '../FieldMessagePopup/FieldMessagePopup';
import copyEventWithValue from '../autoFormatter/AmountInput/copyEventWithValue';
import createValidator from './validate';
import evaluate from './evaluate';
import getNewCursorPosition from './getNewCursorPosition';
import isCalculableExpression from './isCalculableExpression';
import styles from './Calculator.module.css';

const CalculatorTooltip = ({ value, width }) => {
  const tooltipStyle = { width };
  const tooltipTextStyle = { maxWidth: width };

  return (
    <div style={tooltipStyle} className={styles.tooltip}>
      <span style={tooltipTextStyle} className={styles.tooltipText}>
        {`= ${value}`}
      </span>
      <div className={styles.arrowDown} />
    </div>
  );
};

const onWrappedBlur = ({
  setCurrValue,
  onBlur,
  setIsActive,
  numeralDecimalScaleMin,
  numeralDecimalScaleMax,
}) => (e) => {
  const { value } = e.target;

  const valueWithoutCommas = removeCommas(value);
  const parsedValue = evaluate(valueWithoutCommas);
  const valueWithDecimalPlaces = addDecimalPlaces(
    parsedValue,
    numeralDecimalScaleMin,
    numeralDecimalScaleMax,
  );

  // Trigger setCurrValue to update value visible to user
  setCurrValue(valueWithDecimalPlaces);
  setIsActive(false);

  if (onBlur) {
    const event = copyEventWithValue(e, valueWithDecimalPlaces);
    onBlur(event);
  }
};

const onWrappedOnChange = ({
  setCurrValue,
  setEvaluatedValue,
  setIsActive,
  setNewCursorPosition,
  onChange,
  validate,
  numeralDecimalScaleMin,
  numeralDecimalScaleMax,
}) => (e) => {
  const { value } = e.target;
  const isValidValue = validate(value);

  if (isValidValue) {
    const valueWithoutCommas = removeCommas(value);
    const parsedValue = evaluate(valueWithoutCommas);
    const isCalculable = isCalculableExpression(valueWithoutCommas, String(parsedValue));
    const valueWithDecimalPlaces = addDecimalPlaces(
      parsedValue,
      numeralDecimalScaleMin,
      numeralDecimalScaleMax,
    );

    setCurrValue(valueWithoutCommas);
    setEvaluatedValue(valueWithDecimalPlaces);
    setIsActive(isCalculable);
    setNewCursorPosition(value);

    if (onChange) {
      const event = copyEventWithValue(e, valueWithDecimalPlaces);
      onChange(event);
    }
  }
};

const Calculator = ({
  id: propId,
  name,
  label,
  hideLabel,
  value = '',
  onBlur,
  onChange,
  numeralDecimalScaleMin = 0,
  numeralDecimalScaleMax = 2,
  numeralIntegerScale,
  className,
  disabled,
  errorId,
  requiredId,
  labelAccessory,
  requiredLabel,
  textAlign,
  infoBody,
  warningBody,
  errorMessage,
  errorMessageInline,
  ...inputBoxProps
}) => {
  // eslint-disable-next-line no-unused-vars
  const [id, _] = useState(shortid.generate());
  const [currValue, setCurrValue] = useState('');
  const [evaluatedValue, setEvaluatedValue] = useState('');

  // State associated with tooltip
  const [target, setTarget] = useState(null);
  const [isActive, setIsActive] = useState(false);

  // State associated with cursor positioning
  const [cursorPosition, setCursorPosition] = useState(0);
  const [updateCursorPosition, shouldUpdateCursorPosition] = useState(false);

  const setNewCursorPosition = (newValue) => {
    const newCursorPosition = getNewCursorPosition({
      endPosition: target.selectionEnd,
      oldValue: currValue,
      value: newValue,
    });

    setCursorPosition(newCursorPosition);
    shouldUpdateCursorPosition(true);
  };

  const setCursorPositionOnPage = () => {
    shouldUpdateCursorPosition(false);

    if (target != null) {
      target.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  useEffect(() => {
    if (!updateCursorPosition) {
      return;
    }

    setCursorPositionOnPage();
  });

  useEffect(() => {
    const valueWithDecimalPlaces = addDecimalPlaces(
      value,
      numeralDecimalScaleMin,
      numeralDecimalScaleMax,
    );

    if (value !== evaluatedValue) {
      setCurrValue(valueWithDecimalPlaces);
      setEvaluatedValue(value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numeralDecimalScaleMax, numeralDecimalScaleMin, value]);

  const validate = createValidator({ numeralIntegerScale });

  const onCalculatorChange = onWrappedOnChange({
    setCurrValue,
    setEvaluatedValue,
    setIsActive,
    setNewCursorPosition,
    onChange,
    validate,
    numeralDecimalScaleMin,
    numeralDecimalScaleMax,
  });

  const onCalculatorBlur = onWrappedBlur({
    setCurrValue,
    setIsActive,
    onBlur,
    numeralDecimalScaleMin,
    numeralDecimalScaleMax,
  });

  const elementId = propId || id;
  const width = target ? target.offsetWidth : 0;

  const formattedValue = addCommasInPlace(currValue);

  return (
    <>
      {
        isActive && (
          <CalculatorTooltip
            value={evaluatedValue}
            width={width}
          />
        )
      }
      <FieldMessagePopup
        id={elementId}
        reference={setTarget}
        label={label}
        hideLabel={hideLabel}
        errorId={errorId}
        requiredId={requiredId}
        labelAccessory={labelAccessory}
        errorMessage={errorMessage}
        errorMessageInline={errorMessageInline}
        warningBody={warningBody}
        infoBody={infoBody}
        requiredLabel={requiredLabel}
        width={width}
        renderField={props => (
          <InputBox
            {...props}
            {...inputBoxProps}
            name={name}
            value={formattedValue}
            onChange={onCalculatorChange}
            onBlur={onCalculatorBlur}
            className={classnames('form-control', className, {
              'text-align-center': textAlign === 'center',
              'text-align-right': textAlign === 'right',
            })}
            disabled={disabled}
          />
        )}
      />
    </>
  );
};

export default Calculator;
