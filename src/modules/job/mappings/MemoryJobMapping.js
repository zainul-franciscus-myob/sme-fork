import {
  FILTER_JOB_LIST,
  LOAD_JOB_LIST,
} from '../JobIntents';
import jobListFilterResponse from './data/filterJobList';
import jobListLoadResponse from './data/jobList';

const loadJobList = ({ onSuccess }) => onSuccess(jobListLoadResponse);
const filterJobList = ({ onSuccess }) => onSuccess(jobListFilterResponse);

const JobListMapping = {
  [LOAD_JOB_LIST]: loadJobList,
  [FILTER_JOB_LIST]: filterJobList,
};

export default JobListMapping;
