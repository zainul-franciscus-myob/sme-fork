import { LOAD_BUSINESS_CONTACT_INFORMATION, SUBMIT_BUSINESS_CONTACT_INFORMATION } from '../StpDeclarationInformationIntents';

const StpDeclarationInformationMapping = {
  [LOAD_BUSINESS_CONTACT_INFORMATION]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/business_contact_information`,
  },
  [SUBMIT_BUSINESS_CONTACT_INFORMATION]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/stp/business_contact_information`,
  },
};

export default StpDeclarationInformationMapping;
