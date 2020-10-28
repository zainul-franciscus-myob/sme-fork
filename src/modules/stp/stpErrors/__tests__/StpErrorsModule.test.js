import { Alert, Button, PageHead } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { LOAD_STP_ERRORS } from '../stpErrorsIntents';
import { findButtonWithTestId } from '../../../../common/tests/selectors';
import NoErrorsSplash from '../components/NoErrorsSplash';
import StpErrorsModule from '../StpErrorsModule';
import loadStpErrors from '../mappings/data/loadStpErrors';

describe('stpErrorsModule', () => {
  const replaceURLParamsDefault = () => {};
  const defaultMockIntegration = {
    read: ({ onSuccess }) => onSuccess(loadStpErrors),
  };

  const constructModule = ({
    integration = defaultMockIntegration,
    context = {},
    replaceURLParams = replaceURLParamsDefault,
  }) => {
    const contextPassed = {
      region: 'au',
      businessId: '123',
      ...context,
    };

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const module = new StpErrorsModule({
      integration,
      setRootView,
      replaceURLParams,
    });

    module.run(contextPassed);
    wrapper.update();

    return { module, wrapper };
  };

  describe('run', () => {
    it('can render without crashing', () => {
      const { wrapper } = constructModule({});

      const pageHead = wrapper.find(PageHead);

      expect(pageHead.contains('Single Touch Payroll errors')).toBeTruthy();
    });

    it('loads errors from bff', () => {
      const integration = { read: jest.fn() };

      constructModule({ integration });

      expect(integration.read).toHaveBeenCalledWith(
        expect.objectContaining({
          intent: LOAD_STP_ERRORS,
        })
      );
    });

    it('shows an alert if the load errors call fails', () => {
      const errorMessage = 'this is the error message';
      const integration = {
        read: ({ onFailure }) => onFailure({ message: errorMessage }),
      };

      const { wrapper } = constructModule({ integration });

      const alert = wrapper.find(Alert);
      expect(alert).toHaveLength(1);
      expect(alert.prop('type')).toEqual('danger');
      expect(alert.contains(errorMessage)).toBeTruthy();
    });

    it('calls replaceURLParams with the source', () => {
      const replaceURLParams = jest.fn();
      const context = {
        source: 'foo',
      };

      constructModule({
        context,
        replaceURLParams,
      });

      expect(replaceURLParams).toHaveBeenCalledWith({
        source: 'foo',
      });
    });
  });

  describe('errors present', () => {
    describe('refresh card', () => {
      it('renders the refresh button', () => {
        const { wrapper } = constructModule({});

        const refreshButton = findButtonWithTestId(wrapper, 'refreshButton');

        expect(refreshButton).toHaveLength(1);
      });

      it('loads new errors from bff when refresh button is clicked', () => {
        const integration = {
          read: jest.fn(({ onSuccess }) => onSuccess(loadStpErrors)),
        };
        const { wrapper } = constructModule({ integration });
        const refreshButton = findButtonWithTestId(wrapper, 'refreshButton');

        refreshButton.simulate('click');

        // First call from module.run call.
        expect(integration.read).toHaveBeenCalledTimes(2);
        expect(integration.read).toHaveBeenLastCalledWith(
          expect.objectContaining({
            intent: LOAD_STP_ERRORS,
          })
        );
      });
    });
  });

  describe('no errors present', () => {
    const integration = {
      read: ({ onSuccess }) =>
        onSuccess({
          hasRegistrationErrors: false,
          businessDetail: [],
          employees: [],
          payItems: [],
        }),
    };

    it('should render the no errors splash screen', () => {
      const { wrapper } = constructModule({ integration });

      expect(wrapper.find(NoErrorsSplash)).toHaveLength(1);
    });

    describe('no source (STP Setup)', () => {
      it('renders the STP setup splash screen', () => {
        const { wrapper } = constructModule({ integration });
        const splashScreen = wrapper.find(NoErrorsSplash);

        expect(splashScreen.text()).toContain(
          'Now you can start to set up Single Touch Payroll reporting'
        );
      });

      it('redirects the page to stp setup the get started button is clicked', () => {
        const { wrapper } = constructModule({ integration });
        const splashScreen = wrapper.find(NoErrorsSplash);

        splashScreen.find(Button).simulate('click');

        expect(window.location.href).toContain('stp/setup');
      });
    });

    describe('?source=payRunCreate', () => {
      const context = {
        source: 'payRunCreate',
      };

      it('renders the pay run setup splash screen', () => {
        const { wrapper } = constructModule({ integration, context });
        const splashScreen = wrapper.find(NoErrorsSplash);

        expect(splashScreen.text()).toContain(
          'All of your payroll information meets ATO requirements for Single Touch Payroll reporting.'
        );
      });

      it.skip('attempts to close the window when button is clicked', () => {
        const { wrapper } = constructModule({ integration, context });
        const splashScreen = wrapper.find(NoErrorsSplash);
        window.close = jest.fn();

        splashScreen.find(Button).simulate('click');

        expect(window.close).toHaveBeenCalled();
      });
    });
  });
});
