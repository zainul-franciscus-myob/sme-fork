import keyboardTransformer from '../keyboardTransformer';

describe('transformKeyboardMapToShortcut', () => {
  it('should be able to match key to handler', () => {
    const keymap = {
      test: 'command+enter,ctrl+enter',
    };

    const handlers = {
      test: console.log('test'),
    };

    const expected = {
      'command+enter': console.log('test'),
      'ctrl+enter': console.log('test'),
    };

    const result = keyboardTransformer(keymap, handlers);

    expect(result).toEqual(expected);
  });
});
