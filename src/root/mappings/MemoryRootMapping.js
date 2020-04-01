import { LOAD_SHARED_INFO, LOAD_SUBSCRIPTION } from '../rootIntents';
import loadSharedInfoResponse from './data/loadSharedInfo';
import loadSubscriptionResponse from './data/subscription';

const MemoryRootMapping = {
  [LOAD_SUBSCRIPTION]: ({ onSuccess }) => onSuccess(loadSubscriptionResponse),
  [LOAD_SHARED_INFO]: ({ onSuccess }) => onSuccess(loadSharedInfoResponse),
};

export default MemoryRootMapping;
