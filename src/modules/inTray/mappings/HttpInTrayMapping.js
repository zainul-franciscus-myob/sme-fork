import {
  CREATE_IN_TRAY_DOCUMENT,
  CREATE_IN_TRAY_MODAL_DOCUMENT,
  DELETE_IN_TRAY_DOCUMENT,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  GENERATE_IN_TRAY_EMAIL,
  LOAD_IN_TRAY,
  LOAD_IN_TRAY_MODAL,
  SORT_AND_FILTER_IN_TRAY_LIST,
  VIEW_IN_TRAY_MODAL_DOCUMENT,
} from '../InTrayIntents';

const HttpInTrayMapping = {
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
  [CREATE_IN_TRAY_DOCUMENT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/inTray/create_in_tray_document`,
  },
  [DELETE_IN_TRAY_DOCUMENT]: {
    method: 'DELETE',
    getPath: ({ businessId, documentId }) => `/${businessId}/inTray/delete_in_tray_document/${documentId}`,
  },
  [DOWNLOAD_IN_TRAY_DOCUMENT]: {
    method: 'GET',
    getPath: ({ businessId, documentId }) => `/${businessId}/inTray/download_in_tray_document/${documentId}`,
  },
  [LOAD_IN_TRAY_MODAL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/inTray/load_in_tray_modal`,
  },
  [CREATE_IN_TRAY_MODAL_DOCUMENT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/inTray/create_in_tray_modal_document`,
  },
  [VIEW_IN_TRAY_MODAL_DOCUMENT]: {
    method: 'GET',
    getPath: ({ businessId, documentId }) => `/${businessId}/inTray/view_in_tray_modal_document/${documentId}`,
  },
};

export default HttpInTrayMapping;
