import {
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  FileBrowser,
  Icons,
  Input,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFeatureColour,
  getHeaderTextColour,
  getImage,
  getImageButtonLabel,
  getImageLabel, getIsDefault,
  getLogoSize,
  getShowBusinessDetails,
  getTemplateName,
} from '../templateSelectors';
import ColorPicker from '../../../components/ColorPicker/ColorPicker';
import Slider from '../../../components/RangeSlider/RangeSlider';
import cardStyles from './InvoiceLogoDetailsHeaderInformation.module.css';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleColorPickerChange from '../../../components/handlers/handleColorPickerChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleSliderChange from '../../../components/handlers/handleSliderChange';
import styles from './TemplateDetailsHeaderInformation.module.css';

const InvoiceLogoDetailsHeaderInformation = ({
  featureColour,
  headerTextColour,
  image,
  imageButtonLabel,
  imageLabel,
  isDefault,
  logoSize,
  onFileRemoved,
  onFileSelected,
  onUpdateTemplateOptions,
  showBusinessDetails,
  templateName,
}) => {
  const templateOptions = (
    <>
      <Input
        label="Name"
        name="templateName"
        onChange={handleInputChange(onUpdateTemplateOptions)}
        requiredLabel="This field is required"
        value={templateName}
      />

      <CheckboxGroup
        hideLabel
        label="Set as default template"
        renderCheckbox={() => (
          <div>
            <Checkbox
              checked={isDefault}
              label="Set as default template"
              name="isDefault"
              onChange={handleCheckboxChange(onUpdateTemplateOptions)}
            />
          </div>
        )}
      />
    </>
  );

  const logo = (
    <>
      <h3>Upload your logo</h3>

      <p>
        Give your invoices a splash of colour and personality.
        These settings will also apply to quotes and statements.
      </p>

      {image && (
        <div className={styles.imageContainer}>
          <img
            alt={imageLabel}
            className={styles.imageThumbnail}
            src={image}
          />

          <Button
            className={styles.removeImageButton}
            icon={<Icons.Remove />}
            onClick={onFileRemoved}
            type="link"
          >
            Remove
          </Button>
        </div>
      )}

      <FileBrowser
        accept=".bmp, .tiff, .jpeg, .jpg, .png"
        buttonLabel={imageButtonLabel}
        buttonType="secondary"
        onFileSelected={onFileSelected}
      />

      <div className={styles.logoPrompt}>
        <p>
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
        </p>
      </div>

      {showBusinessDetails && (
        <>
          {image && (
            <Slider
              label="Logo size"
              min={1}
              name="logoSize"
              onChange={handleSliderChange(
                'logoSize',
                onUpdateTemplateOptions,
              )}
              value={logoSize}
            />
          )}
        </>
      )}
    </>
  );

  const colours = (
    <>
      <ColorPicker
        defaultColorIfBlack="#ffffff"
        label="Feature colour"
        name="featureColour"
        onChange={handleColorPickerChange(
          'featureColour',
          onUpdateTemplateOptions,
        )}
        value={featureColour}
      />

      <div className={cardStyles.formGroup}>
        <ColorPicker
          defaultColorIfBlack="#ffffff"
          label="Header text colour"
          name="headerTextColour"
          onChange={handleColorPickerChange(
            'headerTextColour',
            onUpdateTemplateOptions,
          )}
          value={headerTextColour}
        />
      </div>
    </>
  );

  return (
    <Card
      body={
        <>
          {templateOptions}
          {logo}
          {colours}
        </>
      }
      classes={cardStyles.card}
      header={<span className={cardStyles.title}>Template options</span>}
    />
  );
};

const mapsStateToProps = state => ({
  featureColour: getFeatureColour(state),
  headerTextColour: getHeaderTextColour(state),
  image: getImage(state),
  imageButtonLabel: getImageButtonLabel(state),
  imageLabel: getImageLabel(state),
  isDefault: getIsDefault(state),
  logoSize: getLogoSize(state),
  showBusinessDetails: getShowBusinessDetails(state),
  templateName: getTemplateName(state),
});

export default connect(mapsStateToProps)(InvoiceLogoDetailsHeaderInformation);
