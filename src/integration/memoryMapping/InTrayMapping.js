import {
  GENERATE_IN_TRAY_EMAIL,
  LOAD_IN_TRAY,
} from '../../inTray/InTrayIntents';
import generateInTrayEmailResponse from '../data/inTray/generateEmailAddressResponse';
import loadInTrayResponse from '../data/inTray/loadInTrayResponse';


const InTrayMapping = {
  [LOAD_IN_TRAY]: ({ onSuccess }) => onSuccess(loadInTrayResponse),
  [GENERATE_IN_TRAY_EMAIL]: ({ onSuccess }) => onSuccess(generateInTrayEmailResponse),
};

export default InTrayMapping;
