import { ReadOnly } from '@myob/myob-widgets';
import TestRenderer from 'react-test-renderer';

import { tabIds } from '../tabItems';
import PayrollSettingsModule from '../PayrollSettingsModule';
import YearInput from '../../components/autoFormatter/YearInput/YearInput';
import loadGeneralPayrollInformationResponse from '../../integration/data/payrollSettings/loadGeneralPayrollInformationResponse';

describe('Testing with react-test-renderer', () => {
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
      write: ({ onSuccess }) => { onSuccess({}); },
    };

    let rendered;
    const setRootView = (component) => {
      rendered = TestRenderer.create(component);
    };

    const module = new PayrollSettingsModule({
      integration,
      setRootView,
      popMessages,
      replaceURLParams,
    });

    module.run(context);
    module.dispatcher.setGeneralPayrollInformationIsLoading(false);

    return rendered.root;
  };

  describe('Current Year field', () => {
    it('sets the current year to ReadOnly when current year is provided', () => {
      const testInstance = constructPayrollSettingsModule();

      const currentYearField = testInstance.findByProps({ testId: 'currentYearField' });
      expect(currentYearField).toBeDefined();
      expect(currentYearField.type).toBe(ReadOnly);
      expect(currentYearField.props.children).toEqual('2019');
    });

    it('sets the current year to YearInput when current year is not provided', () => {
      const generalPayrollInformationResponse = {
        ...loadGeneralPayrollInformationResponse,
        currentYear: null,
      };

      const testInstance = constructPayrollSettingsModule(generalPayrollInformationResponse);

      const currentYearField = testInstance.findByProps({ testId: 'currentYearField' });
      expect(currentYearField).toBeDefined();
      expect(currentYearField.type).toBe(YearInput);
      expect(currentYearField.props.value).toBeTruthy();
    });
  });
});
