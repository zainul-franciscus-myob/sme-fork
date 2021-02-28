import { Combobox, FieldGroup, ReadOnly } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIndustryDetails } from '../businessSettingsSelectors';

const industryCodeMetaData = [
  { columnName: 'Display', showData: 'true', columnWidth: '128px' },
  { columnName: 'Code', columnWidth: '0px' },
  { columnName: 'Searchable', columnWidth: '0px' },
  { columnName: 'Division', columnWidth: '0px' },
];

const IndustryDetailsSection = ({
  industryCodeOptions,
  shouldDisplaySpecificIndustry,
  onIndustryChange,
  industry,
}) => (
  <FieldGroup label="Industry details">
    {shouldDisplaySpecificIndustry && (
      <ReadOnly name="BusinessDivision" label="Business industry">
        <strong>{industry}</strong>
      </ReadOnly>
    )}
    {shouldDisplaySpecificIndustry && (
      <Combobox
        items={industryCodeOptions}
        metaData={industryCodeMetaData}
        name="ANZSICCode"
        label="Specific industry code"
        renderItem={(columnName, item) => {
          return columnName === 'Display' ? item.Display : '';
        }}
        onChange={onIndustryChange}
        noMatchFoundMessage="There seems to be no industry matching your clues. Please try another clue"
      />
    )}
  </FieldGroup>
);

const mapStateToProps = (state) => getIndustryDetails(state);

export default connect(mapStateToProps)(IndustryDetailsSection);
