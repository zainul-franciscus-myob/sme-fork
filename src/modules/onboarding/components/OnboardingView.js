import {
  Alert,
  Button,
  ButtonRow,
  Card,
  Checkbox,
  CheckboxGroup,
  Combobox,
  Icons,
  Input,
  MYOBLogo,
  RadioButton,
  RadioButtonGroup,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getAlert,
  getIndustryItems,
  getIndustryMetaData,
  getIsBusinessNameEdited,
  getIsFormSubmitted,
  getIsMoveToMyobEnabled,
  getLoadingState,
  getOnboardingDetails,
} from '../OnboardingSelectors';
import LoadingPageState from '../../../components/LoadingPageState/LoadingPageState';
import PageView from '../../../components/PageView/PageView';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../components/handlers/handleRadioButtonChange';
import styles from './OnboardingView.module.css';
import welcomeImage from './welcome.svg';

const OnboardingView = ({
  alert,
  businessId,
  businessName,
  businessRole,
  businessRoles,
  industryMetaData,
  industryId,
  industryItems,
  isBusinessNameEdited,
  isFormSubmitted,
  isMoveToMyobEnabled,
  onChangeBusinessName,
  onChangeBusinessRole,
  onChangeIndustry,
  onDismissAlert,
  onSave,
  onSelectUsingCompetitorProduct,
  usingCompetitorProduct,
  loadingState,
}) => {
  if (!businessId) return <LoadingPageState />;

  const businessNameError = 'Business name is required.';
  const industryError = 'Your industry is required.';
  const businessRoleError = 'Your role is required.';

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const action = (
    <div>
      <ButtonRow>
        <Button onClick={onSave}>Get down to business</Button>
      </ButtonRow>
    </div>
  );

  const view = (
    <div className={styles.fullScreen}>
      <div className={styles.logo}>
        <MYOBLogo />
      </div>

      <div className={classNames(styles.column, styles.img)}>
        <img
          src={welcomeImage}
          alt="Grid of 20 people from different industries, including trades, retail and food service"
          width="100%"
          height="auto"
        />
      </div>

      <div className={classNames(styles.column, styles.form)}>
        <h1>Welcome to MYOB!</h1>

        <Card classes={[styles.card]}>
          <p className={styles.intro}>
            Let&apos;s start with a few details that will help us personalise
            your experience.
          </p>

          <div>
            <Input
              autoComplete="off"
              autoFocus
              className={styles.input}
              errorMessage={
                !businessName &&
                (isBusinessNameEdited || isFormSubmitted) &&
                businessNameError
              }
              name="businessName"
              label="What's the name of your business?"
              onChange={handleInputChange(onChangeBusinessName)}
              requiredLabel="This is required"
              value={businessName}
            />
          </div>

          <div>
            <Combobox
              defaultItem={industryItems.find((ind) => ind.id === industryId)}
              errorMessage={!industryId && isFormSubmitted && industryError}
              items={industryItems}
              label="What industry is your business in?"
              metaData={industryMetaData}
              name="industry"
              noMatchFoundMessage="No match found"
              onChange={handleComboboxChange('industry', onChangeIndustry)}
              requiredLabel="This is required"
            />
          </div>

          <div>
            <RadioButtonGroup
              label="How would you best describe your role?"
              name="businessRole"
              onChange={handleRadioButtonChange(
                'businessRole',
                onChangeBusinessRole
              )}
              value={businessRole}
              requiredLabel="This is required"
              errorMessage={
                !businessRole && isFormSubmitted && businessRoleError
              }
              renderRadios={({ id, value, ...props }) => {
                return businessRoles.map((businessType) => (
                  <RadioButton
                    {...props}
                    className={styles.radioButtons}
                    checked={value === businessType.id}
                    key={businessType.id}
                    value={businessType.id}
                    label={businessType.title}
                    labelAccessory={
                      businessType.id === 'Student' ? (
                        <Tooltip triggerContent={<Icons.Info />}>
                          As a student or teacher using this trial you still get
                          access to all our features
                        </Tooltip>
                      ) : (
                        ''
                      )
                    }
                  />
                ));
              }}
            />
          </div>
          {isMoveToMyobEnabled && (
            <div>
              <CheckboxGroup
                renderCheckbox={() => (
                  <Checkbox
                    name="usingCompetitorProduct"
                    label="I currently use Xero, QuickBooks desktop or Reckon desktop"
                    onChange={handleCheckboxChange(
                      onSelectUsingCompetitorProduct
                    )}
                    checked={usingCompetitorProduct}
                  />
                )}
              />
            </div>
          )}
        </Card>
        {alertComponent}
        {action}
      </div>
    </div>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  ...getOnboardingDetails(state),
  isMoveToMyobEnabled: getIsMoveToMyobEnabled(state),
  isBusinessNameEdited: getIsBusinessNameEdited(state),
  loadingState: getLoadingState(state),
  industryItems: getIndustryItems(state),
  industryMetaData: getIndustryMetaData(),
  isFormSubmitted: getIsFormSubmitted(state),
});

export default connect(mapStateToProps)(OnboardingView);
