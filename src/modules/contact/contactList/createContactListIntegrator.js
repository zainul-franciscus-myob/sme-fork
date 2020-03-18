import { LOAD_CONTACT_LIST, LOAD_CONTACT_LIST_NEXT_PAGE, SORT_AND_FILTER_CONTACT_LIST } from '../ContactIntents';
import {
  getContactListUrlParams,
  getFilterContactListParams,
  getLoadContactListNextPageParams,
} from './contactListSelector';

const createContactListIntegrator = (store, integration) => ({
  loadContactList: ({ onSuccess, onFailure }) => {
    const intent = LOAD_CONTACT_LIST;

    const state = store.getState();
    const urlParams = getContactListUrlParams(state);
    const params = { offset: 0 };

    integration.read({
      intent, urlParams, params, onSuccess, onFailure,
    });
  },
  sortAndFilterContactList: ({ onSuccess, onFailure }) => {
    const intent = SORT_AND_FILTER_CONTACT_LIST;

    const state = store.getState();
    const urlParams = getContactListUrlParams(state);
    const params = getFilterContactListParams(state);

    integration.read({
      intent, urlParams, params, onSuccess, onFailure,
    });
  },
  loadContactListNextPage: ({ onSuccess, onFailure }) => {
    const intent = LOAD_CONTACT_LIST_NEXT_PAGE;

    const state = store.getState();
    const urlParams = getContactListUrlParams(state);
    const params = getLoadContactListNextPageParams(state);

    integration.read({
      intent, urlParams, params, onSuccess, onFailure,
    });
  },
});

export default createContactListIntegrator;
