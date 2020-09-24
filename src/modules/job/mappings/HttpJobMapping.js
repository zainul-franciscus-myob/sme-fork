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

const JobListMapping = {
  [FILTER_JOB_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/job/filter_job_list`,
  },
  [LOAD_JOB_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/job/load_job_list`,
  },
  [LOAD_NEW_JOB]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/job/load_new_job_detail`,
  },
  [LOAD_JOB_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, jobId }) =>
      `/${businessId}/job/load_job_detail/${jobId}`,
  },
  [CREATE_JOB]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/job/create_job`,
  },
  [CREATE_JOB_MODAL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/job/create_job_modal`,
  },
  [UPDATE_JOB]: {
    method: 'PUT',
    getPath: ({ businessId, jobId }) =>
      `/${businessId}/job/update_job_detail/${jobId}`,
  },
  [DELETE_JOB]: {
    method: 'DELETE',
    getPath: ({ businessId, jobId }) =>
      `/${businessId}/job/delete_job/${jobId}`,
  },
  [LOAD_JOB_MODAL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/job/load_new_job_modal`,
  },
  [LOAD_CUSTOMER_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, customerId }) =>
      `/${businessId}/job/load_contact/${customerId}`,
  },
  [LOAD_JOB_COMBOBOX_OPTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/job/load_job_options`,
  },
  [LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/job/load_job_options_by_ids`,
  },
  [SEARCH_COMBOBOX_JOB]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/job/load_job_options`,
  },
};

export default JobListMapping;
