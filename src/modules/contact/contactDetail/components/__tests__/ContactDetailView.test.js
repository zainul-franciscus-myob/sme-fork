import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import AbnSection from '../AbnSection';
import ContactDetails from '../ContactDetails';
import TestStore from '../../../../../store/TestStore';
import contactDetailReducer from '../../contactDetailReducer';

describe('ContactDetails', () => {
  const defaultState = {
    contactTypes: [
      { name: 'Customer', value: 'Customer' },
      { name: 'Supplier', value: 'Supplier' },
      { name: 'Personal', value: 'Other' },
    ],
    region: 'au',
  };

  it('renders the ABN field if contact type is not personal', () => {
    const initialState = {
      ...defaultState,
      contact: {
        selectedContactType: 'Customer',
      },
    };
    const store = new TestStore(contactDetailReducer, initialState);
    const wrapper = mount(
      <Provider store={store}>
        <ContactDetails
          onContactDetailsChange={() => {}}
          onAddAccount={() => {}}
          onAbnBlur={() => {}}
        />
      </Provider>
    );
    expect(wrapper.find(AbnSection).length).toBe(1);
  });

  it('does not render the ABN field if contact type is personal', () => {
    const initialState = {
      ...defaultState,
      contact: {
        selectedContactType: 'Other',
      },
    };
    const store = new TestStore(contactDetailReducer, initialState);
    const wrapper = mount(
      <Provider store={store}>
        <ContactDetails
          onContactDetailsChange={() => {}}
          onAddAccount={() => {}}
          onAbnBlur={() => {}}
        />
      </Provider>
    );
    expect(wrapper.find(AbnSection).exists()).toBe(false);
  });
});
