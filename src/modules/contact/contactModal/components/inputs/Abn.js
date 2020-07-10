import { Button, Field, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAbn, getAbnLink } from '../../ContactModalSelectors';
import AbnInput from '../../../../../components/autoFormatter/AbnInput/AbnInput';
import handleAbnInputChange from '../../../../../components/handlers/handleAbnInputChange';

const openNewTab = (url) => () => window.open(url);

const Abn = ({ abn, abnLink, onChange }) => (
  <>
    <AbnInput
      name="abn"
      label="ABN"
      value={abn}
      onChange={handleAbnInputChange(onChange)}
      width="sm"
    />
    <Field
      label="ABN lookup"
      hideLabel
      renderField={() => (
        <Button
          type="link"
          icon={<Icons.OpenExternalLink />}
          iconRight
          onClick={openNewTab(abnLink)}
        >
          Open ABN lookup website
        </Button>
      )}
    />
  </>
);

const mapStateToProps = (state) => ({
  abn: getAbn(state),
  abnLink: getAbnLink(state),
});

export default connect(mapStateToProps)(Abn);
