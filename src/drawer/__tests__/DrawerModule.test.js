import * as views from '../drawerViews';
import { TOGGLE_HELP_ON } from '../drawerIntents';
import DrawerModule from '../DrawerModule';
import TestIntegration from '../../integration/TestIntegration';
import TestStore from '../../store/TestStore';
import createDrawerDispatcher from '../createDrawerDispatcher';
import createRootDispatcher from '../../root/createRootDispatcher';
import drawerReducer from '../drawerReducer';
import rootReducer from '../../root/rootReducer';
import tasksService from '../../root/services/tasks';

describe('DrawerModule', () => {
  const getTaskService = (integration) => {
    const rootModuleStore = new TestStore(rootReducer);
    const rootModuleDispatcher = createRootDispatcher(rootModuleStore);

    return tasksService(rootModuleDispatcher, integration, rootModuleStore);
  };

  const setUp = () => {
    const constructPath = () => {};
    const isActiveRoute = () => {};

    const integration = new TestIntegration();
    const theTasksService = getTaskService(integration);

    const module = new DrawerModule({
      integration,
      theTasksService,
      constructPath,
      isActiveRoute,
    });

    const store = new TestStore(drawerReducer);
    module.store = store;
    module.dispatcher = createDrawerDispatcher(store);

    return {
      module,
      store,
      integration,
    };
  };

  const setUpWithRun = () => {
    const toolbox = setUp();
    const { module, store, integration } = toolbox;

    const routeParams = {
      businessId: '👻',
      region: 'au',
    };

    module.run({ routeParams });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('loadHelpContentBasedOnRoute', () => {
    it('should run setCustomHelpPageRoute with the provided helpPageRoute', () => {
      const { module } = setUpWithRun();
      const helpPageRoute = '/customRouteName';

      module.subModules[views.HELP].setCustomHelpPageRoute = jest.fn();

      module.loadHelpContentBasedOnRoute(helpPageRoute);

      expect(
        module.subModules[views.HELP].setCustomHelpPageRoute
      ).toHaveBeenCalledWith(helpPageRoute);
    });

    it('should toggle help on', () => {
      const { module, store } = setUpWithRun();
      const helpPageRoute = '/customRouteName';

      module.subModules[views.HELP].setCustomHelpPageRoute = jest.fn();

      module.loadHelpContentBasedOnRoute(helpPageRoute);

      expect(store.getActions()).toEqual([
        {
          intent: TOGGLE_HELP_ON,
        },
      ]);
    });
  });
});
