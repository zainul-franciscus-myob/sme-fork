import React, { useEffect } from 'react';
import hotkeys from 'hotkeys-js';

import HotkeyLocations from './HotkeyLocations.js';
import hotkeysFilter, {
  ALL_EDITABLE_CONTENT_SCOPE,
} from '../../../hotKeys/hotkeysFilter.js';

// Random split key that is used by the hotkeys-js library
const SPLIT_KEY = '??&';

const parseKey = (key) => {
  if (Array.isArray(key)) {
    return key.join(SPLIT_KEY);
  }
  return key;
};

const buildCallback = (hotkeyHandlers) => (event, handler) => {
  const triggeredKey = handler.key;
  const triggeredLocation = event.hotkeyDetails
    ? event.hotkeyDetails.location
    : HotkeyLocations.GLOBAL;
  const hotkeyHandler = hotkeyHandlers[triggeredLocation].find(
    ({ key }) => parseKey(key) === triggeredKey
  );

  if (hotkeyHandlers[triggeredLocation] && hotkeyHandler) {
    // By default prevent the user action from completing when a hotkey is triggered
    event.preventDefault();
    hotkeyHandler.action(event.hotkeyDetails);
  }
};

const Hotkeys = ({ children, hotkeyHandlers }) => {
  useEffect(() => {
    const allHotkeyBindings = Object.values(hotkeyHandlers).reduce(
      (hotkeyBindings, hotkeysForLocation) => {
        const hotkeysToAdd = hotkeysForLocation
          .map(({ key }) => parseKey(key))
          .filter((key) => !hotkeyBindings.includes(key));
        return [...hotkeyBindings, ...hotkeysToAdd];
      },
      []
    );

    const callback = buildCallback(hotkeyHandlers);
    const listOfHotkeys = allHotkeyBindings.toString();
    const options = {
      splitKey: `${SPLIT_KEY}`,
      scope: ALL_EDITABLE_CONTENT_SCOPE,
    };

    hotkeys(listOfHotkeys, options, callback);
    hotkeys.setScope(ALL_EDITABLE_CONTENT_SCOPE);
    hotkeys.filter = hotkeysFilter;

    return () => hotkeys.deleteScope(ALL_EDITABLE_CONTENT_SCOPE);
  }, [hotkeyHandlers]);

  return <>{children}</>;
};

export default Hotkeys;
