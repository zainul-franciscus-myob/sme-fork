import {
  Button, Checkbox, CheckboxGroup, FieldGroup, Icons, Input, Modal, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDescription,
  getIsAlertShown,
  getIsBuying,
  getIsLoading,
  getIsOpen,
  getIsSelling,
  getItemId,
  getName,
  getTaxCodeLabel,
  getUseDescription,
} from '../selectors/InventoryModalSelectors';
import BuyingDetails from './BuyingDetails';
import InventoryModalAlert from './InventoryModalAlert';
import PageView from '../../../../components/PageView/PageView';
import SellingDetails from './SellingDetails';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const InventoryModalView = ({
  isOpen,
  isLoading,
  isAlertShown,
  isBuying,
  isSelling,
  name,
  description,
  useDescription,
  itemId,
  taxCodeLabel,
  onUpdateItemOption,
  onUpdateSellingOption,
  onUpdateBuyingOption,
  onOpenBuyingDetails,
  onOpenSellingDetails,
  onClose,
  onSave,
  onDismissAlert,
  onUpdateIsBuying,
  onUpdateIsSelling,
}) => {
  const view = (
    <React.Fragment>
      <Modal.Body>
        {isAlertShown && <InventoryModalAlert onDismissAlert={onDismissAlert} />}
        <FieldGroup label="Item details">
          <Input label="Name" name="name" requiredLabel="This is required" value={name} onChange={handleInputChange(onUpdateItemOption)} />
          <TextArea label="Description" name="description" value={description} onChange={handleInputChange(onUpdateItemOption)} />
          <CheckboxGroup renderCheckbox={() => (
            <Checkbox label="Use description on transaction instead of name" name="useDescription" checked={useDescription} onChange={handleCheckboxChange(onUpdateItemOption)} />
          )}
          />
          <Input label="Item ID" name="displayId" requiredLabel="This is required" value={itemId} onChange={handleInputChange(onUpdateItemOption)} width="sm" />
        </FieldGroup>

        {!isSelling
        && (
        <FieldGroup>
          <Button type="link" icon={<Icons.Add />} onClick={onOpenSellingDetails}>Add selling details</Button>
        </FieldGroup>
        )
      }

        {isSelling && (
        <SellingDetails
          taxCodeLabel={taxCodeLabel}
          onUpdateSellingOption={onUpdateSellingOption}
          onUpdateIsSelling={onUpdateIsSelling}
        />
        )}

        {!isBuying && (
        <FieldGroup>
          <Button type="link" icon={<Icons.Add />} onClick={onOpenBuyingDetails}>Add buying details</Button>
        </FieldGroup>
        )}

        {isBuying && (
        <BuyingDetails
          taxCodeLabel={taxCodeLabel}
          onOpenBuyingDetails={onOpenBuyingDetails}
          onUpdateBuyingOption={onUpdateBuyingOption}
          onUpdateIsBuying={onUpdateIsBuying}
        />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} type="secondary">Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </Modal.Footer>
    </React.Fragment>
  );

  return (
    isOpen && (
      <Modal title="Create item" size="small" onCancel={onClose}>
        <PageView
          isLoading={isLoading}
          view={view}
        />
      </Modal>
    )
  );
};

const mapStateToProps = state => ({
  isOpen: getIsOpen(state),
  name: getName(state),
  description: getDescription(state),
  useDescription: getUseDescription(state),
  itemId: getItemId(state),
  isLoading: getIsLoading(state),
  isAlertShown: getIsAlertShown(state),
  taxCodeLabel: getTaxCodeLabel(state),
  isBuying: getIsBuying(state),
  isSelling: getIsSelling(state),
});

export default connect(mapStateToProps)(InventoryModalView);
