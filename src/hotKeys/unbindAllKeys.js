import hotkeys from 'hotkeys-js';

import keyMap from './keyMap';

const unbindGlobalKeys = () => hotkeys.unbind(Object.values(keyMap).toString());

const unbindAllKeys = () => {
  unbindGlobalKeys();
};

export default unbindAllKeys;
