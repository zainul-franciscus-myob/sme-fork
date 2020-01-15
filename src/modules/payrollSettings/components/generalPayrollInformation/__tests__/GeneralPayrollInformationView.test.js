import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import * as timesheetFeatureToggles from '../../../../../common/featureToggles/timesheetEnabled';
import GeneralPayrollInformationView from '../GeneralPayrollInformationView';
import Store from '../../../../../store/Store';
import TimesheetsSettingsView from '../TimesheetsSettingsView';
import payrollSettingsReducer from '../../../reducer/payrollSettingsReducer';

describe('GeneralPayrollInformationView', () => {
  describe('REACT_APP_FEATURE_TIMESHEET', () => {
    it('hides the timesheet settings when feature toggle is off', () => {
      timesheetFeatureToggles.default = false;
      const store = new Store(payrollSettingsReducer);
      const wrapper = mount(
        <Provider store={store}>
          <GeneralPayrollInformationView
            listeners={{}}
          />
        </Provider>,
      );
      const timesheetSettings = wrapper.find(TimesheetsSettingsView);

      expect(timesheetSettings).toHaveLength(0);
    });

    it('shows the timesheet settings when feature toggle is on', () => {
      timesheetFeatureToggles.default = true;
      const store = new Store(payrollSettingsReducer);
      const wrapper = mount(
        <Provider store={store}>
          <GeneralPayrollInformationView
            listeners={{}}
          />
        </Provider>,
      );
      const timesheetSettings = wrapper.find(TimesheetsSettingsView);

      expect(timesheetSettings).toHaveLength(1);
    });
  });
});
