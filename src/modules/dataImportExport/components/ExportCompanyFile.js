import { DatePicker, Input, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getExportCompanyFileDetail } from '../selectors/ExportCompanyFileSelectors';
import handleDatePickerChange from '../../../components/handlers/handleDatePickerChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../components/handlers/handleSelectChange';

const ExportCompanyFile = ({
  dateFrom,
  dateTo,
  fileType,
  clientCode,
  fileTypeOptions,
  shouldShowClientCode,
  onChange,
}) => (
  <>
    <DatePicker
      name="dateFrom"
      label="Date from"
      requiredLabel="This is required"
      value={dateFrom}
      onSelect={handleDatePickerChange(onChange, 'dateFrom')}
    />
    <DatePicker
      name="dateTo"
      label="Date to"
      requiredLabel="This is required"
      value={dateTo}
      onSelect={handleDatePickerChange(onChange, 'dateTo')}
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
        onChange={handleInputChange(onChange)}
        maxLength={10}
      />
    )}
  </>
);

const mapStateToProps = (state) => getExportCompanyFileDetail(state);

export default connect(mapStateToProps)(ExportCompanyFile);
