import { Button } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import * as intents from '../payRunDetailNzIntents';
import LoadingFailPageState from '../../../../../components/PageView/LoadingFailPageState';
import LoadingState from '../../../../../components/PageView/LoadingState';
import PayRunDetailNzModule from '../PayRunDetailNzModule';
import PayRunDetailView from '../components/PayRunDetailView';
import TestIntegration from '../../../../../integration/TestIntegration';
import TestStore from '../../../../../store/TestStore';
import payRunDetailNzDispatcher from '../PayRunDetailNzDispatcher';
import payRunDetailNzIntegrator from '../PayRunDetailNzIntegrator';
import payRunDetailNzReducer from '../payRunDetailNzReducer';
import payRunDetails from '../../mappings/data/payRunDetail/loadPayRunDetail';

describe('PayRunDetailModule', () => {
  afterEach(jest.clearAllMocks);

  const replaceURLParams = jest.fn();
  const setup = () => {
    const store = new TestStore(payRunDetailNzReducer);
    const integration = new TestIntegration();
    const popMessages = () => [];
    const pushMessages = () => [];

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const module = new PayRunDetailNzModule({
      integration,
      setRootView,
      replaceURLParams,
      popMessages,
      pushMessages,
    });
    module.store = store;
    module.dispatcher = payRunDetailNzDispatcher({ store });
    module.integrator = payRunDetailNzIntegrator({ store, integration });

    module.run({});
    store.resetActions();
    integration.resetRequests();

    return {
      store,
      integration,
      module,
      wrapper,
    };
  };

  const context = { businessId: '1', payRunId: '2' };

  it('Should make a call to load pay run on module run', () => {
    const { integration, module, store, wrapper } = setup();

    module.run(context);

    expect(integration.getRequests()).toEqual([
      expect.objectContaining({
        intent: intents.LOAD_PAY_RUN_DETAILS,
        urlParams: { ...context },
      }),
    ]);

    expect(store.getActions()).toContainEqual({
      intent: intents.LOAD_PAY_RUN_DETAILS,
      response: payRunDetails,
    });

    wrapper.update();
    expect(wrapper.find(PayRunDetailView).exists()).toBe(true);
  });

  it('Should make a call to load pay run on module run fails', () => {
    const { integration, module, store, wrapper } = setup();
    integration.mapFailure(intents.LOAD_PAY_RUN_DETAILS);

    module.run(context);

    expect(integration.getRequests()).toEqual([
      expect.objectContaining({
        intent: intents.LOAD_PAY_RUN_DETAILS,
        urlParams: { ...context },
      }),
    ]);

    expect(store.getActions()).toContainEqual({
      intent: intents.SET_LOADING_STATE,
      loadingState: LoadingState.LOADING_FAIL,
    });

    wrapper.update();
    expect(wrapper.find(PayRunDetailView).exists()).toBe(true);
    expect(wrapper.find(LoadingFailPageState).exists()).toBe(true);
  });

  it('Should make go back to Payrun list when pressing GoBack button', () => {
    const { module, wrapper } = setup();
    module.run(context);
    wrapper.update();

    wrapper.find({ name: 'goBackButton' }).find(Button).simulate('click');

    expect(window.location.href.endsWith('/payRun')).toBe(true);
  });
});
