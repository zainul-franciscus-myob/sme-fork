import { CONFIRM_LICENCE } from '../LicenceIntents';

const HttpLicenceMapping = {
  [CONFIRM_LICENCE]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/confirmLicence/confirm_licence`,
  },
};

export default HttpLicenceMapping;
