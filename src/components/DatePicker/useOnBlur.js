import { useCallback, useState } from 'react';

const useOnBlur = ({ onSelect, onBlur }) => {
  const [lastCheckedValue, setLastCheckedValue] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  const newOnSelect = useCallback(val => {
    setCurrentValue(val);
    onSelect(val);
  }, [onSelect]);

  const newOnBlur = (e) => {
    if (lastCheckedValue !== currentValue && e.target.tagName === 'INPUT') {
      setLastCheckedValue(currentValue);
      onBlur(e);
    }
  };
  return { newOnSelect, newOnBlur };
};

export default useOnBlur;
