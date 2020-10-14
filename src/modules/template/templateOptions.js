export const CommonBusinessDetailKeys = {
  tradingName: 'tradingName',
  businessName: 'businessName',
  address: 'address',
  phoneNumber: 'phoneNumber',
  email: 'email',
  website: 'website',
};

export const AllBusinessDetailKeys = {
  ...CommonBusinessDetailKeys,
  abn: 'abn',
  gstNumber: 'gstNumber',
};

export const BusinessDetailDataMap = {
  [AllBusinessDetailKeys.tradingName]: 'tradingName',
  [AllBusinessDetailKeys.businessName]: 'businessName',
  [AllBusinessDetailKeys.address]: 'address',
  [AllBusinessDetailKeys.phoneNumber]: 'phoneNumber',
  [AllBusinessDetailKeys.email]: 'email',
  [AllBusinessDetailKeys.website]: 'website',
  [AllBusinessDetailKeys.abn]: 'abn',
  [AllBusinessDetailKeys.gstNumber]: 'gstNumber',
};

export const BusinessDetailTemplateMap = {
  [AllBusinessDetailKeys.tradingName]: 'tradingName',
  [AllBusinessDetailKeys.businessName]: 'businessName',
  [AllBusinessDetailKeys.address]: 'address',
  [AllBusinessDetailKeys.phoneNumber]: 'phoneNumber',
  [AllBusinessDetailKeys.email]: 'email',
  [AllBusinessDetailKeys.website]: 'website',
  [AllBusinessDetailKeys.abn]: 'abn',
  [AllBusinessDetailKeys.gstNumber]: 'gstNumber',
};

export const BusinessDetailPayloadMap = {
  [AllBusinessDetailKeys.tradingName]: 'TradingName',
  [AllBusinessDetailKeys.businessName]: 'BusinessName',
  [AllBusinessDetailKeys.address]: 'StreetAddress',
  [AllBusinessDetailKeys.phoneNumber]: 'PhoneNumber',
  [AllBusinessDetailKeys.email]: 'Email',
  [AllBusinessDetailKeys.website]: 'Website',
  [AllBusinessDetailKeys.abn]: 'ABN',
  [AllBusinessDetailKeys.gstNumber]: 'GSTNumber',
};

export const BusinessDetailLabelMap = {
  [AllBusinessDetailKeys.tradingName]: 'Trading name',
  [AllBusinessDetailKeys.businessName]: 'Business name',
  [AllBusinessDetailKeys.address]: 'Street address',
  [AllBusinessDetailKeys.phoneNumber]: 'Phone number',
  [AllBusinessDetailKeys.email]: 'Email',
  [AllBusinessDetailKeys.website]: 'Website',
  [AllBusinessDetailKeys.abn]: 'ABN',
  [AllBusinessDetailKeys.gstNumber]: 'GST number',
};

export const HeaderBusinessDetailStyle = {
  logoAndBusinessDetails: 'LogoAndBusinessDetails',
  fullWidthHeaderImage: 'FullWidthHeaderImage',
};

export const PreviewType = {
  Invoice: 'Invoice',
  Quote: 'Quote',
  Statement: 'Statement',
};

export const SaleLayout = {
  ItemAndService: 'ItemAndService',
  Service: 'Service',
};
