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
  });
});
