How to use the Employee Transaction Modal Submodule
===================================================

Step 1: Register the submodule
------------------------------

Import the submodule:
```js
import EmployeeTransactionModalModule from '../employeePay/employeeTransactionModal/EmployeeTransactionModalModule';
```

and initialize within your modules constructor, keeping a reference as a class attribute.

```js
class ConsumerModule {
  constructor({ setRootView, integration }) {
    this.employeeTransactionModal = new EmployeeTransactionModalModule({
      integration,
    });
  }
}
```

Step 2: Pass the modal component to your view
---------------------------------------------
Using the submodules `getView` method, pass the modal component to your view, and render where you would render any other modal.

render function:
```js
render = () => {
  const modalComponent = this.employeeTransactionModal.getView();
  return (
    <MyConsumerView
      employeeTransactionModal={modalComponent}
    />
  );
}
```

inside view:
```js
const MyConsumerView = ({employeeTransactionModal}) => {
  return (
    <BaseTemplate>
      ...
      {employeeTransactionModal}
      ...
    </BaseTemplate>
  );
}
```

Step 3: Define consumer modal open method
-----------------------------------------
Define a module method to call to trigger the modals display.

This method needs to call the submodule `openModal` method, passing in the `transactionId`, `employeeName`, `region` and `businessId`.
```js
    openEmployeeTransactionModal = (transactionId, employeeName) => {
    const state = this.store.getState();
    this.employeeTransactionModal.openModal({
      transactionId,
      employeeName,
      businessId: getBusinessId(state),
      region: getRegion(state),
    });
  }
```
This method can then be called on button click, request onSuccess etc.

and you're done!
