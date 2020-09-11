import {
  LOAD_ITEM_COMBOBOX_OPTIONS,
  LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS,
  LOAD_ITEM_COMBOBOX_OPTION_BY_ID,
  SEARCH_COMBOBOX_ITEM,
  SET_ITEM_COMBOBOX_LOADING_STATE,
  SET_ITEM_COMBOBOX_OPTIONS_LOADING_STATE,
} from '../../InventoryIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import AlertType from '../../../../common/types/AlertType';
import ItemComboboxModule from '../ItemComboboxModule';
import ItemTypes from '../ItemTypes';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createItemComboboxDispatcher from '../createItemComboboxDispatcher';
import createItemComboboxIntegrator from '../createItemComboboxIntegrator';
import itemComboboxReducer from '../itemComboboxReducer';

describe('ItemComboboxModule', () => {
  const setUp = () => {
    const integration = new TestIntegration();
    const onAlert = jest.fn();

    const module = new ItemComboboxModule({ integration, onAlert });

    const store = new TestStore(itemComboboxReducer);
    module.store = store;
    module.dispatcher = createItemComboboxDispatcher({ store });
    module.integrator = createItemComboboxIntegrator({
      store,
      integration,
    });

    return { module, store, integration };
  };

  const setUpWithRun = () => {
    const { module, store, integration } = setUp();

    module.run({
      businessId: 'businessId',
      region: 'au',
      itemType: ItemTypes.ITEM_LINE,
    });
    store.resetActions();
    integration.resetRequests();

    return { module, integration, store };
  };

  describe('run', () => {
    it('successfully load item options', () => {
      const { module, store, integration } = setUp();
      const context = {
        businessId: 'businessId',
        region: 'au',
        itemType: ItemTypes.Bought,
      };

      module.run(context);

      expect(store.getActions()).toEqual([
        { intent: SET_INITIAL_STATE, context },
        { intent: SET_ITEM_COMBOBOX_OPTIONS_LOADING_STATE, isLoading: true },
        {
          intent: SET_ITEM_COMBOBOX_OPTIONS_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({ intent: LOAD_ITEM_COMBOBOX_OPTIONS }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_ITEM_COMBOBOX_OPTIONS }),
      ]);
    });
  });

  describe('load', () => {
    const setUpWithItemOptions = (itemOptions) => {
      const { module, store, integration } = setUp();
      integration.mapSuccess(LOAD_ITEM_COMBOBOX_OPTIONS, { itemOptions });
      module.run({
        businessId: 'businessId',
        region: 'au',
        itemType: ItemTypes.Bought,
      });
      store.resetActions();
      integration.resetRequests();

      return { module, integration, store };
    };

    it('successfully load options by ids', () => {
      const { module, store, integration } = setUpWithItemOptions([
        { id: '1' },
      ]);

      const itemIds = ['2', '3'];
      module.load(itemIds);

      expect(store.getActions()).toEqual([
        { intent: SET_ITEM_COMBOBOX_LOADING_STATE, isLoading: true },
        { intent: SET_ITEM_COMBOBOX_LOADING_STATE, isLoading: false },
        expect.objectContaining({ intent: LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS,
          content: itemIds,
        }),
      ]);
    });
  });

  describe('loadItemComboboxOptions', () => {
    it('successfully load', () => {
      const { module, store, integration } = setUpWithRun();

      module.loadItemOptions();

      expect(store.getActions()).toEqual([
        { intent: SET_ITEM_COMBOBOX_OPTIONS_LOADING_STATE, isLoading: true },
        {
          intent: SET_ITEM_COMBOBOX_OPTIONS_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({ intent: LOAD_ITEM_COMBOBOX_OPTIONS }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_ITEM_COMBOBOX_OPTIONS }),
      ]);
    });
  });

  describe('searchItemCombobox', () => {
    it('successfully load', () => {
      const { module, store, integration } = setUpWithRun();
      const onSuccess = jest.fn();

      module.searchItem({
        keywords: 'keywords',
        onSuccess,
        onFailure: () => {},
      });

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SEARCH_COMBOBOX_ITEM }),
      ]);
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  describe('openItemModal', () => {
    it('open item modal', () => {
      const { module } = setUpWithRun();
      module.itemModalModule.run = jest.fn();

      module.openItemModal();

      expect(module.itemModalModule.run).toHaveBeenCalled();
    });
  });

  describe('loadItemComboboxOptionAfterCreate', () => {
    it('load newly created item and add option to the list', () => {
      const { module, store, integration } = setUpWithRun();
      integration.mapSuccess(LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS, [
        {
          id: '39',
          name: 'apple',
        },
      ]);
      module.onAlert = jest.fn();

      module.loadItemAfterCreate({
        itemId: '39',
        message: 'Success!',
      });

      expect(module.onAlert).toHaveBeenCalledWith({
        type: AlertType.SUCCESS,
        message: 'Success!',
      });
      expect(store.getActions()).toEqual([
        { intent: SET_ITEM_COMBOBOX_LOADING_STATE, isLoading: true },
        { intent: SET_ITEM_COMBOBOX_LOADING_STATE, isLoading: false },
        expect.objectContaining({
          intent: LOAD_ITEM_COMBOBOX_OPTION_BY_ID,
          item: { id: '39', name: 'apple' },
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS }),
      ]);
    });
  });
});
