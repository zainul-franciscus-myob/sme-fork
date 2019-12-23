import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import SalesSettingsDetailView from '../SalesSettingsDetailView';
import Store from '../../../../../store/Store';
import salesSettingsDetailReducer from '../../salesSettingsDetailReducer';

describe('SalesSettingsView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(salesSettingsDetailReducer);
    const view = (
      <Provider store={store}>
        <SalesSettingsDetailView
          onUpdateSalesSettingsItem={() => {}}
          onSalesSettingsSave={() => {}}
          onTabSelect={() => {}}
          onUpdateEmailSettings={() => {}}
          onSaveEmailSettings={() => {}}
          onSaveButtonClick={() => {}}
          onDismissAlert={() => {}}
          onModalConfirm={() => {}}
          onModalCancel={() => {}}
          alert={{}}
        />
      </Provider>
    );


    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
