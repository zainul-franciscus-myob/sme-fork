import { Provider } from 'react-redux';
import { Table } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import {
  LOAD_DRAFT_PAY_RUN,
  OPEN_ADD_HOLIDAYS_AND_LEAVE_MODAL,
} from '../../../../../PayRunIntents';
import AddHolidayOrLeaveRow from '../../AddHolidaysOrLeaveRow';
import AddHolidaysOrLeaveModal from '../../AddHolidaysOrLeaveModal';
import HolidaysAndLeaveLines from '../HolidaysAndLeaveLines';
import TestStore from '../../../../../../../../../store/TestStore';
import createdDraftPayRun from '../../../../__tests__/fixtures/createDraftPayRun';
import payRunReducer from '../../../../../payRunReducer';
import tableConfig from '../../PayDetailsTableConfig';

describe('HolidaysAndLeaveLines', () => {
  let store;
  const props = {
    employeeId: 22,
    employeeName: 'John Smith',
    tableConfig,
  };

  beforeEach(() => {
    store = new TestStore(payRunReducer);
    const action = {
      intent: LOAD_DRAFT_PAY_RUN,
      createdDraftPayRun,
      shouldShowTableRows: true,
    };
    store.dispatch(action);
  });

  afterEach(jest.clearAllMocks);

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  it('Should have the expected values in row header', () => {
    const wrapper = mountWithProvider(<HolidaysAndLeaveLines {...props} />);

    const expected = 'Holidays and leave';

    const actual = wrapper
      .find(Table.RowItem)
      .find({ title: 'Holidays and leave' })
      .text();

    expect(actual).toEqual(expected);
  });

  it('Should have one add holiday row', () => {
    const wrapper = mountWithProvider(<HolidaysAndLeaveLines {...props} />);
    expect(wrapper.find(AddHolidayOrLeaveRow).length).toEqual(1);
  });

  it('Should have holidays and leave modal box shown', () => {
    const wrapper = mountWithProvider(<HolidaysAndLeaveLines {...props} />);
    expect(wrapper.find(AddHolidayOrLeaveRow).length).toEqual(1);
  });

  it('Should have holidays and leave modal box hide', () => {
    const wrapper = mountWithProvider(<HolidaysAndLeaveLines {...props} />);
    expect(wrapper.find(AddHolidaysOrLeaveModal).length).toEqual(0);
  });
});

describe('HolidaysAndLeaveModalBox', () => {
  let store;
  const props = {
    employeeId: 22,
    employeeName: 'John Smith',
    tableConfig,
  };

  beforeEach(() => {
    store = new TestStore(payRunReducer);
    const loadDraftPayRun = {
      intent: LOAD_DRAFT_PAY_RUN,
      createdDraftPayRun,
      shouldShowTableRows: true,
    };
    store.dispatch(loadDraftPayRun);
    const clickHolidaysAndLeaveLink = {
      intent: OPEN_ADD_HOLIDAYS_AND_LEAVE_MODAL,
    };
    store.dispatch(clickHolidaysAndLeaveLink);
  });

  afterEach(jest.clearAllMocks);

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  it('Should have holidays and leave modal box shown', () => {
    const wrapper = mountWithProvider(<HolidaysAndLeaveLines {...props} />);
    expect(wrapper.find(AddHolidaysOrLeaveModal).length).toEqual(1);
  });
});
