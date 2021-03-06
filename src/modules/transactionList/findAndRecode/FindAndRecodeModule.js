import { Provider } from 'react-redux';
import React from 'react';

import {
  getIsAccountsOrTaxCodesListEmpty,
  getIsRecodeLoading,
  getNoItemSelected,
  getRecodeItems,
} from './findAndRecodeSelectors';
import FindAndRecodeView from './components/FindAndRecodeView';
import ModalType from './types/ModalType';
import Store from '../../../store/Store';
import createFindAndRecodeDispatcher from './createFindAndRecodeDispatcher';
import createFindAndRecodeIntegrator from './createFindAndRecodeIntegrator';
import debounce from '../../../common/debounce/debounce';
import findAndRecodeReducer from './findAndRecodeReducer';

export default class FindAndRecodeModule {
  constructor({ integration, setAlert }) {
    this.store = new Store(findAndRecodeReducer);
    this.integrator = createFindAndRecodeIntegrator(this.store, integration);
    this.dispatcher = createFindAndRecodeDispatcher(this.store);
    this.setAlert = setAlert;
  }

  loadFindAndRecodeList = () => {
    this.dispatcher.unselectAllItems();
    this.dispatcher.setFindAndRecodeListLoadingState(true);
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setFindAndRecodeListLoadingState(false);
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.loadFindAndRecodeList(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setFindAndRecodeListLoadingState(false);
      this.dispatcher.setTableLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };

    this.integrator.loadFindAndRecodeList({ onSuccess, onFailure });
  };

  sortAndFilterFindAndRecodeList = () => {
    this.dispatcher.unselectAllItems();
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterFindAndRecodeList(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };

    this.integrator.sortAndFilterFindAndRecodeList({ onSuccess, onFailure });
  };

  loadFindAndRecodeListNextPage = () => {
    this.dispatcher.unselectAllItems();
    this.dispatcher.setNextPageLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setNextPageLoadingState(false);
      this.dispatcher.loadFindAndRecodeListNextPage(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setNextPageLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };

    this.integrator.loadFindAndRecodeListNextPage({ onSuccess, onFailure });
  };

  recode = () => {
    const recursiveRecode = (items) => {
      const [item, ...maybeRestItems] = items;
      const restItems = maybeRestItems ?? [];
      const isRecodeTerminated =
        getRecodeItems(this.store.getState()).length !== 0;

      if (item && isRecodeTerminated) {
        const onSuccess = () => {
          this.dispatcher.recodeItemSuccess(item.id);
          recursiveRecode(restItems);
        };
        const onFailure = ({ message }) => {
          this.dispatcher.recodeItemFailure(item.id, message);
          recursiveRecode(restItems);
        };
        this.integrator.recodeItem({
          id: item.id,
          onSuccess,
          onFailure,
        });
      } else {
        this.dispatcher.finishRecode();
      }
    };

    this.dispatcher.startRecode();
    this.dispatcher.closeRecodeOptions();
    this.dispatcher.closeModal();

    const recodeItems = getRecodeItems(this.store.getState());
    recursiveRecode(recodeItems);
  };

  stopRecode = () => {
    this.dispatcher.unselectAllItems();
  };

  updateFilters = ({ key, value }) => {
    this.dispatcher.updateFilterOptions(key, value);

    if (key === 'keywords') {
      debounce(this.sortAndFilterFindAndRecodeList)();
      return;
    }

    this.sortAndFilterFindAndRecodeList();
  };

  updateRecodeOptions = ({ key, value }) => {
    this.dispatcher.updateRecodeOptions(key, value);
  };

  resetFilters = () => {
    this.dispatcher.resetFilterOptions();
    this.sortAndFilterFindAndRecodeList();
  };

  sort = (orderBy) => {
    this.dispatcher.setSortOrder(orderBy);
    this.sortAndFilterFindAndRecodeList();
  };

  updatePeriod = (period) => {
    this.dispatcher.updatePeriod(period);
    this.sortAndFilterFindAndRecodeList();
  };

  getIsRecodeFinished = () => {
    const state = this.store.getState();
    return getNoItemSelected(state) || !getIsRecodeLoading(state);
  };

  openRecodeModal = () => {
    this.dispatcher.openModal({
      modalType: ModalType.RecodeModal,
    });
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    if (getIsAccountsOrTaxCodesListEmpty(this.store.getState())) {
      this.loadFindAndRecodeList();
    } else {
      this.sortAndFilterFindAndRecodeList();
    }
  };

  render = ({ pageHead, subHead, alert }) => {
    return (
      <Provider store={this.store}>
        <FindAndRecodeView
          alert={alert}
          pageHead={pageHead}
          subHead={subHead}
          onUpdateFilters={this.updateFilters}
          onUpdateRecodeOptions={this.updateRecodeOptions}
          onResetFilters={this.resetFilters}
          onPeriodChange={this.updatePeriod}
          onLoadMoreButtonClick={this.loadFindAndRecodeListNextPage}
          onSort={this.sort}
          onSelectAllItems={this.dispatcher.selectAllItems}
          onSelectItem={this.dispatcher.selectItem}
          onOpenRecodeModal={this.openRecodeModal}
          onCloseRecodeModal={this.dispatcher.closeModal}
          onConfirmRecode={this.recode}
          onOpenRecodeOptions={this.dispatcher.openRecodeOptions}
          onCloseRecodeOptions={this.dispatcher.closeRecodeOptions}
        />
      </Provider>
    );
  };
}
