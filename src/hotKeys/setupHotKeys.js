import hotkeys from 'hotkeys-js';

import hotkeysFilter from './hotkeysFilter';
import keyboardTransformer from './keyboardTransformer';

const setupHotKeys = (keymap, handlers) => {
  const transformedKeyboard = keyboardTransformer(keymap, handlers);
  hotkeys(Object.keys(transformedKeyboard).toString(), (event, handler) => {
    transformedKeyboard[handler.key]();
  });
  hotkeys.filter = hotkeysFilter;
};

export default setupHotKeys;
