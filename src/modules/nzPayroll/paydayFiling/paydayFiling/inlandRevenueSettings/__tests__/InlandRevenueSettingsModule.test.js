import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { CREATE_ONBOARD_USER } from '../../PaydayFilingIntents';
import { onboardUrl } from '../../mappings/data/onboardUser.json';
import InlandRevenueSettingsActions from '../components/InlandRevenueSettingsActions';
import InlandRevenueSettingsModule from '../InlandRevenueSettingsModule';
import TestIntegration from '../../../../../../integration/TestIntegration';
import TestStore from '../../../../../../store/TestStore';
import paydayFilingReducer from '../../PaydayFilingReducer';

describe('InlandRevenueSettingsModule', () => {
  const constructInlandRevenueSettingsModule = () => {
    const store = new TestStore(paydayFilingReducer);
    const integration = new TestIntegration();

    const inlandRevenueSettingsModule = new InlandRevenueSettingsModule({
      store,
      integration,
      navigateTo: jest.fn(),
    });

    const view = inlandRevenueSettingsModule.getView();
    const wrappedView = <Provider store={store}>{view}</Provider>;
    const wrapper = mount(wrappedView);

    return {
      store,
      wrapper,
      integration,
      module: inlandRevenueSettingsModule,
    };
  };

  describe('Authorise button', () => {
    it('should navigate to ird onboard url on click', () => {
      const {
        wrapper,
        integration,
        module,
      } = constructInlandRevenueSettingsModule();

      const authoriseButton = wrapper
        .find(InlandRevenueSettingsActions)
        .find({ name: 'authorise' })
        .find('button');

      authoriseButton.simulate('click');

      const expected = onboardUrl;

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_ONBOARD_USER,
        }),
      ]);
      expect(module.navigateTo).toHaveBeenCalledWith(expected);
    });
  });
});
