import { FieldGroup, FormHorizontal, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import * as selectors from '../PersonalDetailsNzSelector';
import Contact from './Contact';
import Personal from './Personal';

const onInputChange = (handler) => (e) => {
  const { name, value } = e.target;
  handler({ key: name, value });
};

const PersonalDetailsNzTab = ({
  personalDetail,
  showAddPhoneButton,
  onPersonalDetailsChange,
  genderOptions,
  calculatedAge,
}) => {
  const view = (
    <FormHorizontal layout="primary">
      <Personal
        personalDetail={personalDetail}
        onPersonalDetailsChange={onPersonalDetailsChange}
        isEap
        genderOptions={genderOptions}
        calculatedAge={calculatedAge}
      />
      <Contact
        personalDetail={personalDetail}
        onPersonalDetailsChange={onPersonalDetailsChange}
        showAddPhoneButton={showAddPhoneButton}
      />
      <FieldGroup label="More information">
        <TextArea
          label="Notes"
          name="notes"
          value={personalDetail.notes}
          rows={3}
          width="lg"
          onChange={onInputChange(onPersonalDetailsChange)}
        />
      </FieldGroup>
    </FormHorizontal>
  );

  return view;
};

const mapStateToProps = (state) => ({
  personalDetail: selectors.getPersonalDetail(state),
  showAddPhoneButton: selectors.getAddPhoneButton(state),
  genderOptions: selectors.getGenderOptions(state),
  calculatedAge: selectors.getCalculatedAge(state),
});

export default connect(mapStateToProps)(PersonalDetailsNzTab);
