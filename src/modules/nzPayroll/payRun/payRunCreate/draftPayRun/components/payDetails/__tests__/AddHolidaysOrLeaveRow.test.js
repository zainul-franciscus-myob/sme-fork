import { Button } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import AddHolidayOrLeaveRow from '../AddHolidaysOrLeaveRow';
import TestStore from '../../../../../../../../store/TestStore';
import payRunReducer from '../../../../payRunReducer';

describe('Add holidays or leave row', () => {
  let store;
  const onAddHolidayAndLeaveClickMock = jest.fn();
  const props = {
    tableConfig: { name: 'name' },
    onAddHolidayAndLeaveClick: onAddHolidayAndLeaveClickMock,
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

  it('Should render add holidays link button', () => {
    const wrapper = mountWithProvider(<AddHolidayOrLeaveRow {...props} />);
    const button = wrapper.find(Button).at(0);
    button.simulate('click');
    expect(onAddHolidayAndLeaveClickMock).toHaveBeenCalled();
  });

  it('Should call addHolidayAndLeaveClicked when click button', () => {
    const wrapper = mountWithProvider(<AddHolidayOrLeaveRow {...props} />);
    expect(wrapper.find(Button).at(0).prop('type')).toEqual('link');
  });
});
