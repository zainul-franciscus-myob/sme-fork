import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_DRAFT_PAY_RUN } from '../../PayRunIntents';
import EmployeePayListSubModule from '../EmployeePayListSubModule';
import PayRunModule from '../../PayRunModule';
import TestIntegration from '../../../../../../integration/TestIntegration';
import TestStore from '../../../../../../store/TestStore';
import createEmployeePayListDispatcher from '../createEmployeePayListDispatcher';
import createEmployeePayListIntegrator from '../createEmployeePayListIntegrator';
import createdDraftPayRun from '../../../mappings/data/payRun/createDraftPayRun.json';
import payRunReducer from '../../payRunReducer';

describe('EmployeePayListSubModule', () => {
  const constructEmployeePayListSubModule = () => {
    const integration = new TestIntegration();
    const pushMessage = () => {};
    const setRootView = () => <div />;
    const isToggleOn = () => true;
    const payRunModule = new PayRunModule({
      integration,
      setRootView,
      pushMessage,
      isToggleOn,
    });

    const store = new TestStore(payRunReducer);
    payRunModule.store = store;

    const employeePayListModule = new EmployeePayListSubModule({
      integration,
      store: payRunModule.store,
      pushMessage,
    });
    employeePayListModule.dispatcher = createEmployeePayListDispatcher(store);
    employeePayListModule.integrator = createEmployeePayListIntegrator(
      store,
      integration
    );

    const view = employeePayListModule.render();

    const wrappedView = <Provider store={payRunModule.store}>{view}</Provider>;

    const wrapper = mount(wrappedView);

    wrapper.update();
    return {
      wrapper,
      module: employeePayListModule,
      payRunModule,
      store: payRunModule.store,
    };
  };
  describe('Check dispatcher and reducer are linked', () => {
    const { payRunModule, module, store } = constructEmployeePayListSubModule();

    it('should hold id', () => {
      payRunModule.resetState();

      store.dispatch({
        intent: LOAD_DRAFT_PAY_RUN,
        createdDraftPayRun,
      });

      const employee = module.store.state.employeePayList.lines.find(
        (x) => x.employeeId === 21
      );
      expect(employee.employeeId).toEqual(21);
    });
  });
});
