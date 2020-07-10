import { Field, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAbn,
  getAbnLink,
  getAbnValidationResult,
  getIsValidatingAbn,
  getRegion,
} from '../contactDetailSelectors';
import AbnInput from '../../../../components/autoFormatter/AbnInput/AbnInput';
import LinkButton from '../../../../components/Button/LinkButton';

const onAbnInputChange = (handler) => (e) => {
  const { name, rawValue } = e.target;
  handler({ key: name, value: rawValue });
};

const AbnSection = ({
  abn,
  abnLink,
  region,
  validationResult,
  isLoading,
  onContactDetailsChange,
  onBlur,
}) => {
  const auView = (
    <React.Fragment>
      <AbnInput
        name="abn"
        label="ABN"
        value={abn}
        onBlur={onBlur}
        onChange={onAbnInputChange(onContactDetailsChange)}
        width="sm"
        validationResult={validationResult}
        isLoading={isLoading}
      />
      <Field
        label="ABN lookup"
        hideLabel
        renderField={() => (
          <LinkButton
            icon={<Icons.OpenExternalLink />}
            iconRight
            isOpenInNewTab
            href={abnLink}
          >
            Open ABN lookup website
          </LinkButton>
        )}
      />
    </React.Fragment>
  );

  return {
    au: auView,
    nz: <></>,
  }[region];
};

const mapStateToProps = (state) => ({
  abn: getAbn(state),
  abnLink: getAbnLink(state),
  region: getRegion(state),
  validationResult: getAbnValidationResult(state),
  isLoading: getIsValidatingAbn(state),
});

export default connect(mapStateToProps)(AbnSection);
