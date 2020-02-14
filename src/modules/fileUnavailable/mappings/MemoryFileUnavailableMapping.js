import { LOAD_FILE_UNAVAILABLE } from '../FileUnavailableIntents';
import loadFileUnavailable from './data/loadFileUnavailable';

const MemoryFileUnavailableMapping = {
  [LOAD_FILE_UNAVAILABLE]: ({ onSuccess }) => onSuccess(loadFileUnavailable),
};

export default MemoryFileUnavailableMapping;
