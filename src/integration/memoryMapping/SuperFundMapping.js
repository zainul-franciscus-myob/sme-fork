import { LOAD_SUPER_FUND } from '../../superFund/SuperFundIntents';
import superFundDetail from '../data/payrollSettings/superFundDetail';

const loadSuperFund = ({ onSuccess }) => onSuccess(superFundDetail);

const SuperFundMapping = {
  [LOAD_SUPER_FUND]: loadSuperFund,
};

export default SuperFundMapping;
