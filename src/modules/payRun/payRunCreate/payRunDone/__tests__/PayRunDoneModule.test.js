import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { findButtonWithTestId } from '../../../../../common/tests/selectors';
import PayRunDoneModule from '../PayRunDoneModule';
import PayRunModule from '../../PayRunModule';

describe('PayRunDoneModule', () => {
  const constructPayRunDoneModule = () => {
    const integration = { write: ({ onSuccess }) => { onSuccess({ message: 'success' }); } };
    const pushMessage = () => {};
    const setRootView = () => (<div />);
    const featureToggles = {
      isPayRunSCATEnabled: true,
    };
    const payRunModule = new PayRunModule({
      integration, setRootView, pushMessage, featureToggles,
    });

    const payRunDoneModule = new PayRunDoneModule({
      integration, store: payRunModule.store, pushMessage, featureToggles,
    });
    const view = payRunDoneModule.getView();

    const wrappedView = (
      <Provider store={payRunModule.store}>
        {view}
      </Provider>
    );

    const wrapper = mount(wrappedView);

    wrapper.update();
    return { wrapper, module: payRunDoneModule };
  };

  describe('openLeanEngageSurvey', () => {
    it('is called when the close button is clicked', () => {
      const { wrapper, module } = constructPayRunDoneModule();
      module.openLeanEngageSurvey = jest.fn();

      const closeButton = findButtonWithTestId(wrapper, 'closeButton');
      closeButton.simulate('click');

      expect(module.openLeanEngageSurvey).toHaveBeenCalled();
    });

    it('is called when tryToNavigate function is called', () => {
      const { module } = constructPayRunDoneModule();
      module.openLeanEngageSurvey = jest.fn();
      const navigateFunction = jest.fn();

      module.tryToNavigate(navigateFunction);

      expect(module.openLeanEngageSurvey).toHaveBeenCalled();
    });
  });
});
