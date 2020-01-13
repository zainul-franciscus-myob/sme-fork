import { LOAD_BUSINESS_CONTACT_INFORMATION, SUBMIT_BUSINESS_CONTACT_INFORMATION } from '../StpDeclarationInformationIntents';

const StpDeclarationInformationMapping = {
  [LOAD_BUSINESS_CONTACT_INFORMATION]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/business_contact`,
  },
  [SUBMIT_BUSINESS_CONTACT_INFORMATION]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/stp/business_contact`,
  },
};

export default StpDeclarationInformationMapping;
