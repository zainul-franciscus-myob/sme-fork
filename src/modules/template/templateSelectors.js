import { createSelector } from 'reselect';

import {
  BusinessDetailDataMap,
  BusinessDetailKey,
  BusinessDetailLabelMap,
  BusinessDetailPayloadMap,
  BusinessDetailTemplateMap,
  HeaderBusinessDetailStyle,
} from './templateOptions';

export const getTemplate = state => state.template;
export const getBusinessId = state => state.businessId;
export const getIsLoading = state => state.isLoading;
export const getRegion = state => state.region;
export const getAlert = state => state.alert;
export const getModalType = state => state.modalType;
export const getHasChange = state => state.hasChange;
export const getTempFile = state => state.tempFile;

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

export const getBusinessDetailsPlacement = createSelector(
  getTemplate,
  template => template.businessDetailsPlacement,
);

export const getIsLogoOnTheLeft = createSelector(
  getBusinessDetailsPlacement,
  businessDetailsPlacement => businessDetailsPlacement !== 'Left',
);

export const getIsLogoSelected = createSelector(
  getHeaderBusinessDetailsStyle,
  headerDetailsStyle => headerDetailsStyle === HeaderBusinessDetailStyle.logoAndBusinessDetails,
);

export const getLogoSize = createSelector(
  getTemplate,
  template => template.logoSize,
);

export const getLogoImage = createSelector(
  getTemplate,
  template => template.logoImage,
);

export const getHeaderImage = createSelector(
  getTemplate,
  template => template.headerImage,
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

const base64ToBlob = (base64) => {
  const data = base64.replace(/^[^,]+,/, '');
  const byteString = atob(data);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const byteArray = new Uint8Array(arrayBuffer);
  byteString.split('').reduce((acc, next, i) => {
    acc[i] = next.charCodeAt(0);
    return acc;
  }, byteArray);
  return new Blob([arrayBuffer]);
};

const convertImageToFile = (image, fileName) => {
  if (!image) {
    return undefined;
  }

  const imageType = image.split(';')[0].replace('data:image/', '');
  const file = new File([base64ToBlob(image)], `${fileName}.${imageType}`, {
    type: `image/${imageType}`,
  });
  return file;
};

export const getBusinessDetails = state => state.businessDetails;

export const getBusinessDetailsOptions = createSelector(
  getTemplate,
  getBusinessDetails,
  (template, businessDetails) => Object.values(BusinessDetailKey).reduce(
    (result, key) => ({
      ...result,
      [key]: {
        label: BusinessDetailLabelMap[key],
        checked: template[BusinessDetailTemplateMap[key]],
        value: businessDetails[BusinessDetailDataMap[key]],
      },
    }),
    {},
  ),
);

export const getBusinessDetailsOptionsForDisplay = createSelector(
  getBusinessDetailsOptions,
  businessDetailsOptions => ({
    businessName:
      businessDetailsOptions[BusinessDetailKey.businessName].checked
      && businessDetailsOptions[BusinessDetailKey.businessName].value,
    tradingName:
      businessDetailsOptions[BusinessDetailKey.tradingName].checked
      && businessDetailsOptions[BusinessDetailKey.tradingName].value,
    streetAddress:
      businessDetailsOptions[BusinessDetailKey.address].checked
      && businessDetailsOptions[BusinessDetailKey.address].value,
    phoneNumber:
      businessDetailsOptions[BusinessDetailKey.phoneNumber].checked
      && businessDetailsOptions[BusinessDetailKey.phoneNumber].value,
    email:
      businessDetailsOptions[BusinessDetailKey.email].checked
      && businessDetailsOptions[BusinessDetailKey.email].value,
    website:
      businessDetailsOptions[BusinessDetailKey.website].checked
      && businessDetailsOptions[BusinessDetailKey.website].value,
    abn:
      businessDetailsOptions[BusinessDetailKey.abn].checked
      && businessDetailsOptions[BusinessDetailKey.abn].value,
  }),
);

export const getSavePayload = (state) => {
  const {
    templateName,
    featureColour,
    headerTextColour,
    useAddressEnvelopePosition,
    headerBusinessDetailsStyle,
    logoSize,
    businessDetailsPlacement,
    isDefault,
    originalHeaderImage,
    headerImage,
    originalLogoImage,
    logoImage,
  } = getTemplate(state);
  // This is being built in the front end because
  // we cannot deconstruct multipart form data in the bff.
  const selectedBusinessDetailsOptions = Object.entries(
    getBusinessDetailsOptions(state),
  ).reduce(
    (result, [key, { checked }]) => (
      checked ? [...result, BusinessDetailPayloadMap[key]] : result
    ),
    [],
  );

  const selectedHeaderImage = headerBusinessDetailsStyle
  === HeaderBusinessDetailStyle.fullWidthHeaderImage
    ? headerImage
    : originalHeaderImage;

  const selectedLogoImage = headerBusinessDetailsStyle
  === HeaderBusinessDetailStyle.logoAndBusinessDetails
    ? logoImage
    : originalLogoImage;

  return {
    templateName,
    featureColour,
    headerTextColour,
    useAddressEnvelopePosition: String(useAddressEnvelopePosition),
    headerBusinessDetailsStyle,
    logoSize,
    logoPlacementLeft: String(businessDetailsPlacement !== 'Left'),
    businessDetailsOptions: selectedBusinessDetailsOptions.toString(),
    headerImage: convertImageToFile(selectedHeaderImage, 'headerImage'),
    logoImage: convertImageToFile(selectedLogoImage, 'logoImage'),
    setAsDefault: String(isDefault),
  };
};

export const getPreviewType = state => state.previewType;

export const getSaleLayout = state => state.saleLayout;

export const getIsCreating = state => state.isCreating;

export const getIsAllowPaymentByDirectDeposit = state => state.isAllowPaymentByDirectDeposit;

export const getIsAllowPaymentByCheque = state => state.isAllowPaymentByCheque;

export const getIsOnlinePaymentLoading = state => state.payDirect.isLoading;
export const getIsAllowOnlinePayment = state => state.payDirect.isRegistered;
export const getShouldLoadPayDirect = createSelector(getRegion, region => region === 'au');
export const getLoadPayDirectUrlParams = createSelector(
  getBusinessId,
  businessId => ({ businessId }),
);
