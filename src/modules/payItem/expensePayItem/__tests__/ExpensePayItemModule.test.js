import ExpensePayItemModule from '../ExpensePayItemModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import expensePayItemReducer from '../expensePayItemReducer';

describe('ExpensePayItemModule', () => {
  const setupWithNew = () => {
    const store = new TestStore(expensePayItemReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};

    const module = new ExpensePayItemModule({
      store,
      integration,
      setRootView,
    });
    module.store = store;
    module.run();
    return { store, integration, module };
  };

  const setupWithEditedPage = () => {
    const components = setupWithNew();
    const { store, integration, module } = components;

    module.changeExpensePayItemInput({ key: 'description', value: 'things' });
    store.resetActions();
    integration.resetRequests();

    return components;
  };

  describe('confirmBeforeOpenCancelModal', () => {
    it('cancels and redirects directly when not edited', () => {
      const { module } = setupWithNew();
      module.openCancelModal = jest.fn();
      module.cancelExpensePayItem = jest.fn();

      module.confirmBeforeOpenCancelModal();

      expect(module.openCancelModal).not.toHaveBeenCalled();
      expect(module.cancelExpensePayItem).toHaveBeenCalled();
    });

    it('opens modal when edited', () => {
      const { module } = setupWithEditedPage();
      module.openCancelModal = jest.fn();
      module.cancelExpensePayItem = jest.fn();

      module.confirmBeforeOpenCancelModal();

      expect(module.openCancelModal).toHaveBeenCalled();
      expect(module.cancelExpensePayItem).not.toHaveBeenCalled();
    });
  });
});
