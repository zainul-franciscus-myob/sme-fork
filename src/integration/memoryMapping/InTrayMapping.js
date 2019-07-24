import {
  GENERATE_IN_TRAY_EMAIL,
  LOAD_IN_TRAY,
  SORT_AND_FILTER_IN_TRAY_LIST,
} from '../../inTray/InTrayIntents';
import filteredInTrayList from '../data/inTray/filterInTrayListResponse';
import generateInTrayEmailResponse from '../data/inTray/generateEmailAddressResponse';
import loadInTrayResponse from '../data/inTray/loadInTrayResponse';

const InTrayMapping = {
  [LOAD_IN_TRAY]: ({ onSuccess }) => onSuccess(loadInTrayResponse),
  [GENERATE_IN_TRAY_EMAIL]: ({ onSuccess }) => onSuccess(generateInTrayEmailResponse),
  [SORT_AND_FILTER_IN_TRAY_LIST]: ({ onSuccess }) => onSuccess(filteredInTrayList),
};

export default InTrayMapping;
