import { Provider } from 'react-redux';
import React from 'react';

import { getShowDrawer } from './DrawerSelectors';
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
        drawerStore: this.store,
        drawerDispatcher: this.dispatcher,
      }),
    };
  }

  toggleDrawer = () => {
    this.dispatcher.toggleDrawer();
    if (getShowDrawer(this.store.getState())) {
      // TODO: Add logic to decide which sub-module action to be called
      this.subModules.helpModule.loadHelpContent();
    }
  }

  closeDrawer = () => {
    this.dispatcher.closeDrawer();
  }

  render = () => {
    const { store, subModules } = this;
    const view = subModules.helpModule.getView();

    return (
      <Provider store={store}>
        <Drawer>
          { view }
        </Drawer>
      </Provider>
    );
  }

  handlers = {
    ESCAPE_ACTION: this.closeDrawer,
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    // TODO: add condition for which sub-module to run on route change
    this.subModules.helpModule.run(context);
  }
}
