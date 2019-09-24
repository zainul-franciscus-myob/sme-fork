import {
  CREATE_IN_TRAY_DOCUMENT,
  DELETE_IN_TRAY_DOCUMENT,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  GENERATE_IN_TRAY_EMAIL,
  LOAD_IN_TRAY,
  SORT_AND_FILTER_IN_TRAY_LIST,
} from '../../inTray/InTrayIntents';
import createInTrayFileResponse from '../data/inTray/uploadInTrayFileResponse';
import downloadInTrayFileResponse from '../data/inTray/loadInTrayFileResponse';
import filteredInTrayList from '../data/inTray/filterInTrayListResponse';
import generateInTrayEmailResponse from '../data/inTray/generateEmailAddressResponse';
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
};

export default InTrayMapping;
