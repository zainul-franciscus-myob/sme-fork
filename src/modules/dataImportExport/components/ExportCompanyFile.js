import { Input, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getExportCompanyFileDetail,
  getShouldShowTaxCodeMappingTable,
} from '../selectors/ExportCompanyFileSelectors';
import {
  getLastMonthInFinancialYear,
  getRegion,
} from '../selectors/DataImportExportSelectors';
import PeriodPicker from '../../../components/PeriodPicker/PeriodPicker';
import TaxCodeMappingTable from './TaxCodeMappingTable';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../components/handlers/handleSelectChange';

const ExportCompanyFile = ({
  fileDetails: {
    dateFrom,
    dateTo,
    fileType,
    clientCode,
    fileTypeOptions,
    period,
    shouldShowClientCode,
  },
  shouldShowTaxCodeMappingTable,
  onChange,
  region,
  lastMonthInFinancialYear,
  onPeriodChange,
  onTaxCodeMappingChange,
}) => {
  return (
    <>
      <PeriodPicker
        lastMonthInFinancialYear={lastMonthInFinancialYear}
        region={region}
        period={period}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onChange={onPeriodChange}
        required
      />
      <Select
        key="fileType"
        name="fileType"
        label="Export file type"
        requiredLabel="This is required"
        value={fileType}
        onChange={handleSelectChange(onChange)}
      >
        <Select.Option hidden value="" label="" key="blank" />
        {fileTypeOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
      {shouldShowClientCode && (
        <Input
          label="Client code"
          name="clientCode"
          requiredLabel="This is required"
          value={clientCode}
          disabled
          onChange={handleInputChange(onChange)}
          maxLength={10}
        />
      )}
      {shouldShowTaxCodeMappingTable && (
        <TaxCodeMappingTable onChange={onTaxCodeMappingChange} />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  region: getRegion(state),
  fileDetails: getExportCompanyFileDetail(state),
  lastMonthInFinancialYear: getLastMonthInFinancialYear(state),
  shouldShowTaxCodeMappingTable: getShouldShowTaxCodeMappingTable(state),
});

export default connect(mapStateToProps)(ExportCompanyFile);
