import {
  CREATE_IN_TRAY_DOCUMENT,
  CREATE_IN_TRAY_MODAL_DOCUMENT,
  DELETE_IN_TRAY_DOCUMENT,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  GENERATE_IN_TRAY_EMAIL,
  LOAD_IN_TRAY,
  LOAD_IN_TRAY_MODAL,
  POLL_INTRAY_LIST,
  SORT_AND_FILTER_IN_TRAY_LIST,
  VIEW_IN_TRAY_MODAL_DOCUMENT,
} from '../InTrayIntents';
import createInTrayFileResponse from './data/uploadInTrayFileResponse';
import createInTrayModalFileResponse from './data/uploadInTrayModalFileResponse';
import downloadInTrayModalFileResponse from './data/loadInTrayModalDocumentUrlResponse';
import filteredInTrayList from './data/filterInTrayListResponse';
import generateInTrayEmailResponse from './data/generateEmailAddressResponse';
import loadInTrayModalResponse from './data/loadInTrayModalResponse';
import loadInTrayResponse from './data/loadInTrayResponse';
import pollInTrayResponse from './data/pollInTrayResponse';
import successResponse from './data/success.json';

const MemoryInTrayMapping = {
  [LOAD_IN_TRAY]: ({ onSuccess }) => onSuccess(loadInTrayResponse),
  [GENERATE_IN_TRAY_EMAIL]: ({ onSuccess }) => onSuccess(generateInTrayEmailResponse),
  [SORT_AND_FILTER_IN_TRAY_LIST]: ({ onSuccess }) => onSuccess(filteredInTrayList),
  [CREATE_IN_TRAY_DOCUMENT]: ({ onSuccess }) => {
    const { entry: { id, ...res } } = createInTrayFileResponse;
    const entry = { ...res, id: `${id}-${Math.random()}` };
    onSuccess({ ...createInTrayFileResponse, entry });
  },
  [DELETE_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(successResponse),
  [DOWNLOAD_IN_TRAY_DOCUMENT]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
  [LOAD_IN_TRAY_MODAL]: ({ onSuccess }) => onSuccess(loadInTrayModalResponse),
  [CREATE_IN_TRAY_MODAL_DOCUMENT]: ({ onSuccess }) => {
    const { entry: { id, ...res } } = createInTrayModalFileResponse;
    const entry = { ...res, id: `${id}-${Math.random()}` };
    onSuccess({ ...createInTrayModalFileResponse, entry });
  },
  [VIEW_IN_TRAY_MODAL_DOCUMENT]: ({ onSuccess }) => onSuccess(downloadInTrayModalFileResponse),
  [POLL_INTRAY_LIST]: ({ onSuccess }) => onSuccess(pollInTrayResponse),

};

export default MemoryInTrayMapping;
