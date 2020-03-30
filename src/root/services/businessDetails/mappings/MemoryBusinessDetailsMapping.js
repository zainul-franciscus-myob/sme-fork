import {
  LOAD_GLOBAL_BUSINESS_DETAILS, UPDATE_GLOBAL_BUSINESS_DETAILS,
} from '../BusinessDetailsIntents';
import businessDetails from './data/businessDetails.json';
import businessDetailsNz from './data/businessDetailsNz.json';
import businessDetailsUpdate from './data/businessDetailsUpdate.json';

const NZ_BUSINESS_ID = 'c334b720-4775-4721-92dd-dadb1e0101df';

const updateBusinessDetails = ({ onSuccess }) => onSuccess(businessDetailsUpdate);

const loadBusinessDetail = ({ onSuccess, urlParams }) => {
  const businessDetail = urlParams.businessId === NZ_BUSINESS_ID ? businessDetailsNz
    : businessDetails;
  onSuccess(businessDetail);
};

const MemoryBusinessMapping = {
  [LOAD_GLOBAL_BUSINESS_DETAILS]: loadBusinessDetail,
  [UPDATE_GLOBAL_BUSINESS_DETAILS]: updateBusinessDetails,
};

export default MemoryBusinessMapping;
