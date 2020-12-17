import { Provider } from 'react-redux';
import { Select } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import ContactDetailsTab from '../ContactDetailsTab';
import Store from '../../../../../../store/Store';

describe('ContactDetailsTab', () => {
  const state = {
    contactDetail: {
      state: undefined,
      country: 'Australia',
      phoneNumbers: [],
    },
    stateOptions: [
      { name: 'AAT', id: 'AAT' },
      { name: 'ACT', id: 'ACT' },
      { name: 'VIC', id: 'VIC' },
      { name: 'NSW', id: 'NSW' },
      { name: 'NT', id: 'NT' },
      { name: 'QLD', id: 'QLD' },
      { name: 'SA', id: 'SA' },
      { name: 'TAS', id: 'TAS' },
      { name: 'WA', id: 'WA' },
    ],
    onContactDetailsChange: jest.fn(),
  };

  const constructContactDetailsTab = () => {
    const store = new Store(() => ({ ...state }));
    const wrappedComponent = (
      <Provider store={store}>
        <ContactDetailsTab />
      </Provider>
    );

    return mount(wrappedComponent);
  };

  describe('stateInput', () => {
    const name = 'state';
    it('should display undefined state as default option', () => {
      const wrapper = constructContactDetailsTab();

      const field = wrapper.find({ name }).find(Select);

      expect(field.props()).toMatchObject({
        label: 'State/territory',
        value: undefined,
      });
    });

    it('should contain the state options provided with default option as hidden', () => {
      const expectedStateOptions = [
        { name: '', id: null, hidden: true },
      ].concat(state.stateOptions);

      const wrapper = constructContactDetailsTab();

      const field = wrapper.find({ name }).find(Select);
      const optionComponents = field.find(Select.Option);
      const optionProps = optionComponents.map((c) => ({
        name: c.prop('label'),
        id: c.prop('value'),
        hidden: c.prop('hidden'),
      }));

      expect(optionProps).toEqual(expectedStateOptions);
    });
  });
});
