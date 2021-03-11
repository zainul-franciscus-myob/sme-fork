const companyFileStatusMapping = {
  0: 'Unknown',
  1: 'NotReady',
  2: 'ReadOnly',
  3: 'Active',
  4: 'Restoring',
  5: 'Upgrading',
  6: 'Maintenance',
  7: 'ReadyForMigration',
  8: 'Seeding',
  9: 'Migrating',
  10: 'FlaggedForDeletion',
  11: 'ReadyForAllocation',
  12: 'Allocating',
  13: 'InBackup',
  14: 'UpgradingUnallocated',
  15: 'UpgradePending',
  16: 'UpgradeFailedRetriable',
  17: 'UpgradeFailedUnRetriable',
};

export default companyFileStatusMapping;
