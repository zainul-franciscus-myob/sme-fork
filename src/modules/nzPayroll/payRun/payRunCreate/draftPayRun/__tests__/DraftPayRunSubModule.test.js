import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_DRAFT_PAY_RUN } from '../../PayRunIntents';
import DraftPayRunSubModule from '../DraftPayRunSubModule';
import PayRunModule from '../../PayRunModule';
import TestIntegration from '../../../../../../integration/TestIntegration';
import TestStore from '../../../../../../store/TestStore';
import createDraftPayRunDispatcher from '../createDraftPayRunDispatcher';
import createDraftPayRunIntegrator from '../createDraftPayRunIntegrator';
import createdDraftPayRun from '../../../mappings/data/payRun/createDraftPayRun.json';
import payRunReducer from '../../payRunReducer';

describe('DraftPayRunSubModule', () => {
  const constructdraftPayRunSubModule = () => {
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

    const draftPayRunModule = new DraftPayRunSubModule({
      integration,
      store: payRunModule.store,
      pushMessage,
    });
    draftPayRunModule.dispatcher = createDraftPayRunDispatcher(store);
    draftPayRunModule.integrator = createDraftPayRunIntegrator(
      store,
      integration
    );

    const view = draftPayRunModule.render();

    const wrappedView = <Provider store={payRunModule.store}>{view}</Provider>;

    const wrapper = mount(wrappedView);

    wrapper.update();
    return {
      wrapper,
      module: draftPayRunModule,
      payRunModule,
      store: payRunModule.store,
    };
  };
  describe('Check dispatcher and reducer are linked', () => {
    const { payRunModule, module, store } = constructdraftPayRunSubModule();

    it('should hold id', () => {
      payRunModule.resetState();

      store.dispatch({
        intent: LOAD_DRAFT_PAY_RUN,
        createdDraftPayRun,
      });

      const employee = module.store.state.draftPayRun.lines.find(
        (x) => x.employeeId === 21
      );
      expect(employee.employeeId).toEqual(21);
    });
  });
});
