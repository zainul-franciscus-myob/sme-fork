import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import GeneralPayrollInformationView from '../GeneralPayrollInformationView';
import Store from '../../../../../store/Store';
import TimesheetsSettingsView from '../TimesheetsSettingsView';
import payrollSettingsReducer from '../../../reducer/payrollSettingsReducer';

describe('GeneralPayrollInformationView', () => {
  it('renders the TimesheetsSettingsView', () => {
    const store = new Store(payrollSettingsReducer);
    const wrapper = mount(
      <Provider store={store}>
        <GeneralPayrollInformationView listeners={{}} />
      </Provider>
    );
    const timesheetSettings = wrapper.find(TimesheetsSettingsView);

    expect(timesheetSettings).toHaveLength(1);
  });
});
