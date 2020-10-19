import { Provider } from 'react-redux';
import { Table } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_DRAFT_PAY_RUN } from '../../../../../PayRunIntents';
import KiwiSaverPayItems from '../KiwiSaverPayItems';
import PayDetailsTableRow from '../../PayDetailsTableRow';
import TestStore from '../../../../../../../../../store/TestStore';
import createdDraftPayRun from '../../../../__tests__/fixtures/createDraftPayRun';
import payRunReducer from '../../../../../payRunReducer';
import tableConfig from '../../PayDetailsTableConfig';

describe('KiwiSaverPayItems', () => {
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
    const wrapper = mountWithProvider(<KiwiSaverPayItems {...props} />);

    const expected = 'KiwiSaver';

    const actual = wrapper
      .find(Table.RowItem)
      .find({ title: 'KiwiSaver' })
      .text();

    expect(actual).toEqual(expected);
  });

  it('Should have three child rows', () => {
    const wrapper = mountWithProvider(<KiwiSaverPayItems {...props} />);
    expect(wrapper.find(PayDetailsTableRow).length).toEqual(3);
  });
});
