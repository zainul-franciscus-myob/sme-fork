import { Alert, PageHead } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { LOAD_STP_ERRORS } from '../stpErrorsIntents';
import { findButtonWithTestId } from '../../../../common/tests/selectors';
import StpErrorsModule from '../StpErrorsModule';
import loadStpErrors from '../mappings/data/loadStpErrors';

describe('stpErrorsModule', () => {
  const defaultMockIntegration = {
    read: ({ onSuccess }) => onSuccess(loadStpErrors),
  };

  const constructModule = ({ integration = defaultMockIntegration }) => {
    const context = {
      region: 'au',
      businessId: '123',
    };

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const module = new StpErrorsModule({
      integration,
      setRootView,
    });

    module.run(context);
    wrapper.update();

    return { module, wrapper };
  };

  describe('run', () => {
    it('can render without crashing', () => {
      const { wrapper } = constructModule({});

      const pageHead = wrapper.find(PageHead);

      expect(pageHead.contains('Single Touch Payroll setup errors')).toBeTruthy();
    });

    it('loads errors from bff', () => {
      const integration = { read: jest.fn() };

      constructModule({ integration });

      expect(integration.read).toHaveBeenCalledWith(expect.objectContaining({
        intent: LOAD_STP_ERRORS,
      }));
    });

    it('shows an alert if the load errors call fails', () => {
      const errorMessage = 'this is the error message';
      const integration = { read: ({ onFailure }) => onFailure({ message: errorMessage }) };

      const { wrapper } = constructModule({ integration });

      const alert = wrapper.find(Alert);
      expect(alert).toHaveLength(1);
      expect(alert.prop('type')).toEqual('danger');
      expect(alert.contains(errorMessage)).toBeTruthy();
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
        expect(integration.read).toHaveBeenLastCalledWith(expect.objectContaining({
          intent: LOAD_STP_ERRORS,
        }));
      });
    });
  });
});
