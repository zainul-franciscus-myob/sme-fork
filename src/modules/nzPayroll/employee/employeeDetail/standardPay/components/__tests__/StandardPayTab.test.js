import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_DETAIL } from '../../../../EmployeeNzIntents';
import BasePayDetails from '../BasePayDetails';
import PayItemsTable from '../PayItemsTable';
import StandardPayTab from '../StandardPayTab';
import TestStore from '../../../../../../../store/TestStore';
import employeeDetailNzReducer from '../../../employeeDetailNzReducer';
import employeeDetails from '../../../../mappings/data/employeeDetailEntry';
import tableConfig from '../PayItemsTableConfig';

describe('StandardPayTab', () => {
  const store = new TestStore(employeeDetailNzReducer);
  const onWageDetailsChange = jest.fn();

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  const setup = () => {
    store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, payload: employeeDetails });
    const wrapper = mountWithProvider(
      <StandardPayTab
        onWageDetailsChange={onWageDetailsChange}
        tableConfig={tableConfig}
      />
    );
    return { wrapper, onWageDetailsChange };
  };

  describe('StandardPayTab', () => {
    const { wrapper } = setup();
    const view = wrapper.find(StandardPayTab);

    it('should render StandardPayTab view', () => {
      expect(view.exists()).toBeTruthy();
    });

    it('should render BasePayDetails child component', () => {
      const field = view.find(BasePayDetails);

      expect(field.exists()).toBeTruthy();
    });

    it('should render PayItemsTable child component', () => {
      const field = view.find(PayItemsTable);

      expect(field.exists()).toBeTruthy();
    });
  });
});
