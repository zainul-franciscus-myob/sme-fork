import { ADD_SPEND_MONEY_LINE } from '../../SpendMoneyIntents';
import SpendMoneyDetailModule from '../SpendMoneyDetailModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createSpendMoneyDispatcher from '../createSpendMoneyDispatcher';
import createSpendMoneyIntegrator from '../createSpendMoneyIntegrator';
import spendMoneyDetailReducer from '../spendMoneyDetailReducer';

describe('SpendMoneyDetailModule', () => {
  const setup = () => {
    const store = new TestStore(spendMoneyDetailReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};
    const pushMessage = () => {};

    const module = new SpendMoneyDetailModule({ integration, setRootView, pushMessage });
    module.store = store;
    module.dispatcher = createSpendMoneyDispatcher(store);
    module.integrator = createSpendMoneyIntegrator(store, integration);

    return { store, integration, module };
  };

  const setupWithNew = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({ spendMoneyId: 'new' });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('addSpendMoneyLine', () => {
    it('adds a new spend money line', () => {
      const { module, store } = setupWithNew();

      const newlyAddedLine = {
        amount: '10',
      };

      module.addSpendMoneyLine(newlyAddedLine);

      expect(store.getActions()).toEqual([
        {
          intent: ADD_SPEND_MONEY_LINE,
          line: newlyAddedLine,
        },
      ]);
    });
  });
});
