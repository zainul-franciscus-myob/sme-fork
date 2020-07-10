import { Checkbox, RadioButton, RadioButtonGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { HeaderBusinessDetailStyle } from '../templateOptions';
import {
  getFeatureColour,
  getHeaderBusinessDetailsStyle,
  getHeaderTextColour,
  getUseAddressEnvelopePosition,
} from '../templateSelectors';
import Collapsible from './Collapsible';
import ColorPicker from '../../../components/ColorPicker/ColorPicker';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleColorPickerChange from '../../../components/handlers/handleColorPickerChange';
import handleRadioButtonChange from '../../../components/handlers/handleRadioButtonChange';

const TemplateDetailsHeaderStyle = ({
  featureColour,
  headerTextColour,
  headerBusinessDetailsStyle,
  useAddressEnvelopePosition,
  onUpdateTemplateOptions,
}) => (
  <Collapsible
    title="Header style"
    content={
      <>
        <ColorPicker
          name="featureColour"
          label="Feature colour"
          value={featureColour}
          onChange={handleColorPickerChange(
            'featureColour',
            onUpdateTemplateOptions
          )}
          defaultColorIfBlack="#ffffff"
        />
        <ColorPicker
          value={headerTextColour}
          name="headerTextColour"
          label="Header text colour"
          onChange={handleColorPickerChange(
            'headerTextColour',
            onUpdateTemplateOptions
          )}
          defaultColorIfBlack="#ffffff"
        />
        <RadioButtonGroup
          label="PDF style"
          name="headerBusinessDetailsStyle"
          value={headerBusinessDetailsStyle}
          renderRadios={({ value, ...props }) =>
            [
              {
                value: HeaderBusinessDetailStyle.logoAndBusinessDetails,
                label: 'Logo and business details',
              },
              {
                value: HeaderBusinessDetailStyle.fullWidthHeaderImage,
                label: 'Full width header image',
              },
            ].map((option) => (
              <RadioButton
                checked={value === option.value}
                key={option.value}
                value={option.value}
                label={option.label}
                {...props}
              />
            ))
          }
          onChange={handleRadioButtonChange(
            'headerBusinessDetailsStyle',
            onUpdateTemplateOptions
          )}
        />
        <Checkbox
          name="useAddressEnvelopePosition"
          label="Position customer address for windowed envelope"
          onChange={handleCheckboxChange(onUpdateTemplateOptions)}
          checked={useAddressEnvelopePosition}
        />
      </>
    }
  />
);

const mapStateToProps = (state) => ({
  headerBusinessDetailsStyle: getHeaderBusinessDetailsStyle(state),
  useAddressEnvelopePosition: getUseAddressEnvelopePosition(state),
  featureColour: getFeatureColour(state),
  headerTextColour: getHeaderTextColour(state),
});

export default connect(mapStateToProps)(TemplateDetailsHeaderStyle);
