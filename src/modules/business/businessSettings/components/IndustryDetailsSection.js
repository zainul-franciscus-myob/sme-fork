import {
  Alert,
  Combobox,
  Field,
  FieldGroup,
  ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { useState } from 'react';

import {
  getIndustryDetails,
  logSearchData,
} from '../businessSettingsSelectors';

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
  industryAlertOpen,
}) => {
  const [timer, setTimer] = useState();

  function logData(event) {
    if (timer) {
      clearTimeout(timer);
      setTimer(0);
    }
    setTimer(setTimeout(() => logSearchData(event), 500));
  }

  const onEntryKeydown = (event) => logData(event);
  return (
    shouldDisplaySpecificIndustry && (
      <FieldGroup label="Industry details">
        <ReadOnly name="BusinessDivision" label="Business industry">
          <strong>{industry}</strong>
        </ReadOnly>
        <Combobox
          items={industryCodeOptions}
          metaData={industryCodeMetaData}
          name="ANZSICCode"
          label="Specific industry code"
          renderItem={(columnName, item) => {
            return columnName === 'Display' ? item.Display : '';
          }}
          onChange={onIndustryChange}
          onInputValueChange={onEntryKeydown}
          noMatchFoundMessage="There seems to be no industry matching your clues. Please try another clue"
        />
        {industryAlertOpen && (
          <Field
            label=""
            hideLabel
            width="xxl"
            renderField={() => (
              <Alert inline type="warning">
                Tell us more about your industry to help us personalise your
                MYOB experience. Browse or search by{' '}
                <a
                  href="https://www.ato.gov.au/Calculators-and-tools/Business-industry-code-tool/"
                  target="_ANZSIC"
                >
                  ANZSIC code
                </a>
                . Specific industry codes may change the Business industry.
              </Alert>
            )}
          />
        )}
      </FieldGroup>
    )
  );
};

const mapStateToProps = (state) => getIndustryDetails(state);

export default connect(mapStateToProps)(IndustryDetailsSection);
