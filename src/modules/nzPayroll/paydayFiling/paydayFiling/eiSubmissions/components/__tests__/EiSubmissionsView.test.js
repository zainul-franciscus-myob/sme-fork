import { Provider } from 'react-redux';
import { Table } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import EiSubmissionsView from '../EiSubmissionsView';
import LoadingState from '../../../../../../../components/PageView/LoadingState';
import TestStore from '../../../../../../../store/TestStore';
import formatDateTime from '../../../../../../../common/valueFormatters/formatDate/formatDateTime';
import paydayFilingReducer from '../../../PaydayFilingReducer';

describe('EiSubmissionsView', () => {
  let store;
  const props = {};

  beforeEach(() => {
    store = new TestStore(paydayFilingReducer);
  });

  afterEach(jest.clearAllMocks);

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  describe('on table load', () => {
    const setupTestState = () => {
      store.setState({
        ...store.getState(),
        loadingState: LoadingState.LOADING_SUCCESS,
        eiSubmissions: {
          payRuns: [
            {
              id: '1234d3e7-4c5b-4a50-a114-3e652c123456',
              payPeriod: '01/10/2020 - 15/10/2020',
              payOnDate: '05/10/2020',
              dateRecorded: '2020-10-01T07:18:14.174Z',
              totalPaye: '3,400.00',
              totalGross: '13,340.00',
              employeeCount: 2,
              status: 'Submitted',
              username: 'payday@mailinator.com',
              responseCode: '0',
              submissionKey: '123456789',
              detail: 'Submitted successfully',
            },
          ],
          payrollYears: [
            {
              label: '2020/21',
              year: '2021',
              startDate: '2020-04-01',
              endDate: '2021-03-31',
            },
          ],
          selectedPayrollYear: '2021',
          isTableLoading: false,
        },
      });
    };

    it('should have headers in correct order', () => {
      setupTestState();
      const wrapper = mountWithProvider(<EiSubmissionsView {...props} />);

      const expected = [
        'Pay period',
        'Pay on date',
        'Date recorded',
        'PAYE and/or schedular tax ($)',
        'Submitted to IR',
      ];

      const actual = wrapper.find(Table.HeaderItem).map((x) => x.text());

      expect(actual).toEqual(expected);
    });

    it('should render payrun line with correct values', () => {
      setupTestState();
      const wrapper = mountWithProvider(<EiSubmissionsView {...props} />);

      const payRunRow = wrapper.find(Table.RowItem);
      const payRunRowText = payRunRow.map((x) => x.text());

      const expected = [
        '01/10/2020 - 15/10/2020',
        '05/10/2020',
        formatDateTime('2020-10-01T07:18:14.174Z'),
        '3,400.00',
        'Submitted',
      ];

      expect(payRunRowText).toEqual(expected);
    });
  });

  describe('truncated ei submissions', () => {
    const setupTestStateWithSelectedRow = () => {
      const payRun = {
        id: '1234d3e7-4c5b-4a50-a114-3e652c123456',
        payPeriod: '01/10/2020 - 15/10/2020',
        payOnDate: '05/10/2020',
        dateRecorded: '2020-10-01T07:18:14.174Z',
        totalPaye: '3,400.00',
        totalGross: '13,340.00',
        employeeCount: 2,
        status: 'Error',
        username: 'payday@mailinator.com',
        responseCode: '0',
        submissionKey: '123456789',
        detail: 'Submitted successfully',
      };

      store.setState({
        ...store.getState(),
        loadingState: LoadingState.LOADING_SUCCESS,
        eiSubmissions: {
          payRuns: [payRun],
          selectedPayRun: payRun,
          payrollYears: [
            {
              label: '2020/21',
              year: '2021',
              startDate: '2020-04-01',
              endDate: '2021-03-31',
            },
          ],
          selectedPayrollYear: '2021',
          isTableLoading: false,
        },
      });
    };

    it('should have headers in correct order', () => {
      setupTestStateWithSelectedRow();
      const wrapper = mountWithProvider(<EiSubmissionsView {...props} />);

      const expected = ['Pay period', 'Date recorded', 'Submitted to IR'];

      const actual = wrapper.find(Table.HeaderItem).map((x) => x.text());

      expect(actual).toEqual(expected);
    });

    it('should render payrun line with correct values', () => {
      setupTestStateWithSelectedRow();
      const wrapper = mountWithProvider(<EiSubmissionsView {...props} />);

      const payRunRow = wrapper.find(Table.RowItem);
      const payRunRowText = payRunRow.map((x) => x.text());

      const expected = [
        '01/10/2020 - 15/10/2020',
        formatDateTime('2020-10-01T07:18:14.174Z'),
        'Error',
      ];

      expect(payRunRowText).toEqual(expected);
    });
  });
});
