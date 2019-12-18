import {
  LOAD_BUSINESS_DETAIL, LOAD_BUSINESS_LIST, UPDATE_BUSINESS_DETAIL,
} from '../../modules/business/BusinessIntents';
import business from '../data/business/businessDetails';
import businesses from '../data/businessList';
import success from '../data/success';


const updateBusinessDetails = ({ onSuccess }) => onSuccess(success);
const loadBusinessList = ({ onSuccess }) => {
  onSuccess(businesses);
};
const loadBusinessDetail = ({ onSuccess }) => {
  onSuccess(business);
};

const BusinessMapping = {
  [LOAD_BUSINESS_LIST]: loadBusinessList,
  [LOAD_BUSINESS_DETAIL]: loadBusinessDetail,
  [UPDATE_BUSINESS_DETAIL]: updateBusinessDetails,
};

export default BusinessMapping;
