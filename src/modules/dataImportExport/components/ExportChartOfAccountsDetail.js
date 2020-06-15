import { Alert, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getChartOfAccountExportDetail } from '../selectors/DataImportExportSelectors';
import ImportExportFileType from '../types/ImportExportFileType';
import handleSelectChange from '../../../components/handlers/handleSelectChange';
import styles from './ExportChartOfAccountsDetail.module.css';

const ExportChartOfAccountsDetail = ({
  chartOfAccountsDetail: {
    financialYears,
    financialYear,
    accountBalanceTransactionOptions,
    accountBalanceTransaction,
    // fileTypeOptions,
    fileType,
  },
  onChange,
}) => (
    <>
      {/* Export COA as CSV is disabled for now due to the
       Account Number formatting issue in Excel */}
      {/* <Select
        key="fileType"
        name="fileType"
        label="File type"
        value={fileType}
        requiredLabel="This is required"
        onChange={handleSelectChange(onChange)}
      >
        {fileTypeOptions.map(option => (
          <Select.Option
            key={option.value}
            value={option.value}
            label={option.name}
          />
        ))}
      </Select> */}
      <Select
        key="financialYear"
        name="financialYear"
        label="Balances from"
        value={financialYear}
        requiredLabel="This is required"
        onChange={handleSelectChange(onChange)}
      >
        <Select.Option hidden value="" label="" key="blank" />
        {financialYears.map(year => (
          <Select.Option
            key={year.value}
            value={year.value}
            label={year.name}
          />
        ))}
      </Select>
      <Select
        key="accountBalanceTransaction"
        name="accountBalanceTransaction"
        label="Account balance"
        value={accountBalanceTransaction}
        requiredLabel="This is required"
        onChange={handleSelectChange(onChange)}
      >
        <Select.Option hidden value="" label="" key="blank" />
        {accountBalanceTransactionOptions.map(option => (
          <Select.Option
            key={option.value}
            value={option.value}
            label={option.name}
          />
        ))}
      </Select>
      {fileType === ImportExportFileType.TXT
        && <div className={styles.exportInfoAlert}>
          <Alert type="info">
            The file will be exported as a tab-separated TXT file.
            The first row will be a header row, listing all field headers.
          </Alert>
        </div>}
    </>
);

const mapStateToProps = state => ({
  chartOfAccountsDetail: getChartOfAccountExportDetail(state),
});

export default connect(mapStateToProps)(ExportChartOfAccountsDetail);
