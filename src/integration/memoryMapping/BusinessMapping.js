import BusinessIntents from '../../business/BusinessIntents';
import businesses from '../data/businessList';

const loadBusinessList = ({ onSuccess }) => {
  onSuccess(businesses);
};

const BusinessMapping = {
  [BusinessIntents.LOAD_BUSINESS_LIST]: loadBusinessList,
};

export default BusinessMapping;
