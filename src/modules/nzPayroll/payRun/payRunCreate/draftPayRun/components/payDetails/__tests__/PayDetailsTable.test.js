import { Provider } from 'react-redux';
import { Table } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_DRAFT_PAY_RUN } from '../../../../PayRunIntents';
import PayDetailsTable from '../PayDetailsTable';
import TestStore from '../../../../../../../../store/TestStore';
import createdDraftPayRun from '../../../__tests__/fixtures/createDraftPayRun';
import payRunReducer from '../../../../payRunReducer';

describe('Employee pay details table', () => {
  let store;
  const props = {
    employeeId: 21,
    employeeName: 'Mary Jones',
  };

  beforeEach(() => {
    store = new TestStore(payRunReducer);
    const action = {
      intent: LOAD_DRAFT_PAY_RUN,
      createdDraftPayRun,
    };
    store.dispatch(action);
  });

  afterEach(jest.clearAllMocks);

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  it('Should have the expected values in table header', () => {
    const wrapper = mountWithProvider(<PayDetailsTable {...props} />);
    const headerTextValues = wrapper
      .find(Table.HeaderItem)
      .map((header) => header.text());
    const expected = ['', 'Quantity', 'Amount ($)'];
    expect(headerTextValues).toEqual(expected);
  });
});