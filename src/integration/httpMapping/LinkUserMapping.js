import {
  LINK_USER,
  LOAD_BUSINESS_INFORMATION,
} from '../../modules/linkUser/LinkUserIntents';

const LinkUserMapping = {
  [LINK_USER]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/linkUser/createLinkedUser`,
  },
  [LOAD_BUSINESS_INFORMATION]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/linkUser/loadBusinessInformation`,
  },
};

export default LinkUserMapping;
