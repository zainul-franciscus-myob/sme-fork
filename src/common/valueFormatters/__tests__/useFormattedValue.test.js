import { act } from 'react-dom/test-utils';

import formatAmount from '../formatAmount';
import testHook from '../../tests/testHook';
import useFormattedValue from '../useFormattedValue';

const setup = (args = {}) => {
  const {
    value = '', onChange = () => {}, onBlur = () => {}, onFormat = formatAmount,
  } = args;
  return testHook(() => useFormattedValue({
    value, onChange, onBlur, onFormat,
  }));
};

describe('useFormattedValue', () => {
  describe('initial render', () => {
    it('should set formattedValue as empty if value is empty', () => {
      const hook = setup({ value: '' });

      expect(hook.current.formattedValue).toBe('');
    });

    it('should format formattedValue if value is set', () => {
      const hook = setup({ value: 123 });

      expect(hook.current.formattedValue).toBe('123.00');
    });
  });

  it('update without formatting when typing', () => {
    const hook = setup();

    act(() => {
      hook.current.newOnChange({ target: { value: '1' } });
    });

    expect(hook.current.formattedValue).toBe('1');
  });

  it('format when finish typing', () => {
    const hook = setup();

    act(() => {
      hook.current.newOnBlur({ target: { value: '1' } });
    });

    expect(hook.current.formattedValue).toBe('1.00');
  });

  it('blocks onChange when typing', () => {
    const onChange = jest.fn();
    const hook = setup({ onChange });

    act(() => {
      hook.current.newOnChange({ target: { value: '1' } });
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('triggers onChange when finish typing', () => {
    const onChange = jest.fn();
    const hook = setup({ onChange });

    act(() => {
      hook.current.newOnBlur({ target: { value: '1' } });
    });

    expect(onChange).toHaveBeenCalled();
  });

  it('triggers onBlur when finish typing', () => {
    const onBlur = jest.fn();
    const hook = setup({ onBlur });

    act(() => {
      hook.current.newOnBlur({ target: { value: '1' } });
    });

    expect(onBlur).toHaveBeenCalled();
  });

  it('triggers nothing when new value is empty when finish typing', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const hook = setup({ onBlur, onChange });

    act(() => {
      hook.current.newOnBlur({ target: { value: '' } });
    });

    expect(onBlur).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('triggers onChange and onBlur when clearing out existing value', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const hook = setup({ value: '1234', onBlur, onChange });

    act(() => {
      hook.current.newOnBlur({ target: { value: '' } });
    });

    expect(onBlur).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
  });
});
