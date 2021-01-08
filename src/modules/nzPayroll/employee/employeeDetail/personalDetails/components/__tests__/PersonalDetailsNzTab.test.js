import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_DETAIL } from '../../../../EmployeeNzIntents';
import Contact from '../Contact';
import Personal from '../Personal';
import PersonalDetailsNzTab from '../PersonalDetailsNzTab';
import TestStore from '../../../../../../../store/TestStore';
import employeeDetailNzReducer from '../../../employeeDetailNzReducer';
import employeeDetails from '../../../../mappings/data/employeeDetailEntry';

describe('<PersonalDetailsNzTab />', () => {
  const { personalDetail } = employeeDetails;
  let store;
  const onPersonalDetailsChange = jest.fn();

  beforeEach(() => {
    store = new TestStore(employeeDetailNzReducer);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  const setup = () => {
    store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, payload: employeeDetails });
    const wrapper = mountWithProvider(
      <PersonalDetailsNzTab
        onPersonalDetailsChange={onPersonalDetailsChange}
        personalDetail={personalDetail}
      />
    );
    return { wrapper, onPersonalDetailsChange };
  };

  it('should render PersonalDetailsNzTab', () => {
    const { wrapper } = setup();

    const view = wrapper.find(PersonalDetailsNzTab);

    expect(view).toHaveLength(1);
  });

  it('should have supplied props', () => {
    const { wrapper } = setup();

    const view = wrapper.find(PersonalDetailsNzTab);

    expect(view.props()).toMatchObject({
      personalDetail,
      onPersonalDetailsChange,
    });
  });

  it.each([
    [Personal, 'Personal'],
    [Contact, 'Contact'],
  ])('should render %p with label %p)', (field, label) => {
    const { wrapper } = setup();

    const view = wrapper.find(PersonalDetailsNzTab);

    expect(view.find(field).find({ label }).exists()).toBeTruthy();
  });
});
