import {
  Button,
  Card,
  FileBrowser,
  Icons,
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
} from '../../template/templateSelectors';
import ColorPicker from '../../../components/ColorPicker/ColorPicker';
import Slider from '../../../components/RangeSlider/RangeSlider';
import cardStyles from './cardStyles.module.css';
import handleColorPickerChange from '../../../components/handlers/handleColorPickerChange';
import handleSliderChange from '../../../components/handlers/handleSliderChange';
import styles from '../../template/components/TemplateDetailsHeaderInformation.module.css';

const InvoiceLogoDetailsHeaderInformation = ({
  featureColour,
  headerTextColour,
  image,
  imageButtonLabel,
  imageLabel,
  logoSize,
  onFileRemoved,
  onFileSelected,
  onUpdateTemplateOptions,
  showBusinessDetails,
}) => {
  const logo = (
    <>
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
          {logo}
          {colours}
        </>
      }
      classes={cardStyles.card}
      header={<span className={cardStyles.title}>Upload your logo</span>}
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
