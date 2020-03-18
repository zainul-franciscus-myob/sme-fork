import {
  Button,
  ButtonRow,
  Card,
  Combobox,
  Input,
  MYOBLogo,
  Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import classNames from 'classnames';

import BusinessRoles from '../fixtures/businessRoles';
import Industries from '../fixtures/Industries';
import customersImage from '../assets/customers.svg';
import handleComboboxChange from '../../components/handlers/handleComboboxChange';
import handleInputChange from '../../components/handlers/handleInputChange';
import handleSelectChange from '../../components/handlers/handleSelectChange';
import styles from './OnboardingView.module.css';

const industryData = [{ columnName: 'id', showData: true }];

class OnboardingView extends Component {
  constructor({ dispatcher, onSave }) {
    super();
    this.state = {
      businessNameError: '',
      industryError: '',
      hasRendered: false,
    };
    this.dispatcher = dispatcher;
    this.onSave = onSave;
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
  }

  industryItems = () => Industries.map(industry => ({ id: industry }));

  save = (event) => {
    event.preventDefault();
    const { props: { businessName, businessRole, industry } } = this;

    let businessNameError = null;
    let industryError = null;

    if (businessName === '') businessNameError = 'You need to enter a business name';
    if (industry === '') industryError = 'You need to select an industry';

    this.setState({ businessNameError, industryError });

    if (!businessNameError && !industryError) {
      this.onSave(event, { businessName, businessRole, industry });
    }
  };

  onChangeBusinessName = (businessName) => {
    this.dispatcher.setViewData({ proposedBusinessName: businessName.value });
  };

  onChangeIndustry = (industry) => {
    this.dispatcher.setViewData({ industry: industry.value });
  };

  onChangeBusinessRole = (businessRole) => {
    this.dispatcher.setViewData({ businessRole: businessRole.value });
  };

  render() {
    const {
      industryItems,
      onChangeBusinessName,
      onChangeBusinessRole,
      onChangeIndustry,
      props: {
        businessName,
        businessRole,
        industry,
      },
    } = this;

    const { businessNameError, industryError } = this.state;

    return (
      <div className={styles.fullScreen}>
        <div className={styles.logo}>
          <MYOBLogo />
        </div>

        <div className={classNames(styles.column, styles.img)}>
          <img src={customersImage} alt="placeholder" width="100%" height="auto" />
        </div>

        <div className={classNames(styles.column, styles.form)}>
          <h1>Welcome to MYOB!</h1>

          <Card classes={[styles.card]}>
            <p className={styles.intro}>
              Let&apos;s start with a few details that will help us personalise your experience.
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
                defaultItem={{ id: industry }}
                errorMessage={industryError}
                items={industryItems()}
                label="What industry is your business in?"
                metaData={industryData}
                name="industry"
                noMatchFoundMessage="No match found"
                onChange={handleComboboxChange('industry', onChangeIndustry)}
                requiredLabel="This is required"
              />
            </div>

            <div>
              <Select
                className={styles.select}
                defaultValue={businessRole}
                label="How would you best describe your role?"
                name="businessRole"
                onChange={handleSelectChange(onChangeBusinessRole)}
                requiredLabel="This is required"
              >
                {BusinessRoles.map(businessType => (
                  <Select.Option
                    key={businessType}
                    label={businessType}
                    value={businessType}
                  />
                ))}
              </Select>
            </div>
          </Card>

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

const mapStateToProps = ({ businessRole, industry, proposedBusinessName }) => ({
  businessName: proposedBusinessName,
  businessRole,
  industry,
});

export { OnboardingView as View };
export default connect(mapStateToProps)(OnboardingView);
