import {
  Alert,
  Button,
  ButtonRow,
  Card,
  Combobox,
  Icons,
  Input,
  MYOBLogo,
  RadioButton,
  RadioButtonGroup,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import classNames from 'classnames';

import BusinessRoles from './businessRoles';
import LoadingPageState from '../../../components/LoadingPageState/LoadingPageState';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../components/handlers/handleRadioButtonChange';
import industries from './Industries';
import styles from './OnboardingView.module.css';
import welcomeImage from './welcome.svg';

const industryData = [
  { columnName: 'title', showData: true },
  { columnName: 'secondary' },
];

const industryItems = industries.map((industry) => ({
  id: industry.id,
  title: industry.title,
  secondary: industry.examples && `Eg. ${industry.examples.join(', ')}`,
}));

class OnboardingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessNameError: '',
      industryError: '',
      businessRoleError: '',
      hasRendered: false,
    };
    this.dispatcher = props.dispatcher;
    this.onSave = props.onSave;
    this.businessId = props.businessId;

    this.alert = props.updateOnboardingSettingsFailure
      ? {
          type: 'danger',
          message: 'Sorry, something went wrong on our end. Please try again.',
        }
      : null;
  }

  componentDidMount() {
    this.onFirstRender();
  }

  onFirstRender = () => {
    const { hasRendered } = this.state;
    const { onLoad } = this.props;
    if (hasRendered) return;

    this.setState({ hasRendered: true });
    onLoad();
  };

  save = (event) => {
    event.preventDefault();
    const {
      props: { businessName, businessRole, industryId },
    } = this;

    let businessNameError = null;
    let industryError = null;
    let businessRoleError = null;

    if (businessName === '')
      businessNameError = 'You need to enter a business name';
    if (industryId === '') industryError = 'You need to select an industry';
    if (businessRole === '') businessRoleError = 'You need to select your role';

    this.setState({ businessNameError, industryError, businessRoleError });

    if (!businessNameError && !industryError && !businessRoleError) {
      this.onSave(event, { businessName, businessRole, industryId });
    }
  };

  onChangeBusinessName = (businessName) => {
    this.dispatcher.setViewData({ proposedBusinessName: businessName.value });
  };

  onChangeIndustry = (industry) => {
    this.dispatcher.setViewData({ industryId: industry.value });
  };

  onChangeBusinessRole = (businessRole) => {
    this.dispatcher.setViewData({ businessRole: businessRole.value });
  };

  render() {
    const {
      onChangeBusinessName,
      onChangeBusinessRole,
      onChangeIndustry,
      props: { businessId, businessName, businessRole, industryId },
    } = this;

    if (!businessId) return <LoadingPageState />;

    const { businessNameError, industryError, businessRoleError } = this.state;

    return (
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
                errorMessage={businessNameError}
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
                errorMessage={industryError}
                items={industryItems}
                label="What industry is your business in?"
                metaData={industryData}
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
                errorMessage={businessRoleError}
                renderRadios={({ id, value, ...props }) => {
                  return BusinessRoles.map((businessType) => (
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
                            As a student or teacher using this trial you still
                            get access to all our features
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
          </Card>
          {this.alert && (
            <Alert type={this.alert.type}>{this.alert.message}</Alert>
          )}
          <div>
            <ButtonRow>
              <Button onClick={this.save}>Get down to business</Button>
            </ButtonRow>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  businessRole,
  industryId,
  proposedBusinessName,
}) => ({
  businessName: proposedBusinessName,
  businessRole: businessRole || '',
  industryId: industryId || '',
});

export { OnboardingView as View };
export default connect(mapStateToProps)(OnboardingView);
