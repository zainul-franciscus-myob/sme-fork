import {
  GENERATE_IN_TRAY_EMAIL,
  LOAD_IN_TRAY,
} from '../../inTray/InTrayIntents';

const InTrayMapping = {
  [LOAD_IN_TRAY]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/inTray/load_in_tray`,
  },
  [GENERATE_IN_TRAY_EMAIL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/inTray/generate_in_tray_email`,
  },
};

export default InTrayMapping;
