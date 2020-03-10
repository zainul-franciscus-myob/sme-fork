import {
  FILTER_JOB_LIST,
  LOAD_JOB_LIST,
} from '../JobIntents';

const JobListMapping = {
  [FILTER_JOB_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/job/filter_job_list`,
  },
  [LOAD_JOB_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/job/load_job_list`,
  },
};

export default JobListMapping;
