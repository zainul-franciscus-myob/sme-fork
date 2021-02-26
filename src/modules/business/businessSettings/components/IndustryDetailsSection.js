import {
  Combobox,
  FieldGroup,
  InfoIcon,
  ReadOnly,
  Tooltip,
} from '@myob/myob-widgets';
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

const mapStateToProps = (state) => getIndustryDetails(state);

export default connect(mapStateToProps)(IndustryDetailsSection);
