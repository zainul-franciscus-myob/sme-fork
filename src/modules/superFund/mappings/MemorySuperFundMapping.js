import {
  CREATE_SUPER_FUND,
  DELETE_SUPER_FUND,
  LOAD_ABN_DETAIL,
  LOAD_NEW_SUPER_FUND,
  LOAD_SUPER_FUND,
  UPDATE_SUPER_FUND,
} from '../SuperFundIntents';
import abnDetail from './data/abnDetail';
import successResponse from './data/success.json';
import superFundDetail from './data/superFundDetail';
import superFundNewDetail from './data/superFundNewDetail';

const loadNewSuperFund = ({ onSuccess }) => onSuccess(superFundNewDetail);
const loadSuperFund = ({ onSuccess }) => onSuccess(superFundDetail);
const loadAbnDetail = ({ onSuccess }) => onSuccess(abnDetail);
const updateSuperFund = ({ onSuccess }) => onSuccess(successResponse);
const createSuperFund = ({ onSuccess }) => onSuccess(successResponse);
const deleteSuperFund = ({ onSuccess }) => onSuccess(successResponse);

const MemorySuperFundMapping = {
  [LOAD_NEW_SUPER_FUND]: loadNewSuperFund,
  [LOAD_SUPER_FUND]: loadSuperFund,
  [LOAD_ABN_DETAIL]: loadAbnDetail,
  [CREATE_SUPER_FUND]: createSuperFund,
  [UPDATE_SUPER_FUND]: updateSuperFund,
  [DELETE_SUPER_FUND]: deleteSuperFund,
};

export default MemorySuperFundMapping;
