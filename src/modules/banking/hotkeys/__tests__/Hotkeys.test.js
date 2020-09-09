import { mount } from 'enzyme';
import React from 'react';
import hotkeys from 'hotkeys-js';

import { ALL_EDITABLE_CONTENT_SCOPE } from '../../../../hotKeys/hotkeysFilter.js';
import { COMMAND, ENTER, SHIFT } from '../HotkeyEnums.js';
import HotkeyLocations from '../HotkeyLocations.js';
import Hotkeys from '../Hotkeys';

jest.mock('hotkeys-js');

describe('Hotkeys', () => {
  const splitKey = '??&';
  const mockComboboxHandler = jest.fn();
  const mockComboboxShiftHandler = jest.fn();
  const mockGlobalHandler = jest.fn();
  const hotkeyHandlers = {
    [HotkeyLocations.UNMATCHED_ACCOUNT_COMBOBOX]: [
      {
        key: [COMMAND, ENTER],
        action: mockComboboxHandler,
      },
      {
        key: SHIFT,
        action: mockComboboxShiftHandler,
      },
    ],
    [HotkeyLocations.GLOBAL]: [
      {
        key: [COMMAND, ENTER],
        action: mockGlobalHandler,
      },
    ],
    [HotkeyLocations.SPLIT_ALLOCATION_CALCULATOR]: [],
  };

  beforeEach(() => {
    jest.resetAllMocks();
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

    expect(mockComboboxHandler).toHaveBeenCalled();
    expect(mockGlobalHandler).not.toHaveBeenCalled();
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

    expect(mockComboboxShiftHandler).toHaveBeenCalled();
  });

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

    expect(mockComboboxHandler).toHaveBeenCalledWith({
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

    expect(mockGlobalHandler).toHaveBeenCalled();
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

    expect(mockComboboxHandler).not.toHaveBeenCalled();
    expect(mockComboboxShiftHandler).not.toHaveBeenCalled();
    expect(mockGlobalHandler).not.toHaveBeenCalled();
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
