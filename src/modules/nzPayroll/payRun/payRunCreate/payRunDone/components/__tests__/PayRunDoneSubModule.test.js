import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { findButtonWithTestId } from '../../../../../../../common/tests/selectors';
import PayRunDoneSubModule from '../../PayRunDoneSubModule';
import RouteName from '../../../../../../../router/RouteName';
import TestStore from '../../../../../../../store/TestStore';
import payRunReducer from '../../../payRunReducer';

describe('PayRunDoneSubModule', () => {
  const constructPayRunDoneSubModule = (featureToggles) => {
    const store = new TestStore(payRunReducer);
    const payRunDoneSubModule = new PayRunDoneSubModule({
      store,
      navigateToName: jest.fn(),
      featureToggles,
    });

    const view = payRunDoneSubModule.render();

    const wrappedView = <Provider store={store}>{view}</Provider>;

    const wrapper = mount(wrappedView);

    wrapper.update();
    return {
      store,
      wrapper,
      payRunDoneSubModule,
    };
  };

  describe('Payday button', () => {
    it('should send to Payday filing report page', () => {
      const { wrapper, payRunDoneSubModule } = constructPayRunDoneSubModule({
        isNzPayRunsViewEnabled: true,
      });
      const paydayFilingButton = findButtonWithTestId(
        wrapper,
        'paydayFilingReportButton'
      );

      paydayFilingButton.simulate('click');
      expect(payRunDoneSubModule.navigateToName).toBeCalledWith(
        RouteName.PAYDAY_FILING_NZ
      );
    });

    it('should not redirect to Payday filing report if Payday feature disabled', () => {
      const { wrapper } = constructPayRunDoneSubModule({
        isNzPayRunsViewEnabled: false,
      });
      const paydayFilingButton = findButtonWithTestId(
        wrapper,
        'paydayFilingReportButton'
      );

      expect(paydayFilingButton).toHaveLength(0);
    });
  });
});
