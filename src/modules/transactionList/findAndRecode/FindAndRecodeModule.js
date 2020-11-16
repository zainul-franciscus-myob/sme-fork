import { Provider } from 'react-redux';
import React from 'react';

import FindAndRecodeView from './components/FindAndRecodeView';
import Store from '../../../store/DebugStore';
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

  sortAndFilterFindAndRecodeList = () => {
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
    this.dispatcher.setRecodeLoadingState(true);
    this.dispatcher.closeRecode();

    const onSuccess = ({ message }) => {
      this.dispatcher.setRecodeLoadingState(false);
      this.dispatcher.unselectAllItems();
      this.setAlert({ message, type: 'success' });
      this.sortAndFilterFindAndRecodeList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setRecodeLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };

    this.integrator.recode({ onSuccess, onFailure });
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

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.sortAndFilterFindAndRecodeList();
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
          onRecode={this.recode}
          onOpenRecode={this.dispatcher.openRecode}
          onCloseRecode={this.dispatcher.closeRecode}
        />
      </Provider>
    );
  };
}
