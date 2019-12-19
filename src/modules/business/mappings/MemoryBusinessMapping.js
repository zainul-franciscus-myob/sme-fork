import {
  LOAD_BUSINESS_DETAIL, LOAD_BUSINESS_LIST, UPDATE_BUSINESS_DETAIL,
} from '../BusinessIntents';
import business from './data/businessDetails';
import businesses from './data/businessList';
import success from './data/success.json';


const updateBusinessDetails = ({ onSuccess }) => onSuccess(success);
const loadBusinessList = ({ onSuccess }) => {
  onSuccess(businesses);
};
const loadBusinessDetail = ({ onSuccess }) => {
  onSuccess(business);
};

const MemoryBusinessMapping = {
  [LOAD_BUSINESS_LIST]: loadBusinessList,
  [LOAD_BUSINESS_DETAIL]: loadBusinessDetail,
  [UPDATE_BUSINESS_DETAIL]: updateBusinessDetails,
};

export default MemoryBusinessMapping;
