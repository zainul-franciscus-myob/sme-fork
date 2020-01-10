import { createSelector } from 'reselect';

import { BusinessDetailOptions, HeaderBusinessDetailStyle } from './templateOptions';

export const getTemplate = state => state.template;
export const getBusinessId = state => state.businessId;
export const getIsLoading = state => state.isLoading;
export const getRegion = state => state.region;
export const getAlert = state => state.alert;
export const getModalType = state => state.modalType;
export const getHasChange = state => state.hasChange;

export const getTemplateId = createSelector(
  getTemplate,
  template => template.templateId,
);

export const getTemplateName = createSelector(
  getTemplate,
  template => template.templateName,
);

export const getIsDefault = createSelector(
  getTemplate,
  template => template.isDefault,
);

export const getFeatureColour = createSelector(
  getTemplate,
  template => template.featureColour,
);

export const getHeaderTextColour = createSelector(
  getTemplate,
  template => template.headerTextColour,
);

export const getHeaderBusinessDetailsStyle = createSelector(
  getTemplate,
  template => template.headerBusinessDetailsStyle,
);

export const getUseAddressEnvelopePosition = createSelector(
  getTemplate,
  template => template.useAddressEnvelopePosition,
);

export const getIsLogoOnTheLeft = createSelector(
  getTemplate,
  template => template.isLogoOnTheLeft,
);

export const getLogoSize = createSelector(
  getTemplate,
  template => template.logoSize,
);

export const getShowBusinessDetails = createSelector(
  getHeaderBusinessDetailsStyle,
  style => style === HeaderBusinessDetailStyle.logoAndBusinessDetails,
);

const ImageFieldLabels = {
  [HeaderBusinessDetailStyle.fullWidthHeaderImage]: 'Image',
  [HeaderBusinessDetailStyle.logoAndBusinessDetails]: 'Logo',
};

const ImageFieldKeys = {
  [HeaderBusinessDetailStyle.fullWidthHeaderImage]: 'headerImage',
  [HeaderBusinessDetailStyle.logoAndBusinessDetails]: 'logoImage',
};

export const getImageLabel = createSelector(
  getTemplate,
  template => ImageFieldLabels[template.headerBusinessDetailsStyle],
);

export const getImageKey = createSelector(
  getTemplate,
  template => ImageFieldKeys[template.headerBusinessDetailsStyle],
);

export const getImage = createSelector(
  getTemplate,
  getImageKey,
  (template, imageKey) => template[imageKey],
);

export const getImageButtonLabel = createSelector(
  getImage,
  getImageLabel,
  (image, label) => {
    const prefix = image ? 'Change' : 'Upload';
    return `${prefix} ${label.toLowerCase()}`;
  },
);

const getImageType = createSelector(
  getImage,
  image => image && image.split(';')[0].replace('data:image/', ''),
);

const base64ToBlob = (base64) => {
  const data = base64.replace(/^[^,]+,/, '');
  const byteString = atob(data);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const byteArray = new Uint8Array(arrayBuffer);
  byteString.split('')
    .reduce((acc, next, i) => {
      acc[i] = next.charCodeAt(0);
      return acc;
    }, byteArray);
  return new Blob([arrayBuffer]);
};

const getImageFile = createSelector(
  getImage,
  getImageKey,
  getImageType,
  (base64, fileName, type) => (
    base64 && new File([base64ToBlob(base64)], `${fileName}.${type}`, { type: `image/${type}` })
  ),
);

export const getBusinessDetails = createSelector(
  getTemplate,
  template => BusinessDetailOptions.reduce(
    (result, { key }) => ({
      ...result,
      [key]: template[key],
    }),
    {},
  ),
);

export const getSavePayload = (state) => {
  const {
    templateName,
    featureColour,
    headerTextColour,
    useAddressEnvelopePosition,
    headerBusinessDetailsStyle,
    logoSize,
    isLogoOnTheLeft,
    isDefault,
  } = getTemplate(state);
  const imageKey = getImageKey(state);
  const file = getImageFile(state);
  const businessDetails = getBusinessDetails(state);
  const selectedBusinessDetailsOptions = BusinessDetailOptions
    .filter(({ key }) => businessDetails[key])
    .map(({ value }) => value);

  return {
    templateName,
    featureColour,
    headerTextColour,
    useAddressEnvelopePosition: String(useAddressEnvelopePosition),
    headerBusinessDetailsStyle,
    logoSize,
    logoPlacementLeft: String(isLogoOnTheLeft === 'Left'),
    businessDetailsOptions: selectedBusinessDetailsOptions.toString(),
    headerImage: undefined,
    logoImage: undefined,
    [imageKey]: file,
    setAsDefault: String(isDefault),
  };
};
