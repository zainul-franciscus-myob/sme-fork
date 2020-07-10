const buildAbnLink = (abn) =>
  abn
    ? `https://abr.business.gov.au/ABN/View?id=${abn}`
    : 'https://abr.business.gov.au/';

export default buildAbnLink;
