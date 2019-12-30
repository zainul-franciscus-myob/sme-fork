import { Provider } from 'react-redux';
import React from 'react';

import { SET_FIELD } from './stpYourRoleIntents';
import Store from '../../../../../store/Store';
import StpYourRoleView from './components/StpYourRoleView';
import stpYourRoleReducer from './stpYourRoleReducer';

export default class StpYourRoleModule {
  constructor({ onPrevious }) {
    this.store = new Store(stpYourRoleReducer);
    this.onPrevious = onPrevious;
  }

  onFieldChange = ({ key, value }) => {
    this.store.dispatch({
      intent: SET_FIELD,
      key,
      value,
    });
  }

  onSearchClick = () => {

  }

  onNextClick = () => {}

  getView = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <StpYourRoleView
          onFieldChange={this.onFieldChange}
          onSearchClick={this.onSearchClick}
          onPreviousClick={this.onPrevious}
          onNextClick={this.onNextClick}
        />
      </Provider>
    );

    return wrappedView;
  }
}
