import { connect } from 'react-redux';
import React from 'react';

import { getSuperFundModal } from '../../selectors/SuperFundModalSelectors';
import { getSuperPayItemModal } from '../../selectors/SuperPayItemModalSelectors';
import PayrollDetailSuperannuationDetails from './PayrollDetailSuperannuationDetails';
import PayrollDetailSuperannuationTable from './PayrollDetailSuperannuationTable';
import SuperFundModal from '../SuperFundModal/SuperFundModal';
import SuperPayItemModal from '../SuperPayItemModal/SuperPayItemModal';

const PayrollDetailSuperannuation = ({
  superFundModal,
  superPayItemModal,
  onUpdatePayrollDetailSuperannuationDetails,
  onAddPayrollSuperPayItem,
  onRemovePayrollSuperPayItem,
  onOpenSuperFundModal,
  superFundModalListeners,
  onOpenSuperPayItemModal,
  superPayItemModalListeners,
}) => (
  <>
    { superFundModal && <SuperFundModal superFundModalListeners={superFundModalListeners} />}
    { superPayItemModal && <SuperPayItemModal {...superPayItemModalListeners} />}
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
    />
  </>
);

const mapStateToProps = state => ({
  superFundModal: getSuperFundModal(state),
  superPayItemModal: getSuperPayItemModal(state),
});

export default connect(mapStateToProps)(PayrollDetailSuperannuation);
