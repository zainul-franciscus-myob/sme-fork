import { useCallback, useRef, useState } from 'react';

const useOnBlur = ({ onSelect, onBlur }) => {
  const [lastCheckedValue, setLastCheckedValue] = useState('');
  const currentValueRef = useRef('');

  const newOnSelect = useCallback(
    (val) => {
      currentValueRef.current = val;
      onSelect(val);
    },
    [onSelect]
  );

  const newOnBlur = (e) => {
    if (
      lastCheckedValue !== currentValueRef.current &&
      e.target.tagName === 'INPUT'
    ) {
      setLastCheckedValue(currentValueRef.current);
      onBlur(e);
    }
  };

  return { newOnSelect, newOnBlur };
};

export default useOnBlur;
