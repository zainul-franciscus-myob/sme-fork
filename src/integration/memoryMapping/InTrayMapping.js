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
} from '../../modules/inTray/InTrayIntents';
import createInTrayFileResponse from '../data/inTray/uploadInTrayFileResponse';
import createInTrayModalFileResponse from '../data/inTray/uploadInTrayModalFileResponse';
import downloadInTrayFileResponse from '../data/inTray/loadInTrayFileResponse';
import downloadInTrayModalFileResponse from '../data/inTray/loadInTrayModalDocumentUrlResponse';
import filteredInTrayList from '../data/inTray/filterInTrayListResponse';
import generateInTrayEmailResponse from '../data/inTray/generateEmailAddressResponse';
import loadInTrayModalResponse from '../data/inTray/loadInTrayModalResponse';
import loadInTrayResponse from '../data/inTray/loadInTrayResponse';
import successResponse from '../data/success';

const InTrayMapping = {
  [LOAD_IN_TRAY]: ({ onSuccess }) => onSuccess(loadInTrayResponse),
  [GENERATE_IN_TRAY_EMAIL]: ({ onSuccess }) => onSuccess(generateInTrayEmailResponse),
  [SORT_AND_FILTER_IN_TRAY_LIST]: ({ onSuccess }) => onSuccess(filteredInTrayList),
  [CREATE_IN_TRAY_DOCUMENT]: ({ onSuccess }) => {
    const { entry: { id, ...res } } = createInTrayFileResponse;
    const entry = { ...res, id: `${id}-${Math.random()}` };
    onSuccess({ ...createInTrayFileResponse, entry });
  },
  [DELETE_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(successResponse),
  [DOWNLOAD_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(downloadInTrayFileResponse),
  [LOAD_IN_TRAY_MODAL]: ({ onSuccess }) => onSuccess(loadInTrayModalResponse),
  [CREATE_IN_TRAY_MODAL_DOCUMENT]: ({ onSuccess }) => {
    const { entry: { id, ...res } } = createInTrayModalFileResponse;
    const entry = { ...res, id: `${id}-${Math.random()}` };
    onSuccess({ ...createInTrayModalFileResponse, entry });
  },
  [VIEW_IN_TRAY_MODAL_DOCUMENT]: ({ onSuccess }) => onSuccess(downloadInTrayModalFileResponse),
};

export default InTrayMapping;
