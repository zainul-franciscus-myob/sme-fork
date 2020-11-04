import { mount } from 'enzyme';
import React from 'react';
import hotkeys from 'hotkeys-js';

import { ALL_EDITABLE_CONTENT_SCOPE } from '../../../../hotKeys/hotkeysFilter.js';
import {
  COMMAND,
  ENTER,
  NUMPAD_PLUS,
  NUMPAD_SLASH,
  SHIFT,
} from '../HotkeyEnums.js';
import HotkeyLocations from '../HotkeyLocations.js';
import Hotkeys from '../Hotkeys';

jest.mock('hotkeys-js');

describe('Hotkeys', () => {
  const splitKey = '??&';

  const comboboxHandler = jest.fn();
  const shiftComboboxHandler = jest.fn();
  const plusComboboxHandler = jest.fn();
  const plusCombinationComboboxHandler = jest.fn();
  const slashComboboxHandler = jest.fn();
  const slashCombinationComboboxHandler = jest.fn();
  const globalHandler = jest.fn();

  const hotkeyHandlers = {
    [HotkeyLocations.UNMATCHED_ACCOUNT_COMBOBOX]: [
      {
        key: [COMMAND, ENTER],
        action: comboboxHandler,
      },
      {
        key: SHIFT,
        action: shiftComboboxHandler,
      },
      {
        key: NUMPAD_PLUS,
        action: plusComboboxHandler,
      },
      {
        key: [SHIFT, NUMPAD_PLUS],
        action: plusCombinationComboboxHandler,
      },
      {
        key: NUMPAD_SLASH,
        action: slashComboboxHandler,
      },
      {
        key: [COMMAND, NUMPAD_SLASH],
        action: slashCombinationComboboxHandler,
      },
    ],
    [HotkeyLocations.GLOBAL]: [
      {
        key: [COMMAND, ENTER],
        action: globalHandler,
      },
    ],
    [HotkeyLocations.SPLIT_ALLOCATION_CALCULATOR]: [],
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('given a single hotkey should trigger the correct handler', () => {
    const hotkey = { key: `${SHIFT}` };
    hotkeys.mockImplementation((listOfHotkeys, options, callback) => {
      callback(
        {
          preventDefault: () => {},
          hotkeyDetails: {
            location: HotkeyLocations.UNMATCHED_ACCOUNT_COMBOBOX,
          },
        },
        hotkey
      );
    });

    mount(<Hotkeys hotkeyHandlers={hotkeyHandlers} />);

    expect(shiftComboboxHandler).toHaveBeenCalledTimes(1);
  });

  it('given a combination hotkey should trigger the correct handler', () => {
    const hotkey = { key: `${COMMAND}${splitKey}${ENTER}` };
    hotkeys.mockImplementation((listOfHotkeys, options, callback) => {
      callback(
        {
          preventDefault: () => {},
          hotkeyDetails: {
            location: HotkeyLocations.UNMATCHED_ACCOUNT_COMBOBOX,
          },
        },
        hotkey
      );
    });

    mount(<Hotkeys hotkeyHandlers={hotkeyHandlers} />);

    expect(comboboxHandler).toHaveBeenCalledTimes(1);
    expect(globalHandler).not.toHaveBeenCalled();
  });

  const numpadPlusKeyCode = 107;
  const numpadSlashKeyCode = 111;

  it.each([
    [NUMPAD_PLUS, numpadPlusKeyCode, plusComboboxHandler],
    [NUMPAD_SLASH, numpadSlashKeyCode, slashComboboxHandler],
  ])(
    'given a numpad (%s) single hotkey should trigger the handler when key %s is pressed',
    (key, code, handler) => {
      const hotkey = { key };
      hotkeys.mockImplementation((listOfHotkeys, options, callback) => {
        callback(
          {
            preventDefault: () => {},
            hotkeyDetails: {
              location: HotkeyLocations.UNMATCHED_ACCOUNT_COMBOBOX,
            },
          },
          hotkey
        );
      });
      hotkeys.isPressed.mockImplementation((keyCode) => keyCode === code);

      mount(<Hotkeys hotkeyHandlers={hotkeyHandlers} />);

      expect(handler).toHaveBeenCalledTimes(1);
    }
  );

  it.each([
    [[SHIFT, NUMPAD_PLUS], numpadPlusKeyCode, plusCombinationComboboxHandler],
    [
      [COMMAND, NUMPAD_SLASH],
      numpadSlashKeyCode,
      slashCombinationComboboxHandler,
    ],
  ])(
    'given a numpad combination (%s) hotkey should trigger the handler when key %s is pressed',
    (key, code, handler) => {
      const hotkey = { key: key.join(splitKey) };
      hotkeys.mockImplementation((listOfHotkeys, options, callback) => {
        callback(
          {
            preventDefault: () => {},
            hotkeyDetails: {
              location: HotkeyLocations.UNMATCHED_ACCOUNT_COMBOBOX,
            },
          },
          hotkey
        );
      });
      hotkeys.isPressed.mockImplementation((keyCode) => keyCode === code);

      mount(<Hotkeys hotkeyHandlers={hotkeyHandlers} />);

      expect(handler).toHaveBeenCalledTimes(1);
    }
  );

  it('given an event with additional details should pass along those details', () => {
    const hotkey = { key: `${COMMAND}${splitKey}${ENTER}` };
    hotkeys.mockImplementation((listOfHotkeys, options, callback) => {
      callback(
        {
          preventDefault: () => {},
          hotkeyDetails: {
            location: HotkeyLocations.UNMATCHED_ACCOUNT_COMBOBOX,
            value: 'hello',
          },
        },
        hotkey
      );
    });

    mount(<Hotkeys hotkeyHandlers={hotkeyHandlers} />);

    expect(comboboxHandler).toHaveBeenCalledWith({
      location: HotkeyLocations.UNMATCHED_ACCOUNT_COMBOBOX,
      value: 'hello',
    });
  });

  it('given an event has no location details should interpret as global', () => {
    const hotkey = { key: `${COMMAND}${splitKey}${ENTER}` };
    hotkeys.mockImplementation((listOfHotkeys, options, callback) => {
      callback({ preventDefault: () => {} }, hotkey);
    });

    mount(<Hotkeys hotkeyHandlers={hotkeyHandlers} />);

    expect(globalHandler).toHaveBeenCalledTimes(1);
  });

  it('given an unimplemented hotkey should not trigger any handler', () => {
    const hotkey = { key: `${COMMAND}${splitKey}${ENTER}` };
    hotkeys.mockImplementation((listOfHotkeys, options, callback) => {
      callback(
        {
          preventDefault: () => {},
          hotkeyDetails: {
            location: HotkeyLocations.SPLIT_ALLOCATION_CALCULATOR,
          },
        },
        hotkey
      );
    });

    mount(<Hotkeys hotkeyHandlers={hotkeyHandlers} />);

    [
      comboboxHandler,
      shiftComboboxHandler,
      globalHandler,
      plusComboboxHandler,
      plusCombinationComboboxHandler,
      slashComboboxHandler,
      slashCombinationComboboxHandler,
    ].forEach((handler) => {
      expect(handler).not.toHaveBeenCalled();
    });
  });

  it('scope should allow hotkeys to be usable inside editable elements', () => {
    let scopeInUse = '';
    hotkeys.setScope.mockImplementation((scopeBeingSet) => {
      scopeInUse = scopeBeingSet;
    });

    mount(<Hotkeys hotkeyHandlers={{}} />);

    expect(scopeInUse).toEqual(ALL_EDITABLE_CONTENT_SCOPE);
  });

  it('once unmounted scope should not allow hotkeys to be usable inside editable elements', () => {
    let scopeDeleted = '';
    hotkeys.deleteScope.mockImplementation((scopeBeingDeleted) => {
      scopeDeleted = scopeBeingDeleted;
    });

    const wrapper = mount(<Hotkeys hotkeyHandlers={{}} />);
    wrapper.unmount();

    expect(scopeDeleted).toEqual(ALL_EDITABLE_CONTENT_SCOPE);
  });
});
