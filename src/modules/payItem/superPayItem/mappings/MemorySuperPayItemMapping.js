import {
  CREATE_SUPER_PAY_ITEM,
  DELETE_SUPER_PAY_ITEM,
  LOAD_NEW_SUPER_PAY_ITEM,
  LOAD_SUPER_PAY_ITEM,
  UPDATE_SUPER_PAY_ITEM,
} from '../SuperPayItemIntents';
import loadNewSuperPayItemResponse from './data/loadNewSuperPayItem';
import loadSuperPayItemResponse from './data/loadSuperPayItem';
import successResponse from './data/success.json';

const loadNewSuperPayItem = ({ onSuccess }) => onSuccess(loadNewSuperPayItemResponse);
const loadSuperPayItem = ({ onSuccess }) => onSuccess(loadSuperPayItemResponse);
const createSuperPayItem = ({ onSuccess }) => onSuccess(successResponse);
const updateSuperPayItem = ({ onSuccess }) => onSuccess(successResponse);
const deleteSuperPayItem = ({ onSuccess }) => onSuccess(successResponse);

const MemorySuperPayItemMapping = {
  [LOAD_NEW_SUPER_PAY_ITEM]: loadNewSuperPayItem,
  [LOAD_SUPER_PAY_ITEM]: loadSuperPayItem,
  [CREATE_SUPER_PAY_ITEM]: createSuperPayItem,
  [UPDATE_SUPER_PAY_ITEM]: updateSuperPayItem,
  [DELETE_SUPER_PAY_ITEM]: deleteSuperPayItem,
};

export default MemorySuperPayItemMapping;
