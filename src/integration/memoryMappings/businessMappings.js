import * as BusinessListIntents from '../../business/businessIntents';
import businesses from '../data/businessList';

const loadBusinessList = ({ onSuccess }) => {
  onSuccess(businesses);
};

export default {
  [BusinessListIntents.LOAD_BUSINESS_LIST]: loadBusinessList,
};
