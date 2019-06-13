import hotkeys from 'hotkeys-js';

import keyboardTransformer from './keyboardTransformer';

const setupHotKeys = (keymap, handlers) => {
  const transformedKeyboard = keyboardTransformer(keymap, handlers);
  hotkeys(Object.keys(transformedKeyboard).toString(), (event, handler) => {
    transformedKeyboard[handler.key]();
  });
};

export default setupHotKeys;
