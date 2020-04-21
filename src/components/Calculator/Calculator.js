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
  onChange,
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

  const event = copyEventWithValue(e, valueWithDecimalPlaces);

  // Trigger onChange to give parsed value to parent
  if (value) {
    onChange(event);
  }

  if (onBlur) {
    onBlur(event);
  }

  setIsActive(false);
};

const onWrappedOnChange = ({
  setCurrValue,
  setIsActive,
  validate,
  setNewCursorPosition,
}) => (e) => {
  const { value } = e.target;
  const isValidValue = validate(value);

  if (isValidValue) {
    const valueWithoutCommas = removeCommas(value);
    setCurrValue(valueWithoutCommas);
    setIsActive(isCalculableExpression(valueWithoutCommas));
    setNewCursorPosition(value);
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
  const [currValue, setCurrValue] = useState(value);
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

    // Trigger setCurrValue to update value visible to user
    setCurrValue(valueWithDecimalPlaces);
  }, [numeralDecimalScaleMax, numeralDecimalScaleMin, value]);

  const validate = createValidator({ numeralIntegerScale });
  const onCalculatorChange = onWrappedOnChange({
    setCurrValue,
    setIsActive,
    onChange,
    validate,
    setNewCursorPosition,
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
  const formattedValue = addCommasInPlace(currValue);
  const parsedValue = evaluate(currValue);
  const valueWithDecimalPlaces = addDecimalPlaces(
    parsedValue,
    numeralDecimalScaleMin,
    numeralDecimalScaleMax,
  );

  return (
    <>
      {
        isActive && (
          <CalculatorTooltip
            value={valueWithDecimalPlaces}
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
