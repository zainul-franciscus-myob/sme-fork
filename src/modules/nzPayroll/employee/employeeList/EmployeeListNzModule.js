import { Provider } from 'react-redux';
import React from 'react';

import Store from '../../../../store/Store';
import createEmployeeListNzDispatcher from './createEmployeeListNzDispatcher';
import employeeListNzReducer from './employeeListNzReducer';


export default class EmployeeListNzModule {
  constructor({ setRootView, integration }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.store = new Store(employeeListNzReducer);
    this.dispatcher = createEmployeeListNzDispatcher(this.store);
  }

  render = () => {
    const wrappedView = <Provider store={this.store}><h1>Hello World</h1></Provider>;
    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setInitialState = context => this.dispatcher.setInitialState(context);

  resetState = () => this.dispatcher.resetState();

  run(context) {
    this.setInitialState(context);
    this.render();
  }
}
