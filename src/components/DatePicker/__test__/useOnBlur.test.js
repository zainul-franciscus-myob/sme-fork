import { act } from 'react-dom/test-utils';

import testHook from '../../../common/tests/testHook';
import useOnBlur from '../useOnBlur';

const setup = (args = {}) => {
  const {
    onSelect = () => {}, onBlur = () => {},
  } = args;
  return testHook(() => useOnBlur({
    onSelect, onBlur,
  }));
};

describe('useOnBlur', () => {
  it('triggers onSelect when user select', () => {
    const onSelect = jest.fn();
    const hook = setup({ onSelect });

    const newDate = '2020-03-04';
    act(() => {
      hook.current.newOnSelect(newDate);
    });
    expect(onSelect).toHaveBeenCalledWith(newDate);
  });

  it('triggers onBlur when user select new value and blur out', () => {
    const onBlur = jest.fn();
    const hook = setup({ onBlur });

    const newDate = '2020-03-04';
    const inputBlurEvent = { target: { tagName: 'INPUT' } };

    act(() => {
      hook.current.newOnSelect(newDate);
    });

    act(() => {
      hook.current.newOnBlur(inputBlurEvent);
    });

    expect(onBlur).toHaveBeenCalled();
  });

  it('triggers onBlur when user blur out without selecting new value', () => {
    const onBlur = jest.fn();
    const hook = setup({ onBlur });

    const inputBlurEvent = { target: { tagName: 'INPUT' } };

    act(() => {
      hook.current.newOnBlur(inputBlurEvent);
    });

    expect(onBlur).not.toHaveBeenCalled();
  });
});
