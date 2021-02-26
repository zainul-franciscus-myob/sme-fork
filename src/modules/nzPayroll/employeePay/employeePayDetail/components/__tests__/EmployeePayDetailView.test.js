import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import {
  SET_EMPLOYEE_PAY_DETAIL,
  SET_LOADING_STATE,
} from '../../EmployeePayDetailIntents';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import EmployeePayDetailButtons from '../EmployeePayDetailButtons';
import EmployeePayDetailHeader from '../EmployeePayDetailHeader';
import EmployeePayDetailTable from '../EmployeePayDetailTable';
import EmployeePayDetailView from '../EmployeePayDetailView';
import LoadingState from '../../../../../../components/PageView/LoadingState';
import TestStore from '../../../../../../store/TestStore';
import employeePayDetail from '../../../mappings/data/loadEmployeePayDetail';
import employeePayDetailReducer from '../../employeePayDetailReducer';

describe('<EmployeePayDetailView />', () => {
  let store;

  beforeEach(() => {
    store = new TestStore(employeePayDetailReducer);
  });

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  const setup = () => {
    const response = employeePayDetail;
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState: LoadingState.LOADING_SUCCESS,
    });
    store.dispatch({ intent: SET_EMPLOYEE_PAY_DETAIL, response });
    return mountWithProvider(<EmployeePayDetailView />);
  };

  it('should render the EmployeePayDetailHeader', () => {
    const wrapper = setup();
    wrapper.update();
    expect(wrapper.find(EmployeePayDetailHeader).exists()).toEqual(true);
    expect(wrapper.find({ name: 'account' }).first().text()).toEqual('Account');
  });

  it('should render the EmployeePayDetailTable', () => {
    const wrapper = setup();
    wrapper.update();
    expect(wrapper.find(EmployeePayDetailTable).exists()).toEqual(true);
    expect(wrapper.find({ columnName: 'Pay items' }).exists()).toEqual(true);
  });

  it('should render the EmployeePayDetailButtons', () => {
    const wrapper = setup();
    wrapper.update();
    expect(wrapper.find(EmployeePayDetailButtons).exists()).toEqual(true);
  });

  it('should not render delete confirmation modal by default', () => {
    const wrapper = setup();
    wrapper.update();
    expect(wrapper.find(DeleteConfirmationModal).exists()).toEqual(false);
  });
});
