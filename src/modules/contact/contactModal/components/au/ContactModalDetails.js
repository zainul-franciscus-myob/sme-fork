import { FieldGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsCompany,
  getIsSupplier,
  getShowContactType,
} from '../../ContactModalSelectors';
import Abn from '../inputs/Abn';
import CompanyName from '../inputs/CompanyName';
import ContactType from '../inputs/ContactType';
import Designation from '../inputs/Designation';
import IndividualName from '../inputs/IndividualName';
import IsReportable from '../inputs/IsReportable';
import ReferenceId from '../inputs/ReferenceId';

const ContactModalDetails = ({
  isCompany,
  isSupplier,
  showContactType,
  onChange,
}) => (
  <FieldGroup label="Details">
    {showContactType && <ContactType onChange={onChange} />}
    <Designation onChange={onChange} />
    {isCompany && <CompanyName onChange={onChange} />}
    {!isCompany && <IndividualName onChange={onChange} />}
    {isSupplier && <IsReportable onChange={onChange} />}
    <Abn onChange={onChange} />
    <ReferenceId onChange={onChange} />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  isCompany: getIsCompany(state),
  isSupplier: getIsSupplier(state),
  showContactType: getShowContactType(state),
});

export default connect(mapStateToProps)(ContactModalDetails);
