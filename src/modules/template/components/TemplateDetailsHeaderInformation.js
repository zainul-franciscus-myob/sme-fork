import {
  Button,
  Checkbox,
  CheckboxGroup,
  FieldSet,
  FileBrowser,
  Icons,
  RadioButton,
  RadioButtonGroup,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBusinessDetailsOptions,
  getBusinessDetailsPlacement,
  getImage,
  getImageButtonLabel,
  getImageLabel,
  getLogoSize,
  getShowBusinessDetails,
} from '../templateSelectors';
import Collapsible from './Collapsible';
import Slider from '../../../components/RangeSlider/RangeSlider';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleRadioButtonChange from '../../../components/handlers/handleRadioButtonChange';
import handleSliderChange from '../../../components/handlers/handleSliderChange';
import styles from './TemplateDetailsHeaderInformation.module.css';

const uploadLogoPrompt = (
  <div className={styles.logoPrompt}>
    Only
    {' '}
    <strong>BMP</strong>
    ,
    {' '}
    <strong>TIFF</strong>
    ,
    {' '}
    <strong>JPEG</strong>
    {' '}
    or
    {' '}
    <strong>PNG</strong>
    {' '}
    files
    {' '}
    <strong>under 2MB</strong>
  </div>
);

const TemplateDetailsHeaderInformation = ({
  businessDetailsOptions,
  businessDetailsPlacement,
  logoSize,
  onUpdateTemplateOptions,
  imageLabel,
  imageButtonLabel,
  image,
  showBusinessDetails,
  onFileSelected,
  onFileRemoved,
  onEditBusinessDetails,
}) => (
  <Collapsible
    title="Header information"
    content={
      <>
        <FieldSet
          label={imageLabel}
          renderField={() => (
            <>
              {image && (
                <div className={styles.imageContainer}>
                  <img
                    alt={imageLabel}
                    src={image}
                    className={styles.imageThumbnail}
                  />
                  <Button
                    className={styles.removeImageButton}
                    type="link"
                    onClick={onFileRemoved}
                    icon={<Icons.Remove />}
                  >
                    Remove
                  </Button>
                </div>
              )}
              <FileBrowser
                buttonLabel={imageButtonLabel}
                buttonType="secondary"
                onFileSelected={onFileSelected}
                accept=".bmp, .tiff, .jpeg, .jpg, .png"
              />
              {uploadLogoPrompt}
            </>
          )}
        />
        {showBusinessDetails && (
          <>
            {image && (
              <Slider
                min={1}
                name="logoSize"
                label="Logo size"
                value={logoSize}
                onChange={handleSliderChange(
                  'logoSize',
                  onUpdateTemplateOptions,
                )}
              />
            )}
            <RadioButtonGroup
              label="Business details placement"
              name="businessDetailsPlacement"
              value={businessDetailsPlacement}
              renderRadios={({ value, ...props }) => ['Left', 'Right'].map(label => (
                <RadioButton
                  checked={value === label}
                  key={label}
                  value={label}
                  label={label}
                  {...props}
                />
              ))
              }
              onChange={handleRadioButtonChange(
                'businessDetailsPlacement',
                onUpdateTemplateOptions,
              )}
            />
            <CheckboxGroup
              label="Your business details"
              renderCheckbox={props => Object.entries(
                businessDetailsOptions,
              ).map(([key, { label, value, checked }]) => (
                <Checkbox
                  name={key}
                  label={label}
                  onChange={handleCheckboxChange(onUpdateTemplateOptions)}
                  checked={checked}
                  labelAccessory={
                      !value && (
                        <Tooltip triggerContent={<Icons.Warning />}>
                          You haven’t entered any details for this field.
                        </Tooltip>
                      )
                    }
                  {...props}
                />
              ))
              }
            />
            <Button type="link" onClick={onEditBusinessDetails}>
              Update your business details
            </Button>
          </>
        )}
      </>
    }
  />
);

const mapsStateToProps = state => ({
  businessDetailsPlacement: getBusinessDetailsPlacement(state),
  businessDetailsOptions: getBusinessDetailsOptions(state),
  logoSize: getLogoSize(state),
  imageLabel: getImageLabel(state),
  image: getImage(state),
  imageButtonLabel: getImageButtonLabel(state),
  showBusinessDetails: getShowBusinessDetails(state),
});

export default connect(mapsStateToProps)(TemplateDetailsHeaderInformation);
