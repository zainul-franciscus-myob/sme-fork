import { Provider } from 'react-redux';
import React from 'react';

import * as views from './drawerViews';
import ActivitiesModule from './activities/ActivitiesModule';
import Drawer from './components/Drawer';
import HelpModule from './help/HelpModule';
import Store from '../store/Store';
import createDrawerDispatcher from './createDrawerDispatcher';
import drawerReducer from './drawerReducer';

export default class DrawerModule {
  constructor({
    integration,
    activitiesService,
  }) {
    this.store = new Store(drawerReducer);
    this.dispatcher = createDrawerDispatcher(this.store);
    this.subModules = {
      [views.HELP]: new HelpModule({ integration, closeDrawer: this.closeDrawer }),
      [views.ACTIVITIES]: new ActivitiesModule({
        integration, closeDrawer: this.closeDrawer, activitiesService,
      }),
    };

    // To avoid double scrollbars when in mobile mode, the body needs to know when the drawer is
    // open. Feelix has no "scrolling panel" components, so the body is appropriate, apparently.
    this.store.subscribe(({ isOpen }) => {
      if (isOpen) {
        document.body.classList.add('drawer-open');
      } else {
        document.body.classList.remove('drawer-open');
      }
    });

    this.store.subscribe(({ drawerView }) => {
      Object.keys(this.subModules)
        .forEach(mod => this.subModules[mod].setActive(drawerView === mod));
    });
  }

  toggleActivities = () => this.dispatcher.toggleActivities();

  toggleHelp = () => this.dispatcher.toggleHelp();

  closeDrawer = () => this.dispatcher.closeDrawer();

  render = (activities) => {
    const { store, subModules } = this;

    return (
      <Provider store={store}>
        <Drawer>
          {
            Object.values(subModules).map((sm) => {
              if (sm === subModules[views.ACTIVITIES]) return sm.getView(activities);
              return sm.getView();
            })
          }
        </Drawer>
      </Provider>
    );
  };

  run = (routeProps) => {
    Object.values(this.subModules).forEach(subModule => subModule.run(routeProps));
    const { routeParams: { businessId } } = routeProps;
    if (!businessId) {
      this.closeDrawer();
    }
  };
}
