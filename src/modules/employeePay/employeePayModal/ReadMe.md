How to use the Employee Transaction Modal Submodule
===================================================

Step 1: Register the submodule
------------------------------

Import the submodule:
```js
import EmployeePayModalModule from '../employeePay/employeePayModal/EmployeePayModalModule';
```

and initialize within your modules constructor, keeping a reference as a class attribute.

```js
class ConsumerModule {
  constructor({ setRootView, integration }) {
    this.employeePayModal = new EmployeePayModalModule({
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
  const modalComponent = this.employeePayModal.getView();
  return (
    <MyConsumerView
      employeePayModal={modalComponent}
    />
  );
}
```

inside view:
```js
const MyConsumerView = ({employeePayModal}) => {
  return (
    <BaseTemplate>
      ...
      {employeePayModal}
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
    openEmployeePayModal = (transactionId, employeeName) => {
    const state = this.store.getState();
    this.employeePayModal.openModal({
      transactionId,
      employeeName,
      businessId: getBusinessId(state),
      region: getRegion(state),
    });
  }
```
This method can then be called on button click, request onSuccess etc.

and you're done!
