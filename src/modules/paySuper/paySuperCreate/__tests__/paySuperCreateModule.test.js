
import Adapter from 'enzyme-adapter-react-16/build';
import Enzyme, { mount } from 'enzyme/build';

import AuthoriseModal from '../components/AuthoriseModal';
import PaySuperCreateModule from '../PaySuperCreateModule';
import loadAccountsAndSuperPaymentsResponse from '../mappings/data/loadAccountsAndSuperPayments';

Enzyme.configure({ adapter: new Adapter() });


describe('paySuperCreateModule', () => {
  const constructPaySuperCreateModule = () => {
    const context = {};
    const popMessages = () => (['']);
    const replaceURLParams = url => (url);

    const integration = {
      read: ({ onSuccess }) => {
        onSuccess(
          loadAccountsAndSuperPaymentsResponse,
        );
      },
      write: ({ onSuccess }) => { onSuccess({}); },
    };

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const module = new PaySuperCreateModule({
      integration,
      setRootView,
      popMessages,
      replaceURLParams,
    });


    module.run(context);
    module.setIsLoading(false);
    wrapper.update();

    return {
      wrapper,
      module,
    };
  };

  describe('authorization modal', () => {
    it('does renders the authorise modal when recordPaySuper is called', () => {
      const { wrapper, module } = constructPaySuperCreateModule();

      module.recordPaySuper();
      wrapper.update();

      expect(wrapper.find(AuthoriseModal)).toHaveLength(1);
    });

    it('does not render the modal on page load', () => {
      const { wrapper } = constructPaySuperCreateModule();

      expect(wrapper.find(AuthoriseModal)).toHaveLength(0);
    });
  });

  describe('authorization code modal', () => {
    it('closes the authorise modal when openAuthoriseModal is called', () => {
      const { wrapper, module } = constructPaySuperCreateModule();

      module.recordPaySuper();
      module.openAuthoriseModal();
      wrapper.update();

      expect(wrapper.find(AuthoriseModal)).toHaveLength(0);
    });
  });
});
