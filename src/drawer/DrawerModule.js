import { Provider } from 'react-redux';
import React from 'react';

import Drawer from './components/Drawer';
import HelpModule from './help/HelpModule';
import Store from '../store/Store';
import createDrawerDispatcher from './createDrawerDispatcher';
import drawerReducer from './drawerReducer';
import keyMap from '../hotKeys/keyMap';
import setupHotKeys from '../hotKeys/setupHotKeys';

export default class DrawerModule {
  constructor({
    integration, setDrawerView,
  }) {
    this.setDrawerView = setDrawerView;
    this.store = new Store(drawerReducer);
    this.dispatcher = createDrawerDispatcher(this.store);
    this.subModules = {
      helpModule: new HelpModule({
        integration,
        drawerDispatcher: this.dispatcher,
      }),
    };
  }

  toggleDrawer = () => {
    this.dispatcher.toggleDrawer();
  }

  closeDrawer = () => {
    this.dispatcher.closeDrawer();
  }

  render = () => {
    const view = this.subModules.helpModule.getView();

    const wrappedView = (
      <Provider store={this.store}>
        <Drawer>
          {view}
        </Drawer>
      </Provider>
    );

    this.setDrawerView(wrappedView);
  }

  handlers = {
    ESCAPE_ACTION: this.closeDrawer,
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    // TODO: add condition for which module to run on route change
    this.subModules.helpModule.run(context);
  }
}
