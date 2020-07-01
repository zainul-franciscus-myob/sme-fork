import {
  ADD_RECEIVE_MONEY_LINE,
  CLOSE_MODAL,
  CREATE_RECEIVE_MONEY,
  DELETE_RECEIVE_MONEY,
  LOAD_DUPLICATE_RECEIVE_MONEY,
  LOAD_NEW_RECEIVE_MONEY,
  LOAD_RECEIVE_MONEY_DETAIL,
  OPEN_MODAL,
  SET_ALERT,
  SET_DUPLICATE_ID,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_RECEIVE_MONEY,
  UPDATE_RECEIVE_MONEY_HEADER,
  UPDATE_RECEIVE_MONEY_LINE,
} from '../../ReceiveMoneyIntents';
import {
  DUPLICATE_RECEIVE_MONEY,
  SUCCESSFULLY_SAVED_RECEIVE_MONEY,
} from '../../../../common/types/MessageTypes';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import ModalType from '../../ModalType';
import ReceiveMoneyDetailModule from '../ReceiveMoneyDetailModule';
import SaveActionType from '../components/SaveActionType';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createReceiveMoneyDetailDispatcher from '../createReceiveMoneyDetailDispatcher';
import createReceiveMoneyDetailIntegrator from '../createReceiveMoneyDetailIntegrator';
import receiveMoneyDetailReducer from '../receiveMoneyDetailReducer';

const getIntents = actions => actions.map(({ intent }) => intent);

const setup = () => {
  const store = new TestStore(receiveMoneyDetailReducer);
  const integration = new TestIntegration();
  const setRootView = () => { };
  const pushMessage = () => { };
  const popMessages = () => [];
  const isToggleOn = () => 'on';

  const module = new ReceiveMoneyDetailModule({
    integration,
    setRootView,
    pushMessage,
    popMessages,
    isToggleOn,
  });
  module.store = store;
  module.dispatcher = createReceiveMoneyDetailDispatcher({ store });
  module.integrator = createReceiveMoneyDetailIntegrator({ store, integration });

  return { store, integration, module };
};

export const setupWithNew = () => {
  const toolbox = setup();
  const { store, integration, module } = toolbox;

  module.run({
    receiveMoneyId: 'new',
    businessId: 'bizId',
    region: 'au',
  });
  store.resetActions();
  integration.resetRequests();

  return toolbox;
};

const setupWithExisting = () => {
  const toolbox = setup();
  const { store, integration, module } = toolbox;

  module.run({
    receiveMoneyId: '1',
    businessId: 'bizId',
    region: 'au',
  });
  store.resetActions();
  integration.resetRequests();

  return toolbox;
};

const setupWithDuplicate = () => {
  const toolbox = setup();
  const { store, integration, module } = toolbox;

  module.run({
    receiveMoneyId: 'new',
    duplicateId: '2',
    businessId: 'bizId',
    region: 'au',
  });
  store.resetActions();
  integration.resetRequests();

  return toolbox;
};

// eslint-disable-next-line import/prefer-default-export
export const setUpWithPageEdited = () => {
  const toolbox = setup();
  const { store, integration, module } = toolbox;

  module.run({
    businessId: 'bizId',
    region: 'au',
    receiveMoneyId: '1',
  });
  const lineIndex = 0;
  const lineKey = 'amount';
  const lineValue = '1.00';

  module.updateReceiveMoneyLine(lineIndex, lineKey, lineValue);
  store.resetActions();
  integration.resetRequests();

  return toolbox;
};

