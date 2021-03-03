const JobMakerActionTypes = {
  Nominate: 'nominate',
  CancelNominate: 'nominatex',
  ReNominate: 'renominate',
  CancelReNominate: 'renominatex',
  Claim: 'claim',
  CancelClaim: 'claimx',
  UpdateEmployee: 'updateEmployee',
  UpdateEmployeeReNominate: 'updateEmployeeRenominate',
};

export const isValidJobMakerAction = (action) =>
  Object.values(JobMakerActionTypes).indexOf(action) !== -1;

export default JobMakerActionTypes;
