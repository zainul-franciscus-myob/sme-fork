import { useEffect, useState } from 'react';

const useFormattedValue = ({
  value = '', onBlur, onChange, onFormat = val => val,
}) => {
  const [formattedValue, setFormattedValue] = useState('');

  useEffect(() => {
    // make sure not formating value when the value is empty
    if (value === '') return;
    setFormattedValue(onFormat(value));
  }, [onFormat, value]);

  const newOnBlur = e => {
    const newValue = e.target.value;
    if (value === '' && newValue === '') return;

    setFormattedValue(onFormat(newValue));
    onChange(e);
    onBlur(e);
  };

  const newOnChange = e => {
    // Ensure underlying component updates correctly
    // To reproduce it, type the same number twice, the second time, it doesn't format on the view
    setFormattedValue(e.target.value);
  };

  return {
    newOnBlur,
    newOnChange,
    formattedValue,
  };
};

export default useFormattedValue;
