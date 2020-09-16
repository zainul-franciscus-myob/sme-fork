import {
  Card,
  FieldGroup,
  RadioButton,
  RadioButtonGroup,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getGstSettings, getLoadingState } from '../businessSettingsSelectors';
import PageView from '../../../../components/PageView/PageView';
import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';

const GstSettingsView = ({
  gstSettings: {
    reportingFrequency,
    reportingFrequencyOptions,
    gstRegisteredOptions,
  },
  loadingState,
  onUpdateGstSettings,
}) => {
  const view = (
    <Card>
      <FieldGroup label="GST settings">
        <RadioButtonGroup
          label="Is this business registered for GST?"
          name="isGstRegistered"
          onChange={handleRadioButtonChange(
            'reportingFrequency',
            onUpdateGstSettings
          )}
          value={reportingFrequency}
          defaultValue="NotRegistered"
          renderRadios={({ id, value, ...props }) => {
            return gstRegisteredOptions.map((option) => (
              <RadioButton
                {...props}
                checked={
                  value === 'NotRegistered'
                    ? option.value === 'NotRegistered'
                    : option.value !== 'NotRegistered'
                }
                key={option.value}
                value={option.value}
                label={option.displayValue}
              />
            ));
          }}
        />

        {reportingFrequency !== 'NotRegistered' && (
          <RadioButtonGroup
            label="Reporting frequency"
            name="reportingFrequency"
            onChange={handleRadioButtonChange(
              'reportingFrequency',
              onUpdateGstSettings
            )}
            value={reportingFrequency}
            renderRadios={({ id, value, ...props }) => {
              return reportingFrequencyOptions.map((option) => (
                <RadioButton
                  {...props}
                  checked={value === option.value}
                  key={option.value}
                  value={option.value}
                  label={option.displayValue}
                />
              ));
            }}
          />
        )}
      </FieldGroup>
    </Card>
  );
  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  gstSettings: getGstSettings(state),
  loadingState: getLoadingState(state),
});

export default connect(mapStateToProps)(GstSettingsView);
