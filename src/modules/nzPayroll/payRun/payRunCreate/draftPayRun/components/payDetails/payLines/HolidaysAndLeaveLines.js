import { connect } from 'react-redux';
import React from 'react';

import {
  getHolidayAndLeaveLineEntries,
  getIsAddHolidaysAndLeaveModalOpen,
} from '../../../DraftPayRunSelectors';
import AddHolidaysOrLeaveModal from '../AddHolidaysOrLeaveModal';
import HolidaysAndLeaveRows from '../HolidaysAndLeaveRows';

const HolidaysAndLeaveLines = ({
  tableConfig,
  onAddHolidayAndLeaveClick,
  isAddHolidaysAndLeaveModalOpen,
  onAddHolidaysOrLeaveModalCancel,
  onAddHolidaysOrLeaveModalContinue,
}) => (
  <div>
    <HolidaysAndLeaveRows
      name="Holidays and leave"
      title="Holidays and leave"
      tableConfig={tableConfig}
      onAddHolidayAndLeaveClick={onAddHolidayAndLeaveClick}
    />
    {isAddHolidaysAndLeaveModalOpen && (
      <AddHolidaysOrLeaveModal
        onCancel={onAddHolidaysOrLeaveModalCancel}
        onContinue={onAddHolidaysOrLeaveModalContinue}
      />
    )}
  </div>
);

const mapStateToProps = (state) => ({
  entries: getHolidayAndLeaveLineEntries(),
  isAddHolidaysAndLeaveModalOpen: getIsAddHolidaysAndLeaveModalOpen(state),
});

export default connect(mapStateToProps)(HolidaysAndLeaveLines);
