import { GENERATE_IN_TRAY_EMAIL, LOAD_IN_TRAY, SORT_AND_FILTER_IN_TRAY_LIST } from './InTrayIntents';
import {
  getAppliedFilterOptions,
  getFilterOptions,
  getOrderBy,
  getSortOrder,
} from './selectors/InTrayListSelectors';
import { getBusinessId } from './selectors/InTraySelectors';

const createInTrayIntegrator = (store, integration) => ({
  loadInTray: ({ onSuccess, onFailure }) => {
    const intent = LOAD_IN_TRAY;

    const businessId = getBusinessId(store.getState());

    integration.read({
      intent,
      urlParams: { businessId },
      onSuccess,
      onFailure,
    });
  },

  filterInTrayList: ({ onSuccess, onFailure }) => {
    const intent = SORT_AND_FILTER_IN_TRAY_LIST;

    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);

    const params = {
      ...filterOptions,
      sortOrder,
      orderBy,
    };

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  sortInTrayList: ({
    orderBy, sortOrder, onSuccess, onFailure,
  }) => {
    const intent = SORT_AND_FILTER_IN_TRAY_LIST;

    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const filterOptions = getAppliedFilterOptions(state);

    integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  },

  generateNewEmail: ({ onSuccess, onFailure }) => {
    const intent = GENERATE_IN_TRAY_EMAIL;

    const businessId = getBusinessId(store.getState());

    integration.write({
      intent,
      urlParams: { businessId },
      onSuccess,
      onFailure,
    });
  },
});

export default createInTrayIntegrator;
