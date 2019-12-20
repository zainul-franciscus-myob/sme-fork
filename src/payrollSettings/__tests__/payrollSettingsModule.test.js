import { ReadOnly } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { tabIds } from '../tabItems';
import PayrollSettingsModule from '../PayrollSettingsModule';
import YearInput from '../../components/autoFormatter/YearInput/YearInput';
import loadGeneralPayrollInformationResponse from '../../integration/data/payrollSettings/loadGeneralPayrollInformationResponse';

describe('PayrollSettingsModule', () => {
  const constructPayrollSettingsModule = (generalPayrollInformationResponse) => {
    const context = { tab: tabIds.general };
    const popMessages = () => (['']);
    const replaceURLParams = url => (url);

    const integration = {
      read: ({ onSuccess }) => {
        onSuccess(
          generalPayrollInformationResponse || loadGeneralPayrollInformationResponse,
        );
      },
    };

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const module = new PayrollSettingsModule({
      integration,
      setRootView,
      popMessages,
      replaceURLParams,
    });

    module.run(context);
    module.dispatcher.setGeneralPayrollInformationIsLoading(false);
    wrapper.update();

    return wrapper;
  };

  describe('Current Year field', () => {
    it('sets the current year to ReadOnly when current year is provided', () => {
      const wrapper = constructPayrollSettingsModule();

      const currentYearField = wrapper.find({ testid: 'currentYearField' }).find(ReadOnly);
      expect(currentYearField).toHaveLength(1);

      expect(currentYearField.contains('2019')).toEqual(true);
    });

    it('sets the current year to YearInput when current year is not provided', () => {
      const generalPayrollInformationResponse = {
        ...loadGeneralPayrollInformationResponse,
        currentYear: null,
      };

      const wrapper = constructPayrollSettingsModule(generalPayrollInformationResponse);

      const currentYearField = wrapper.find({ testid: 'currentYearField' }).find(YearInput);

      expect(currentYearField).toHaveLength(1);
    });
  });
});
