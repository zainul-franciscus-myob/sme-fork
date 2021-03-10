import { LOAD_ONLINETAX_CONFIG } from '../onlineTaxIntent';
import onlineTaxConfig from './data/onlineTaxConfig';

const loadOnlineTaxConfig = ({ onSuccess }) => {
  onSuccess(onlineTaxConfig);
};

const MemoryOnlineTaxMapping = {
  [LOAD_ONLINETAX_CONFIG]: loadOnlineTaxConfig,
};

export default MemoryOnlineTaxMapping;
