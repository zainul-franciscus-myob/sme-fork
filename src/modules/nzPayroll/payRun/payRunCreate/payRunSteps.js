const startPayRunKey = 'startPayRun';
const draftPayRunKey = 'draftPayRun';
const recordAndReportKey = 'recordAndReport';
const preparePaySlipsKey = 'preparePaySlips';
const doneKey = 'done';

export const DONE = {
  key: doneKey,
  index: 4,
};

export const PREPARE_PAYSLIPS = {
  key: preparePaySlipsKey,
  index: 3,
  nextStepKey: doneKey,
};

export const RECORD_AND_REPORT = {
  key: recordAndReportKey,
  index: 2,
  nextStepKey: preparePaySlipsKey,
};

export const DRAFT_PAY_RUN = {
  key: draftPayRunKey,
  index: 1,
  nextStepKey: recordAndReportKey,
  previousStepKey: startPayRunKey,
};

export const START_PAY_RUN = {
  key: startPayRunKey,
  index: 0,
  nextStepKey: draftPayRunKey,
};

export const PAY_RUN_STEPS = [
  DONE,
  PREPARE_PAYSLIPS,
  RECORD_AND_REPORT,
  DRAFT_PAY_RUN,
  START_PAY_RUN,
];
