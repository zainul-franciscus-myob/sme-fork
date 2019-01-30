import {
  LOAD_BUSINESS_LIST,
} from '../../business/BusinessIntents';
import businesses from '../data/businessList';

const loadBusinessList = ({ onSuccess }) => {
  onSuccess(businesses);
};

const BusinessMapping = {
  [LOAD_BUSINESS_LIST]: loadBusinessList,
};

export default BusinessMapping;
