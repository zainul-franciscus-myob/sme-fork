import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import EmployeePayHeader from '../../../components/EmployeePayHeader';
import RecordPayRunActions from '../RecordPayRunActions';
import RecordPayRunView from '../RecordPayRunView';
import TestStore from '../../../../../../../store/TestStore';
import payRunReducer from '../../../payRunReducer';

describe('RecordPayRunView', () => {
  let store;
  const props = {
    recordPayments: () => {},
    onOpenPaydayFilingClick: jest.fn(),
    isPaydayFilingEnabled: false,
    isBusinessOnboarded: false,
  };

  beforeEach(() => {
    store = new TestStore(payRunReducer);
  });

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  describe('when RecordPayRun view is rendered', () => {
    it('should render EmployeePayHeader child component', () => {
      const wrapper = mountWithProvider(<RecordPayRunView {...props} />);

      expect(wrapper.find(EmployeePayHeader).exists()).toBe(true);
      expect(wrapper.find(EmployeePayHeader)).toHaveLength(1);
    });

    it('should render RecordPayRunActions child component', () => {
      const wrapper = mountWithProvider(<RecordPayRunView {...props} />);

      expect(wrapper.find(RecordPayRunActions).exists()).toBe(true);
      expect(wrapper.find(RecordPayRunActions)).toHaveLength(1);
    });

    it('should display number of selected employees', () => {
      const draftPayRun = {
        lines: [
          {
            employeeId: '21',
            isSelected: true,
            payLines: [],
          },
          {
            employeeId: '22',
            isSelected: true,
            payLines: [],
          },
        ],
      };

      store.setState({
        ...store.getState(),
        draftPayRun,
      });

      const wrapper = mountWithProvider(<RecordPayRunView {...props} />);
      const expected = 'Record pay for 2 employees?';

      expect(wrapper.find({ testid: 'testFieldGroup' }).prop('label')).toEqual(
        expected
      );
    });

    it('should display correct label for single employee', () => {
      const draftPayRun = {
        lines: [
          {
            employeeId: '21',
            isSelected: true,
            payLines: [],
          },
        ],
      };

      store.setState({
        ...store.getState(),
        draftPayRun,
      });

      const wrapper = mountWithProvider(<RecordPayRunView {...props} />);
      const expected = 'Record pay for 1 employee?';

      expect(wrapper.find({ testid: 'testFieldGroup' }).prop('label')).toEqual(
        expected
      );
    });

    it('should display correct label for zero employees selected', () => {
      const draftPayRun = { lines: [] };

      store.setState({
        ...store.getState(),
        draftPayRun,
      });

      const wrapper = mountWithProvider(<RecordPayRunView {...props} />);
      const expected = 'Record pay for 0 employees?';

      expect(wrapper.find({ testid: 'testFieldGroup' }).prop('label')).toEqual(
        expected
      );
    });

    it('should not display payday filing alert when paydayfiling is not enabled', () => {
      const draftPayRun = {
        lines: [
          {
            employeeId: '21',
            isSelected: true,
            payLines: [],
          },
        ],
      };

      store.setState({
        ...store.getState(),
        draftPayRun,
      });

      const wrapper = mountWithProvider(<RecordPayRunView {...props} />);

      expect(
        wrapper.find({ testid: 'paydayFilingReportButton' }).length
      ).toEqual(0);
    });

    it('should display payday filing alert when paydayfiling is enabled', () => {
      const draftPayRun = {
        lines: [
          {
            employeeId: '21',
            isSelected: true,
            payLines: [],
          },
        ],
      };

      store.setState({
        ...store.getState(),
        draftPayRun,
      });

      const updated = { ...props, isPaydayFilingEnabled: true };

      const wrapper = mountWithProvider(<RecordPayRunView {...updated} />);

      expect(
        wrapper.find({ testid: 'paydayFilingReportButton' }).first().text()
      ).toEqual('save pay run and connect to Payday filing');
    });

    it('should not display payday filing alert when business onboarded is true', () => {
      const draftPayRun = {
        lines: [
          {
            employeeId: '21',
            isSelected: true,
            payLines: [],
          },
        ],
      };

      store.setState({
        ...store.getState(),
        draftPayRun,
        isBusinessOnboarded: true,
      });

      const updated = {
        ...props,
        isPaydayFilingEnabled: true,
      };

      const wrapper = mountWithProvider(<RecordPayRunView {...updated} />);

      expect(
        wrapper.find({ testid: 'paydayFilingReportButton' }).length
      ).toEqual(0);
    });

    it('should call onOpenPaydayFilingClick when clicked payday filing button', () => {
      const draftPayRun = {
        lines: [
          {
            employeeId: '21',
            isSelected: true,
            payLines: [],
          },
        ],
      };

      store.setState({
        ...store.getState(),
        draftPayRun,
        isBusinessOnboarded: false,
      });

      const updated = {
        ...props,
        isPaydayFilingEnabled: true,
      };

      const wrapper = mountWithProvider(<RecordPayRunView {...updated} />);
      const button = wrapper
        .find({ testid: 'paydayFilingReportButton' })
        .first();

      button.simulate('click');

      expect(props.onOpenPaydayFilingClick).toHaveBeenCalled();
    });
  });
});
