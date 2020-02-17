import { connect } from 'react-redux';
import React from 'react';

import { getSuperFundModal } from '../../selectors/SuperFundModalSelectors';
import PayrollDetailSuperannuationDetails from './PayrollDetailSuperannuationDetails';
import PayrollDetailSuperannuationTable from './PayrollDetailSuperannuationTable';
import SuperFundModal from '../SuperFundModal/SuperFundModal';

const PayrollDetailSuperannuation = ({
  superFundModal,
  onUpdatePayrollDetailSuperannuationDetails,
  onAddPayrollSuperPayItem,
  onRemovePayrollSuperPayItem,
  onOpenSuperFundModal,
  superFundModalListeners,
  onOpenSuperPayItemModal,
  onAddPayItemComboClick,
  onAddPayItemComboBlur,
}) => (
  <>
    { superFundModal && <SuperFundModal superFundModalListeners={superFundModalListeners} />}
    <PayrollDetailSuperannuationDetails
      onUpdatePayrollDetailSuperannuationDetails={
        onUpdatePayrollDetailSuperannuationDetails
      }
      onOpenSuperFundModal={onOpenSuperFundModal}
    />
    <hr />
    <PayrollDetailSuperannuationTable
      onAddPayrollSuperPayItem={onAddPayrollSuperPayItem}
      onRemovePayrollSuperPayItem={onRemovePayrollSuperPayItem}
      onOpenSuperPayItemModal={onOpenSuperPayItemModal}
      onAddPayItemComboBlur={onAddPayItemComboBlur}
      onAddPayItemComboClick={onAddPayItemComboClick}
    />
  </>
);

const mapStateToProps = state => ({
  superFundModal: getSuperFundModal(state),
});

export default connect(mapStateToProps)(PayrollDetailSuperannuation);
