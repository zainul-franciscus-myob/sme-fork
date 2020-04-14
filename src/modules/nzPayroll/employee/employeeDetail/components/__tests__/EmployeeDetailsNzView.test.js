import {
  BaseTemplate,
  Card,
  PageHead,
  Tabs,
} from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_DETAIL } from '../../../EmployeeNzIntents';
import { mainTabItems } from '../../tabItems';
import ContactDetailsNzTabModule from '../../contactDetails/ContactDetailsNzTabModule';
import EmployeeDetailNzView from '../EmployeeDetailNzView';
import LoadingState from '../../../../../../components/PageView/LoadingState';
import PageView from '../../../../../../components/PageView/PageView';
import TestStore from '../../../../../../store/TestStore';
import contactDetailsNzTab from '../../contactDetails/components/contactDetailsNzTab';
import employeeDetailNzReducer from '../../employeeDetailNzReducer';

describe('<EmployeeDetailNzView />', () => {
  let store;

  beforeEach(() => {
    store = new TestStore(employeeDetailNzReducer);
  });

  const mountWithProvider = component => mount(component,
    { wrappingComponent: Provider, wrappingComponentProps: { store } });

  it('should list the employee contact details', () => {
    const response = {
      contactDetail: {
        firstName: 'Bob',
        lastName: 'The builder',
        isInactive: false,
        employeeNumber: '0012',
      },
    };

    const wrapper = mountWithProvider(<EmployeeDetailNzView
      tabView={new ContactDetailsNzTabModule()}
    />);

    store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, ...response });

    wrapper.update();

    expect(wrapper.find(PageView).props()).toEqual(expect.objectContaining({
      loadingState: LoadingState.LOADING_SUCCESS,
    }));

    expect(wrapper.find(BaseTemplate).exists()).toBe(true);

    expect(wrapper.find(PageHead).props()).toEqual(expect.objectContaining({
      title: `${response.contactDetail.firstName} ${response.contactDetail.lastName}`,
    }));

    expect(wrapper.find(Tabs).props()).toEqual(expect.objectContaining({
      items: mainTabItems,
    }));

    const card = wrapper.find(Card);
    expect(card.exists()).toBe(true);

    expect(wrapper.find(contactDetailsNzTab).exists()).toBe(true);
  });
});
