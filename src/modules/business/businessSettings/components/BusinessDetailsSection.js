import {
  Combobox,
  FieldGroup,
  InfoIcon,
  Input,
  ReadOnly,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBusinessDetails,
  getIsRegionAu,
} from '../businessSettingsSelectors';
import AuTaxDetails from './AuTaxDetails';
import NzTaxDetails from './NzTaxDetails';

const onInputChange = (handler) => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const industryCodeMetaData = [
  { columnName: 'Display', showData: 'true', columnWidth: '128px' },
  { columnName: 'Code', columnWidth: '0px' },
  { columnName: 'Searchable', columnWidth: '0px' },
  { columnName: 'Division', columnWidth: '0px' },
];

const BusinessDetailsSection = ({
  serialNumber,
  organisationName,
  tradingName,
  isAu,
  onChange,
  clientCode,
  industryCodeOptions,
  shouldDisplaySpecificIndustry,
  onIndustryChange,
  industry,
}) => (
  <FieldGroup label="Business details">
    <ReadOnly name="serialNumber" label="MYOB serial number">
      {serialNumber}
    </ReadOnly>
    <Input
      name="organisationName"
      label="Business name"
      value={organisationName}
      requiredLabel="required"
      onChange={onInputChange(onChange)}
      width="xl"
    />
    <Input
      name="tradingName"
      label="Trading name"
      value={tradingName}
      onChange={onInputChange(onChange)}
      maxLength={100}
      width="xl"
    />
    {isAu ? (
      <AuTaxDetails onChange={onChange} />
    ) : (
      <NzTaxDetails onChange={onChange} />
    )}
    <Input
      name="clientCode"
      label="Client code"
      value={clientCode}
      onChange={onInputChange(onChange)}
      maxLength={10}
      width="sm"
    />
    {shouldDisplaySpecificIndustry && (
      <ReadOnly name="BusinessDivision" label="Business Industry">
        <strong>{industry}</strong>
      </ReadOnly>
    )}
    {shouldDisplaySpecificIndustry && (
      <Combobox
        items={industryCodeOptions}
        metaData={industryCodeMetaData}
        name="ANZSICCode"
        label="Specific Industry"
        renderItem={(columnName, item) => {
          return columnName === 'Display' ? item.Display : '';
        }}
        onChange={onIndustryChange}
        labelAccessory={
          <Tooltip triggerContent={<InfoIcon />}>
            Choose or search for the industry most like yours
          </Tooltip>
        }
        noMatchFoundMessage="There seems to be no industry matching your clues. Please try another clue"
      />
    )}
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  ...getBusinessDetails(state),
  isAu: getIsRegionAu(state),
});

export default connect(mapStateToProps)(BusinessDetailsSection);
