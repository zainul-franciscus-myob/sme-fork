import { useEffect, useState } from 'react';

const useFormattedValue = ({
  value = '',
  onBlur,
  onChange,
  onFormat = (val) => val,
}) => {
  const [formattedValue, setFormattedValue] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (value === '') {
      setFormattedValue('');
    } else {
      setFormattedValue(onFormat(value));
    }
    setIsDirty(false);
  }, [onFormat, value]);

  const newOnBlur = (e) => {
    const newValue = e.target.value;
    if (value === '' && newValue === '') return;

    setFormattedValue(onFormat(newValue));
    if (isDirty) {
      onChange(e);
    }
    onBlur(e);
  };

  const newOnChange = (e) => {
    // Ensure underlying component updates correctly
    // To reproduce it, type the same number twice, the second time, it doesn't format on the view
    setFormattedValue(e.target.value);
    setIsDirty(true);
  };

  return {
    newOnBlur,
    newOnChange,
    formattedValue,
    isDirty,
  };
};

export default useFormattedValue;
