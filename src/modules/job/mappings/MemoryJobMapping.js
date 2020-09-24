import {
  CREATE_JOB,
  CREATE_JOB_MODAL,
  DELETE_JOB,
  FILTER_JOB_LIST,
  LOAD_CUSTOMER_AFTER_CREATE,
  LOAD_JOB_COMBOBOX_OPTIONS,
  LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS,
  LOAD_JOB_DETAIL,
  LOAD_JOB_LIST,
  LOAD_JOB_MODAL,
  LOAD_NEW_JOB,
  SEARCH_COMBOBOX_JOB,
  UPDATE_JOB,
} from '../JobIntents';
import jobDetailLoadResponse from './data/jobDetailEntry';
import jobListFilterResponse from './data/filteredJobList';
import jobListLoadResponse from './data/jobList';
import loadAddedContactResponse from './data/loadAddedContactResponse';
import loadJobOptionsByIdsResponse from './data/loadJobOptionsByIdsResponse';
import loadJobOptionsResponse from './data/loadJobOptionsResponse';
import loadJobSearchResponse from './data/loadJobSearchResponse';
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
const createJobModal = ({ onSuccess }) => onSuccess(success);
const loadJobModal = ({ onSuccess }) => onSuccess(loadNewJobModalResponse);
const loadContactAfterCreate = ({ onSuccess }) =>
  onSuccess(loadAddedContactResponse);

const JobListMapping = {
  [LOAD_JOB_LIST]: loadJobList,
  [LOAD_NEW_JOB]: loadNewJob,
  [FILTER_JOB_LIST]: filterJobList,
  [DELETE_JOB]: deleteJob,
  [UPDATE_JOB]: updateJob,
  [CREATE_JOB]: createJob,
  [CREATE_JOB_MODAL]: createJobModal,
  [LOAD_JOB_DETAIL]: loadJobDetail,
  [LOAD_JOB_MODAL]: loadJobModal,
  [LOAD_CUSTOMER_AFTER_CREATE]: loadContactAfterCreate,
  [LOAD_JOB_COMBOBOX_OPTIONS]: ({ onSuccess }) => {
    const jobOptions = loadJobOptionsResponse.jobOptions.map((option) => {
      const id = Math.floor(Math.random() * 100) + 1;
      return { ...option, id, jobNumber: id };
    });
    onSuccess({ ...loadJobOptionsResponse, jobOptions });
  },
  [LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS]: ({ onSuccess }) =>
    onSuccess(loadJobOptionsByIdsResponse),
  [SEARCH_COMBOBOX_JOB]: ({ onSuccess }) => onSuccess(loadJobSearchResponse),
};

export default JobListMapping;
