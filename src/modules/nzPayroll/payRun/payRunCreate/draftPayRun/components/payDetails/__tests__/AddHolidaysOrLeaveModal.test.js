import { Modal } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import AddHolidaysOrLeaveModal from '../AddHolidaysOrLeaveModal';
import TestStore from '../../../../../../../../store/TestStore';
import payRunReducer from '../../../../payRunReducer';

describe('Add holidays or leave modal', () => {
  let store;
  const props = {
    onCancel: () => {},
    onContinue: () => {},
  };

  beforeEach(() => {
    store = new TestStore(payRunReducer);
  });

  afterEach(jest.clearAllMocks);

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  it('Should have Modal box', () => {
    const wrapper = mountWithProvider(<AddHolidaysOrLeaveModal {...props} />);
    const sut = wrapper.find(Modal).prop('title');
    expect(sut).toEqual('Add holidays or leave');
  });

  it('Modal should have expected title', () => {
    const wrapper = mountWithProvider(<AddHolidaysOrLeaveModal {...props} />);
    expect(wrapper.find(Modal).length).toEqual(1);
  });
});
