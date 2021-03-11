import {
  FETCH_FILE_UPDATE_STATUS,
  LOAD_FILE_UNAVAILABLE,
  TRIGGER_FILE_UPDATE,
} from '../FileUnavailableIntents';
import loadFileUnavailable from './data/loadFileUnavailable';
import updateFileResponse from './data/updateFileResponse.json';

const MemoryFileUnavailableMapping = {
  [LOAD_FILE_UNAVAILABLE]: ({ onSuccess }) => onSuccess(loadFileUnavailable),
  [FETCH_FILE_UPDATE_STATUS]: ({ onSuccess }) => onSuccess(updateFileResponse),
  [TRIGGER_FILE_UPDATE]: () => {},
};

export default MemoryFileUnavailableMapping;
