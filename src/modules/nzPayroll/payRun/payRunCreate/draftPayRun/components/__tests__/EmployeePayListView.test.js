import { PageHead, Stepper } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import DraftPayRunView from '../DraftPayRunView';
import EmployeePayActions from '../EmployeePayActions';
import EmployeePayHeader from '../../../components/EmployeePayHeader';
import EmployeePayTable from '../EmployeesPayTable';
import TestStore from '../../../../../../../store/TestStore';
import payRunReducer from '../../../payRunReducer';

describe('DraftPayRunView', () => {
  let store;
  const props = {};

  beforeEach(() => {
    store = new TestStore(payRunReducer);
  });

  afterEach(jest.clearAllMocks);

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  describe('On load', () => {
    it('should have all expected components', () => {
      const wrapper = mountWithProvider(<DraftPayRunView {...props} />);
      expect(wrapper.exists(PageHead)).toEqual(true);
      expect(wrapper.exists(Stepper)).toEqual(true);
      expect(wrapper.exists(EmployeePayHeader)).toEqual(true);
      expect(wrapper.exists(EmployeePayTable)).toEqual(true);
      expect(wrapper.exists(EmployeePayActions)).toEqual(true);
    });
  });
});
