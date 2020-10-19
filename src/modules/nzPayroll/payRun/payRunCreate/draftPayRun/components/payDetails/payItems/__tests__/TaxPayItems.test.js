import { Provider } from 'react-redux';
import { Table } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_DRAFT_PAY_RUN } from '../../../../../PayRunIntents';
import PayDetailsTableRow from '../../PayDetailsTableRow';
import TaxPayItems from '../TaxPayItems';
import TestStore from '../../../../../../../../../store/TestStore';
import createdDraftPayRun from '../../../../__tests__/fixtures/createDraftPayRun';
import payRunReducer from '../../../../../payRunReducer';
import tableConfig from '../../PayDetailsTableConfig';

describe('TaxPayItems', () => {
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
    const wrapper = mountWithProvider(<TaxPayItems {...props} />);

    const expected = 'Taxes';

    const actual = wrapper.find(Table.RowItem).find({ title: 'Taxes' }).text();

    expect(actual).toEqual(expected);
  });

  it('Should have three child rows', () => {
    const wrapper = mountWithProvider(<TaxPayItems {...props} />);
    expect(wrapper.find(PayDetailsTableRow).length).toEqual(1);
  });
});
