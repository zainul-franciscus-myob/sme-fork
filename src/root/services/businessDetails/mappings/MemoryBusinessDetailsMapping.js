import {
  LOAD_GLOBAL_BUSINESS_DETAILS, UPDATE_GLOBAL_BUSINESS_DETAILS,
} from '../BusinessDetailsIntents';
import businessDetails from './data/businessDetails.json';
import businessDetailsUpdate from './data/businessDetailsUpdate.json';


const updateBusinessDetails = ({ onSuccess }) => onSuccess(businessDetailsUpdate);
const loadBusinessDetail = ({ onSuccess }) => {
  onSuccess(businessDetails);
};

const MemoryBusinessMapping = {
  [LOAD_GLOBAL_BUSINESS_DETAILS]: loadBusinessDetail,
  [UPDATE_GLOBAL_BUSINESS_DETAILS]: updateBusinessDetails,
};

export default MemoryBusinessMapping;
