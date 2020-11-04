import React, { useEffect } from 'react';
import hotkeys from 'hotkeys-js';

import { NUMPAD_PLUS, NUMPAD_SLASH } from './HotkeyEnums.js';
import HotkeyLocations from './HotkeyLocations.js';
import hotkeysFilter, {
  ALL_EDITABLE_CONTENT_SCOPE,
} from '../../../hotKeys/hotkeysFilter.js';

/*
The hotkeys-js library currently does not support numberpad keys; providing '+', for example, to hotkeys() will not result in the callback being triggered as expected.
As a workaround, a 'wildcard' is provided to hotkeys() and the exact key being pressed is manually verified (against their respective unique key codes) within the callback.
To add a new numberpad key, parsing and verification logic will need to be added to these functions.
*/
const replaceNumpadKeys = (key) => {
  // Wildcard that is given by the hotkeys-js library. Triggers callback when 'modifier' keys (shift, command, etc.) or numberpad keys are pressed.
  const wildcard = '*';
  return key.replace(NUMPAD_PLUS, wildcard).replace(NUMPAD_SLASH, wildcard);
};

const isANumpadKeyMatch = (parsedKey, triggeredKey) => {
  if (parsedKey.includes(NUMPAD_SLASH)) {
    const numpadSlashKeyCode = 111;
    return (
      hotkeys.isPressed(numpadSlashKeyCode) &&
      replaceNumpadKeys(parsedKey) === triggeredKey
    );
  }

  if (parsedKey.includes(NUMPAD_PLUS)) {
    const numpadPlusKeyCode = 107;
    return (
      hotkeys.isPressed(numpadPlusKeyCode) &&
      replaceNumpadKeys(parsedKey) === triggeredKey
    );
  }

  return false;
};

/* */

// Random split key that is used by the hotkeys-js library
const SPLIT_KEY = '??&';

const parseKey = (key) => {
  return Array.isArray(key) ? key.join(SPLIT_KEY) : key;
};

const buildCallback = (hotkeyHandlers) => (event, handler) => {
  const triggeredKey = handler.key;
  const triggeredLocation = event.hotkeyDetails
    ? event.hotkeyDetails.location
    : HotkeyLocations.GLOBAL;

  const hotkeyHandler = hotkeyHandlers[triggeredLocation].find(({ key }) => {
    const parsedKey = parseKey(key);
    return (
      isANumpadKeyMatch(parsedKey, triggeredKey) || parsedKey === triggeredKey
    );
  });

  if (hotkeyHandlers[triggeredLocation] && hotkeyHandler) {
    // By default prevent the user action from completing when a hotkey is triggered
    event.preventDefault();
    hotkeyHandler.action(event.hotkeyDetails);
  }
};

const Hotkeys = ({ children, hotkeyHandlers }) => {
  useEffect(() => {
    const allHotkeyBindings = [
      ...new Set(
        Object.values(hotkeyHandlers).reduce(
          (hotkeyBindings, hotkeysForLocation) => {
            const hotkeysToAdd = hotkeysForLocation.map(({ key }) =>
              replaceNumpadKeys(parseKey(key))
            );
            return [...hotkeyBindings, ...hotkeysToAdd];
          },
          []
        )
      ),
    ];

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
