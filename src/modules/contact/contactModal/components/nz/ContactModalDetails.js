import { Accordion } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsCompany, getShowContactType } from '../../ContactModalSelectors';
import CompanyName from '../inputs/CompanyName';
import ContactType from '../inputs/ContactType';
import Designation from '../inputs/Designation';
import IndividualName from '../inputs/IndividualName';
import ReferenceId from '../inputs/ReferenceId';

const ContactModalDetails = ({ isCompany, showContactType, onChange }) => (
  <>
    {showContactType && <ContactType onChange={onChange} />}
    <Designation onChange={onChange} />
    {isCompany && <CompanyName onChange={onChange} />}
    {!isCompany && <IndividualName onChange={onChange} />}
    <Accordion label={'Contact ID'}>
      <ReferenceId onChange={onChange} />
    </Accordion>
  </>
);

const mapStateToProps = (state) => ({
  isCompany: getIsCompany(state),
  showContactType: getShowContactType(state),
});

export default connect(mapStateToProps)(ContactModalDetails);
