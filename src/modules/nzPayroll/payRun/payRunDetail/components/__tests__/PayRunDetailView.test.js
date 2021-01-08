import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import {
  LOAD_PAY_RUN_DETAILS,
  SET_LOADING_STATE,
} from '../../payRunDetailNzIntents';
import LoadingFailPageState from '../../../../../../components/PageView/LoadingFailPageState';
import LoadingState from '../../../../../../components/PageView/LoadingState';
import PageView from '../../../../../../components/PageView/PageView';
import PayRunDetailEmployeesTable from '../PayRunDetailEmployeesTable';
import PayRunDetailEmployeesTableBody from '../PayRunDetailEmployeesTableBody';
import PayRunDetailHeader from '../PayRunDetailHeader';
import PayRunDetailView from '../PayRunDetailView';
import TestStore from '../../../../../../store/TestStore';
import loadPayRunDetail from '../../../mappings/data/payRunDetail/loadPayRunDetail';
import payRunDetailNzReducer from '../../payRunDetailNzReducer';

describe('<PayRunDetailView />', () => {
  let store;

  beforeEach(() => {
    store = new TestStore(payRunDetailNzReducer);
  });

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  const setup = () => {
    const response = loadPayRunDetail;
    store.dispatch({ intent: LOAD_PAY_RUN_DETAILS, response });
    return mountWithProvider(<PayRunDetailView />);
  };

  it('should set PageView loading state to true', () => {
    const wrapper = setup();

    expect(wrapper.find(PayRunDetailView).exists()).toBe(true);
    expect(wrapper.find(PageView).props()).toHaveProperty(
      'loadingState',
      LoadingState.LOADING
    );
  });

  it('should set PageView loading state to during failure', () => {
    const wrapper = setup();
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState: LoadingState.LOADING_FAIL,
    });
    wrapper.update();

    expect(wrapper.find(PayRunDetailView).exists()).toBe(true);
    expect(wrapper.find(LoadingFailPageState).exists()).toBe(true);
    expect(wrapper.find(PageView).props()).toHaveProperty(
      'loadingState',
      LoadingState.LOADING_FAIL
    );
  });

  it('should render the header by default', () => {
    const wrapper = setup();
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState: LoadingState.LOADING_SUCCESS,
    });
    wrapper.update();
    expect(wrapper.find(PayRunDetailHeader).exists()).toBeTruthy();
  });

  it('should render the payrun details employee table', () => {
    const wrapper = setup();
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState: LoadingState.LOADING_SUCCESS,
    });
    wrapper.update();
    expect(wrapper.find(PayRunDetailEmployeesTable).exists()).toBeTruthy();
    expect(wrapper.find(PayRunDetailEmployeesTableBody).exists()).toBeTruthy();
  });
});
