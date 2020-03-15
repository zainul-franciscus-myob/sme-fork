import {
  CREATE_JOB,
  DELETE_JOB,
  FILTER_JOB_LIST,
  LOAD_JOB_DETAIL,
  LOAD_JOB_LIST,
  LOAD_JOB_MODAL,
  LOAD_NEW_JOB,
  UPDATE_JOB,
} from '../JobIntents';
import jobDetailLoadResponse from './data/jobDetailEntry';
import jobListFilterResponse from './data/filterJobList';
import jobListLoadResponse from './data/jobList';
import loadNewJobModalResponse from './data/loadNewJobModalResponse';
import newJobDetailResponse from './data/jobDetailNewEntry';
import success from './data/success.json';

const filterJobList = ({ onSuccess }) => onSuccess(jobListFilterResponse);
const loadJobList = ({ onSuccess }) => onSuccess(jobListLoadResponse);
const loadJobDetail = ({ onSuccess }) => onSuccess(jobDetailLoadResponse);
const loadNewJob = ({ onSuccess }) => onSuccess(newJobDetailResponse);
const deleteJob = ({ onSuccess }) => onSuccess(success);
const updateJob = ({ onSuccess }) => onSuccess(success);
const createJob = ({ onSuccess }) => onSuccess(success);
const loadJobModal = ({ onSuccess }) => onSuccess(loadNewJobModalResponse);

const JobListMapping = {
  [LOAD_JOB_LIST]: loadJobList,
  [LOAD_NEW_JOB]: loadNewJob,
  [FILTER_JOB_LIST]: filterJobList,
  [DELETE_JOB]: deleteJob,
  [UPDATE_JOB]: updateJob,
  [CREATE_JOB]: createJob,
  [LOAD_JOB_DETAIL]: loadJobDetail,
  [LOAD_JOB_MODAL]: loadJobModal,
};

export default JobListMapping;
