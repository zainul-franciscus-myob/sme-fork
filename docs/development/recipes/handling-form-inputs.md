# Handling Form Inputs

[Feelix](https://feelix.myob.com/) provides almost all the form inputs we require, but the `onChange` data from each comes in different forms (e.g. raw `SyntheticEvent`). 

To make interacting with these components easier, there are a number of `handler` helpers that always provide the data in a consistent format:

* `key` is typically the `name` attribute of the component
* `value` is the new value entered by the user 

```jsx
// View

const View = ({
  firstName,
  lastName,
  birthday,
  isDeveloper,
  onUpdateForm,
}) => (
  <form>
    <Input
      name="fistName"
      label="First Name"
      value={firstName}
      onChange={handleInputChange(onUpdateForm)}
    />
    <Input
      name="lastName"
      label="Last Name"
      value={lastName}
      onChange={handleInputChange(onUpdateForm)}
    />
    <DatePicker
      label="Birthday"
      value={birthday}
      onSelect={handleDateChange('birthday', onUpdateForm)}
    />
    <CheckboxGroup
      renderCheckbox={() => (
        <Checkbox
          name="isDeveloper"
          label="Is a Developer?"
          checked={isDeveloper}
          onChange={handleCheckboxChange(onUpdateForm)}
        />
      )}
    />
  </form>
);

const mapStateToProps = state => ({
  firstName: getFirstName(state),
  lastName: getLastName(state),
  birthday: getBirthday(state),
  isDeveloper: getIsDeveloper(state),
});

export default connect(mapStateToProps)(View);
```

```jsx
// Module

updateForm = ({ key, value }) => {
  this.dispatcher.updateForm({ key, value })
}

render = () => ({
  return (
    <Provider store={this.store}>
      <View 
        onUpdateForm={this.updateForm}
      />
    </Provider>
  );
})
```

```js
// Intent

const UPDATE_FORM = Symbol('Update form');
```

```js
// Dispatcher

const updateForm = ({ key, value }) => {
  store.dispatch({
    intent: UPDATE_FORM
    key,
    value,
  })
}
```

```js
// Reducer

const getDetaultState = () => ({
  firstName: '',
  lastName: '',
  birthday: '',
  isDeveloper: false
});

const updateForm = (state, { key, value }) => ({
  ...state,
  [key]: value,
});
```
