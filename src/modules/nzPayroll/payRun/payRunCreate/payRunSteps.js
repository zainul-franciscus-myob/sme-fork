export const DONE = {
  key: 'done',
  index: 4,
};

export const PREPARE_PAYSLIPS = {
  key: 'preparePaySlips',
  index: 3,
  nextStep: DONE,
};

export const RECORD_AND_REPORT = {
  key: 'recordAndReport',
  index: 2,
  nextStep: PREPARE_PAYSLIPS,
};

export const DRAFT_PAY_RUN = {
  key: 'draftPayRun',
  index: 1,
  nextStep: RECORD_AND_REPORT,
};

export const START_PAY_RUN = {
  key: 'startPayRun',
  index: 0,
  nextStep: DRAFT_PAY_RUN,
};
