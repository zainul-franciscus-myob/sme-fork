import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import {
  LOAD_DRAFT_PAY_RUN,
  NEXT_STEP,
  OPEN_PREVIOUS_STEP_MODAL,
  SET_TOTAL_TAKE_HOME_PAY,
} from '../../PayRunIntents';
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
    const featureToggles = {
      isHolidaysAndLeaveLinesEnabled: true,
    };
    const payRunModule = new PayRunModule({
      integration,
      setRootView,
      pushMessage,
      featureToggles,
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

  describe('Draft pay run module props', () => {
    it('should dispatch open previous state modal when previous button is clicked', () => {
      const { wrapper, store } = constructdraftPayRunSubModule();

      const previousButton = wrapper.find({ name: 'previous' }).find('button');

      previousButton.simulate('click');

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_PREVIOUS_STEP_MODAL,
        },
      ]);
    });

    it('should dispatch next step action when next button is clicked', () => {
      const { wrapper, store } = constructdraftPayRunSubModule();

      const nextButton = wrapper.find({ name: 'save' }).find('button');

      nextButton.simulate('click');

      expect(store.getActions()).toEqual([
        {
          intent: SET_TOTAL_TAKE_HOME_PAY,
          totalTakeHomePay: '0.00',
        },
        {
          intent: NEXT_STEP,
        },
      ]);
    });
  });
});