describe('ReceiveMoneyDetailModule', () => {
  describe('run', () => {
    it('should successfully load with new', () => {
      const { store, integration, module } = setup();

      module.run({ receiveMoneyId: 'new' });

      expect(store.getActions()).toEqual([
        expect.objectContaining({
          intent: SET_INITIAL_STATE,
        }),
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({
          intent: LOAD_NEW_RECEIVE_MONEY,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_NEW_RECEIVE_MONEY,
        }),
      ]);
    });

    it('should successfully load with existing', () => {
      const { store, integration, module } = setup();

      module.run({ receiveMoneyId: '1' });

      expect(store.getActions()).toEqual([
        expect.objectContaining({
          intent: SET_INITIAL_STATE,
        }),
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({
          intent: LOAD_RECEIVE_MONEY_DETAIL,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_RECEIVE_MONEY_DETAIL,
        }),
      ]);
    });

    it('should successfully load with duplicate', () => {
      const { store, integration, module } = setup();
      module.popMessages = () => [{
        type: DUPLICATE_RECEIVE_MONEY,
        duplicateId: '🦖',
      }];

      module.run({ businessId: 'bizId', receiveMoneyId: 'new' });

      expect(store.getActions()).toEqual([
        expect.objectContaining({
          intent: SET_INITIAL_STATE,
        }),
        {
          intent: SET_DUPLICATE_ID,
          duplicateId: '🦖',
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({
          intent: LOAD_DUPLICATE_RECEIVE_MONEY,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_DUPLICATE_RECEIVE_MONEY,
          urlParams: {
            businessId: 'bizId',
            duplicateId: '🦖',
          },
        }),
      ]);
    });

    it('should fail to load', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_RECEIVE_MONEY_DETAIL);

      module.run({ receiveMoneyId: '1' });

      expect(store.getActions()).toEqual([
        expect.objectContaining({
          intent: SET_INITIAL_STATE,
        }),
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_FAIL,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_RECEIVE_MONEY_DETAIL,
        }),
      ]);
    });
  });

  describe('deleteReceiveMoney', () => {
    it('should delete', () => {
      const { store, integration, module } = setupWithExisting();
      module.navigateTo = jest.fn();

      module.deleteReceiveMoney();
      const actions = store.getActions();

      expect(getIntents(actions)).toEqual([
        SET_SUBMITTING_STATE,
        CLOSE_MODAL,
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_RECEIVE_MONEY,
        }),
      ]);

      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/transactionList');
    });

    it('should fail', () => {
      const { store, integration, module } = setupWithExisting();
      integration.mapFailure(DELETE_RECEIVE_MONEY);

      module.deleteReceiveMoney();
      const actions = store.getActions();

      expect(getIntents(actions)).toEqual([
        SET_SUBMITTING_STATE,
        CLOSE_MODAL,
        SET_SUBMITTING_STATE,
        SET_ALERT,
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_RECEIVE_MONEY,
        }),
      ]);
    });
  });

  // TODO: Test redirect after save once Nav Spike is done
  describe('saveReceiveMoney', () => {
    it('should create', () => {
      const { store, integration, module } = setupWithNew();
      module.navigateTo = jest.fn();
      module.pushMessage = jest.fn();

      module.saveReceiveMoney();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_RECEIVE_MONEY,
        }),
      ]);

      expect(module.pushMessage).toHaveBeenCalledWith(
        expect.objectContaining({ type: SUCCESSFULLY_SAVED_RECEIVE_MONEY }),
      );
      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/transactionList');
    });

    it('should update', () => {
      const { store, integration, module } = setupWithExisting();
      module.navigateTo = jest.fn();
      module.pushMessage = jest.fn();

      module.saveReceiveMoney();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_RECEIVE_MONEY,
        }),
      ]);

      expect(module.pushMessage).toHaveBeenCalledWith(
        expect.objectContaining({ type: SUCCESSFULLY_SAVED_RECEIVE_MONEY }),
      );
      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/transactionList');
    });

    it('should fail', () => {
      const { store, integration, module } = setupWithNew();
      integration.mapFailure(CREATE_RECEIVE_MONEY);

      module.saveReceiveMoney();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        expect.objectContaining({
          intent: SET_ALERT,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_RECEIVE_MONEY,
        }),
      ]);
    });

    it('should fail and close modal if there was a modal open', () => {
      const { store, integration, module } = setupWithNew();
      integration.mapFailure(CREATE_RECEIVE_MONEY);

      module.addReceiveMoneyLine({ amount: '1' }); // Make page dirty
      module.handlePageTransition('url'); // open unsaved modal
      store.resetActions();

      module.saveReceiveMoney();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        expect.objectContaining({
          intent: SET_ALERT,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_RECEIVE_MONEY,
        }),
      ]);
    });

    it('should do an early return', () => {
      const { store, integration, module } = setupWithNew();

      // Setup
      module.setSubmittingState(true);
      store.resetActions();

      module.saveReceiveMoney();
      const actions = store.getActions();

      expect(getIntents(actions)).toEqual([]);

      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('saveAndDuplicate', () => {
    it('successfully create and redirect', () => {
      const { store, integration, module } = setupWithNew();
      integration.mapSuccess(CREATE_RECEIVE_MONEY, { message: '🙏', id: '🦖' });
      module.navigateTo = jest.fn();
      module.pushMessage = jest.fn();

      module.saveAnd(SaveActionType.SAVE_AND_DUPLICATE);

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_RECEIVE_MONEY,
        }),
      ]);
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_RECEIVE_MONEY,
        content: '🙏',
      });
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: DUPLICATE_RECEIVE_MONEY,
        duplicateId: '🦖',
      });
      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/receiveMoney/new');
    });

    it('successfully update and redirect', () => {
      const { store, integration, module } = setupWithExisting();
      integration.mapSuccess(UPDATE_RECEIVE_MONEY, { message: '🙏' });
      module.navigateTo = jest.fn();
      module.pushMessage = jest.fn();

      module.saveAnd(SaveActionType.SAVE_AND_DUPLICATE);

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_RECEIVE_MONEY,
        }),
      ]);
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: SUCCESSFULLY_SAVED_RECEIVE_MONEY,
        content: '🙏',
      });
      expect(module.pushMessage).toHaveBeenCalledWith({
        type: DUPLICATE_RECEIVE_MONEY,
        duplicateId: '1',
      });
      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/receiveMoney/new');
    });
  });

  describe('saveAndCreateNew', () => {
    it('should save and navigate to create receive money page', () => {
      const { store, integration, module } = setupWithDuplicate();
      module.navigateTo = jest.fn();

      module.saveAnd(SaveActionType.SAVE_AND_CREATE_NEW);

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_RECEIVE_MONEY,
        }),
      ]);

      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/receiveMoney/new');
    });
  });

  describe('updateHeaderOptions', () => {
    it('should update header options', () => {
      const { store, module } = setupWithExisting();

      module.updateHeaderOptions({ key: 'isReportable', value: true });
      const actions = store.getActions();

      expect(getIntents(actions)).toEqual([UPDATE_RECEIVE_MONEY_HEADER]);
    });
  });

  describe('updateReceiveMoneyLine', () => {
    it('should update a receive money line', () => {
      const { store, module } = setupWithExisting();

      const lineIndex = 0;
      const lineKey = 'amount';
      const lineValue = '1.00';

      module.updateReceiveMoneyLine(lineIndex, lineKey, lineValue);

      expect(store.getActions()).toEqual([{
        intent: UPDATE_RECEIVE_MONEY_LINE,
        lineIndex,
        lineKey,
        lineValue,
      }]);
    });
  });

  describe('addReceiveMoneyLine', () => {
    it('should add a receive money line', () => {
      const { store, module } = setupWithNew();

      const line = {
        amount: '10.00',
      };

      module.addReceiveMoneyLine(line);

      expect(store.getActions()).toEqual([
        {
          intent: ADD_RECEIVE_MONEY_LINE,
        },
        {
          intent: UPDATE_RECEIVE_MONEY_LINE,
          lineIndex: 0,
          lineKey: 'amount',
          lineValue: '10.00',
        },
      ]);
    });
  });

  describe('openCancelModal', () => {
    it('should open a cancel modal', () => {
      const { module, store } = setUpWithPageEdited();

      module.openCancelModal();
      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: ModalType.CANCEL,
            url: expect.any(String),
          },
        },
      ]);
    });

    it('should redirect to transaction list', () => {
      const { module } = setupWithExisting();
      module.navigateTo = jest.fn();

      module.openCancelModal();

      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/transactionList');
    });
  });

  describe('openDeleteModal', () => {
    it('should open a delete modal', () => {
      const { module, store } = setupWithExisting();

      module.openDeleteModal();
      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: ModalType.DELETE,
            url: expect.any(String),
          },
        },
      ]);
    });
  });

  describe('handlePageTransition', () => {
    it('should open an unsaved modal', () => {
      const { module, store } = setUpWithPageEdited();

      const url = 'some-url';

      module.handlePageTransition(url);
      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: ModalType.UNSAVED,
            url,
          },
        },
      ]);
    });

    it('should redirect to a url', () => {
      const { module } = setupWithExisting();
      module.navigateTo = jest.fn();

      const url = 'some-url';

      module.handlePageTransition(url);
      expect(module.navigateTo).toHaveBeenCalledWith(url);
    });
  });

  describe('saveHandler', () => {
    it('should do nothing when a cancel modal is open', () => {
      const { module, store } = setUpWithPageEdited();
      module.openCancelModal();
      store.resetActions();

      module.saveHandler();
      expect(store.getActions()).toEqual([]);
    });

    it('should do nothing when a delete modal is open', () => {
      const { module, store } = setUpWithPageEdited();
      module.openDeleteModal();
      store.resetActions();

      module.saveHandler();
      expect(store.getActions()).toEqual([]);
    });

    it('should save when an unsaved modal is open', () => {
      const { module, store, integration } = setUpWithPageEdited();
      module.navigateTo = jest.fn();
      module.openUnsavedModal();
      store.resetActions();

      module.saveHandler();

      expect(store.getActions()).not.toEqual([]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_RECEIVE_MONEY,
        }),
      ]);
      expect(module.navigateTo).toHaveBeenCalledWith('/#/au/bizId/transactionList');
    });
  });

  describe('handleOnDiscardClickFromUnsavedModal', () => {
    it('navigate to pending url', () => {
      const { module } = setUpWithPageEdited();
      module.navigateTo = jest.fn();
      module.openUnsavedModal('😻');

      module.saveHandler();

      expect(module.navigateTo).toHaveBeenCalledWith('😻');
    });
  });
});
