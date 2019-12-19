import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import GeneralJournalDetailView from '../GeneralJournalDetailView';
import Store from '../../../../../store/Store';
import generalJournalDetailReducer from '../../generalJournalDetailReducer';

describe('GeneralJournalView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(generalJournalDetailReducer);
    const view = (
      <Provider store={store}>
        <GeneralJournalDetailView
          isCreating
          onUpdateHeaderOptions={() => {}}
          onSaveButtonClick={() => {}}
          onCancelButtonClick={() => {}}
          onDeleteButtonClick={() => {}}
          onCancelModal={() => {}}
          onDeleteModal={() => {}}
          onCloseModal={() => {}}
          onDismissAlert={() => {}}
          onUpdateRow={() => {}}
          onAddRow={() => {}}
          onRemoveRow={() => {}}
          onRowInputBlur={() => {}}
        />
      </Provider>
    );


    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
