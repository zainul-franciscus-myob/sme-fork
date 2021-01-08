import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_DETAIL } from '../../../../EmployeeNzIntents';
import Employment from '../Employment';
import EmploymentDetailsNzTab from '../EmploymentDetailsTab';
import KiwiSaver from '../KiwiSaver';
import TaxDeclaration from '../TaxDeclaration';
import TestStore from '../../../../../../../store/TestStore';
import employeeDetailNzReducer from '../../../employeeDetailNzReducer';
import employeeDetails from '../../../../mappings/data/employeeDetailEntry';

describe('<EmploymentDetailsNzTab />', () => {
  let store;
  beforeEach(() => {
    store = new TestStore(employeeDetailNzReducer);
  });

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  const setup = () => {
    store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, payload: employeeDetails });
    const wrapper = mountWithProvider(<EmploymentDetailsNzTab />);
    return wrapper;
  };

  describe('EmploymentDetailsNzTab', () => {
    it.each([
      [Employment, 'Employment'],
      [TaxDeclaration, 'Tax declaration'],
      [KiwiSaver, 'KiwiSaver'],
    ])('should render component with label)', (field, label) => {
      const wrapper = setup();
      const view = wrapper.find(EmploymentDetailsNzTab);

      expect(view.find(field).find({ label }).exists()).toBeTruthy();
    });
  });

  it('should render EmploymentDetailsNzTab', () => {
    const wrapper = setup();
    const view = wrapper.find(EmploymentDetailsNzTab);

    expect(view).toHaveLength(1);
  });

  it('Employment should have proper props', () => {
    const wrapper = setup();
    const employment = wrapper.find(Employment);

    expect(employment.props()).toHaveProperty('employmentDetails');
    expect(employment.props()).toHaveProperty('employmentStatusOptions');
    expect(employment.props()).toHaveProperty('onEmploymentDetailsChange');
  });

  it('KiwiSaver should have proper props', () => {
    const wrapper = setup();
    const kiwiSaver = wrapper.find(KiwiSaver);

    expect(kiwiSaver.props()).toHaveProperty('kiwiSaverDetails');
    expect(kiwiSaver.props()).toHaveProperty('kiwiSaverOptions');
    expect(kiwiSaver.props()).toHaveProperty('onKiwiSaverDetailsChange');
  });

  it('TaxDeclaration should have proper props', () => {
    const wrapper = setup();
    const tax = wrapper.find(TaxDeclaration);

    expect(tax.props()).toHaveProperty('taxDetails');
    expect(tax.props()).toHaveProperty('taxCodeOptions');
    expect(tax.props()).toHaveProperty('onTaxDetailsChange');
  });
});
