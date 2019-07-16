import keyboardTransformer from '../keyboardTransformer';

describe('transformKeyboardMapToShortcut', () => {
  it('should be able to match key to handler', () => {
    const keymap = {
      test: 'command+enter,ctrl+enter',
    };
    const handler = jest.fn();
    const handlers = {
      test: handler,
    };

    const expected = {
      'command+enter': handler,
      'ctrl+enter': handler,
    };

    const result = keyboardTransformer(keymap, handlers);

    expect(result).toEqual(expected);
  });
});
