import {
  CREATE_SUPER_FUND,
  DELETE_SUPER_FUND,
  LOAD_ABN_DETAIL,
  LOAD_NEW_SUPER_FUND,
  LOAD_SUPER_FUND,
  UPDATE_SUPER_FUND,
} from '../../superFund/SuperFundIntents';
import abnDetail from '../data/payrollSettings/abnDetail';
import successResponse from '../data/success.json';
import superFundDetail from '../data/superFund/superFundDetail';
import superFundNewDetail from '../data/superFund/superFundNewDetail';

const loadNewSuperFund = ({ onSuccess }) => onSuccess(superFundNewDetail);
const loadSuperFund = ({ onSuccess }) => onSuccess(superFundDetail);
const loadAbnDetail = ({ onSuccess }) => onSuccess(abnDetail);
const updateSuperFund = ({ onSuccess }) => onSuccess(successResponse);
const createSuperFund = ({ onSuccess }) => onSuccess(successResponse);
const deleteSuperFund = ({ onSuccess }) => onSuccess(successResponse);

const SuperFundMapping = {
  [LOAD_NEW_SUPER_FUND]: loadNewSuperFund,
  [LOAD_SUPER_FUND]: loadSuperFund,
  [LOAD_ABN_DETAIL]: loadAbnDetail,
  [CREATE_SUPER_FUND]: createSuperFund,
  [UPDATE_SUPER_FUND]: updateSuperFund,
  [DELETE_SUPER_FUND]: deleteSuperFund,
};

export default SuperFundMapping;
