import {
  LOAD_HELP_CONTENT,
  LOAD_HELP_CONTENT_FAILURE,
  LOAD_HELP_USER_SETTINGS,
  SET_CUSTOM_HELP_PAGE_ROUTE,
  SET_LOADING_STATE,
} from '../HelpIntents';
import HelpModule from '../HelpModule';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import createHelpDispatcher from '../createHelpDispatcher';
import createHelpIntegrator from '../createHelpIntegrator';
import helpReducer from '../helpReducer';

describe('HelpModule', () => {
  const setUp = () => {
    const closeDrawer = () => {};

    const integration = new TestIntegration();
    const module = new HelpModule({
      integration,
      closeDrawer,
    });
    const store = new TestStore(helpReducer);
    module.store = store;
    module.dispatcher = createHelpDispatcher(store);
    module.integrator = createHelpIntegrator(store, integration);

    return {
      module,
      store,
      integration,
    };
  };

  const setUpWithRun = () => {
    const toolbox = setUp();
    const { module, store, integration } = toolbox;

    const currentRouteName = '/testRouteName';
    const routeParams = {
      businessId: '👻',
      region: 'au',
    };

    module.run({ currentRouteName, routeParams });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('loadHelpContent', () => {
    const loadHelpContentActions = [
      {
        intent: SET_LOADING_STATE,
        isLoading: true,
      },
      {
        intent: LOAD_HELP_USER_SETTINGS,
        userHelpSettings: {
          userType: 'sme',
        },
      },
      {
        intent: SET_LOADING_STATE,
        isLoading: false,
      },
      expect.objectContaining({
        intent: LOAD_HELP_CONTENT,
      }),
      {
        intent: SET_CUSTOM_HELP_PAGE_ROUTE,
        helpPageRoute: '',
      },
    ];

    it('should load help content based on default route if custom route is not defined', () => {
      const { module, store, integration } = setUpWithRun();

      module.loadHelpContent();

      expect(store.getActions()).toEqual([...loadHelpContentActions]);

      expect(integration.getRequests()).toEqual([
        {
          intent: LOAD_HELP_USER_SETTINGS,
          urlParams: { businessId: '👻' },
          params: undefined,
        },
        {
          intent: LOAD_HELP_CONTENT,
          urlParams: { businessId: '👻' },
          params: {
            region: 'au',
            helpPageRoute: '/testRouteName',
            userType: 'sme',
          },
        },
      ]);
    });

    it('should load help content of custom route if it has been set', () => {
      const { module, store, integration } = setUpWithRun();

      store.setState({
        ...store.getState(),
        customHelpPageRoute: '/customRouteName',
      });

      module.loadHelpContent();

      expect(store.getActions()).toEqual([...loadHelpContentActions]);

      expect(integration.getRequests()).toEqual([
        {
          intent: LOAD_HELP_USER_SETTINGS,
          urlParams: { businessId: '👻' },
          params: undefined,
        },
        {
          intent: LOAD_HELP_CONTENT,
          urlParams: { businessId: '👻' },
          params: {
            region: 'au',
            helpPageRoute: '/customRouteName',
            userType: 'sme',
          },
        },
      ]);
    });

    it('should not load help content if no businessId is present', () => {
      const { module, store, integration } = setUpWithRun();

      store.setState({
        ...store.getState(),
        businessId: '',
      });

      module.loadHelpContent();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });

    describe('should load help user settings if user settings not defined', () => {
      it('successfully loads user settings and gets help content', () => {
        const { module, store, integration } = setUpWithRun();
        store.setState({
          ...store.getState(),
          userHelpSettings: undefined,
        });

        module.loadHelpContent();

        expect(store.getActions()).toEqual([...loadHelpContentActions]);

        expect(integration.getRequests()).toEqual([
          {
            intent: LOAD_HELP_USER_SETTINGS,
            urlParams: { businessId: '👻' },
            params: undefined,
          },
          {
            intent: LOAD_HELP_CONTENT,
            urlParams: { businessId: '👻' },
            params: {
              region: 'au',
              helpPageRoute: '/testRouteName',
              userType: 'sme',
            },
          },
        ]);
      });

      it('fails to load user settings', () => {
        const { module, store, integration } = setUpWithRun();
        store.setState({
          ...store.getState(),
          userHelpSettings: undefined,
        });
        integration.mapFailure(LOAD_HELP_USER_SETTINGS);

        module.loadHelpContent();

        expect(store.getActions()).toEqual([
          {
            intent: SET_LOADING_STATE,
            isLoading: true,
          },
          {
            intent: LOAD_HELP_CONTENT_FAILURE,
          },
        ]);

        expect(integration.getRequests()).toEqual([
          {
            intent: LOAD_HELP_USER_SETTINGS,
            urlParams: { businessId: '👻' },
            params: undefined,
          },
        ]);
      });
    });

    describe('should not load help user settings if user settings are defined', () => {
      it('successfully loads help content', () => {
        const { module, store, integration } = setUpWithRun();
        store.setState({
          ...store.getState(),
          userHelpSettings: {
            userType: 'sme',
          },
        });

        module.loadHelpContent();

        expect(store.getActions()).toEqual([
          {
            intent: SET_LOADING_STATE,
            isLoading: true,
          },
          {
            intent: SET_LOADING_STATE,
            isLoading: false,
          },
          expect.objectContaining({
            intent: LOAD_HELP_CONTENT,
          }),
          {
            intent: SET_CUSTOM_HELP_PAGE_ROUTE,
            helpPageRoute: '',
          },
        ]);

        expect(integration.getRequests()).toEqual([
          {
            intent: LOAD_HELP_CONTENT,
            urlParams: { businessId: '👻' },
            params: {
              region: 'au',
              helpPageRoute: '/testRouteName',
              userType: 'sme',
            },
          },
        ]);
      });

      it('fails to load help content', () => {
        const { module, store, integration } = setUpWithRun();
        store.setState({
          ...store.getState(),
          userHelpSettings: {
            userType: 'sme',
          },
        });
        integration.mapFailure(LOAD_HELP_CONTENT);

        module.loadHelpContent();

        expect(store.getActions()).toEqual([
          {
            intent: SET_LOADING_STATE,
            isLoading: true,
          },
          {
            intent: SET_LOADING_STATE,
            isLoading: false,
          },
          {
            intent: LOAD_HELP_CONTENT_FAILURE,
          },
          {
            intent: SET_CUSTOM_HELP_PAGE_ROUTE,
            helpPageRoute: '',
          },
        ]);

        expect(integration.getRequests()).toEqual([
          {
            intent: LOAD_HELP_CONTENT,
            urlParams: { businessId: '👻' },
            params: {
              region: 'au',
              helpPageRoute: '/testRouteName',
              userType: 'sme',
            },
          },
        ]);
      });
    });

    it('should not load help content if help user settings and help content are already loaded', () => {
      const { module, store, integration } = setUpWithRun();

      store.setState({
        ...store.getState(),
        userHelpSettings: {
          userType: 'sme',
        },
        document: {
          fields: {
            pageId: '/testRouteName',
          },
        },
      });

      module.loadHelpContent();

      expect(store.getActions()).toEqual([
        {
          intent: SET_LOADING_STATE,
          isLoading: true,
        },
        {
          intent: SET_LOADING_STATE,
          isLoading: false,
        },
      ]);

      expect(integration.getRequests()).toEqual([]);
    });
  });
});
