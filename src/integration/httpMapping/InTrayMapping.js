import {
  GENERATE_IN_TRAY_EMAIL,
  LOAD_IN_TRAY,
  SORT_AND_FILTER_IN_TRAY_LIST,
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
  [SORT_AND_FILTER_IN_TRAY_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/inTray/filter_in_tray_list`,
  },
};

export default InTrayMapping;
