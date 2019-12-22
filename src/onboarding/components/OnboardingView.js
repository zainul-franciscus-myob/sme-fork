import {
  Button,
  ButtonRow,
  Combobox,
  Input,
  MYOBLogo,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import Industries from '../fixtures/Industries';
import businessRoles from '../fixtures/businessRoles';
import placeholder from '../assets/accountingyoga.svg';
import styles from './OnboardingView.module.css';

const industryData = [{ columnName: 'industry', showData: true }];
const businessRolesData = [{ columnName: 'businessRole', showData: true }];

class OnboardingView extends Component {
  constructor({
    dispatcher,
    onSave,
  }) {
    super();
    this.state = {
      businessNameError: '',
      industryError: '',
    };
    this.dispatcher = dispatcher;
    this.onSave = onSave;
  }

  businessRoleItems = () => businessRoles.map(businessRole => ({ businessRole }));

  industryItems = () => Industries.map(industry => ({ industry }));

  save = (event) => {
    event.preventDefault();
    const { props: { businessName, industry } } = this;

    let businessNameError = null;
    let industryError = null;

    if (businessName === '') businessNameError = 'You need to enter a business name';
    if (industry === '') industryError = 'You need to select an industry';

    this.setState({ businessNameError, industryError });
    if (!businessNameError && !industryError) this.onSave(event);
  };

  onChangeBusinessName = (event) => {
    const { value } = event.target;
    this.dispatcher.setViewData({ businessName: value });
  }

  onChangeBusinessRole = businessRole => this.dispatcher.setViewData(businessRole);

  onChangeIndustry = industry => this.dispatcher.setViewData(industry);

  render() {
    const {
      businessRoleItems,
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
        <StandardTemplate pageHead="">
          <div style={{ width: '100px', marginBottom: '20px' }}>
            <MYOBLogo />
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <img src={placeholder} alt="placeholder" width="440" height="auto" />
            </div>

            <div className={styles.column}>
              <h1>Welcome to MYOB!</h1>
              <p>
                Let&apos;s start with a few details that will help us personalise your experience.
              </p>

              <div>
                <Input
                  autoComplete="off"
                  autoFocus
                  errorMessage={businessNameError}
                  label="What's the name of your business?"
                  value={businessName}
                  onChange={onChangeBusinessName}
                  requiredLabel="You need to enter a business name"
                />
              </div>

              <div>
                <Combobox
                  defaultItem={{ industry }}
                  onChange={onChangeIndustry}
                  errorMessage={industryError}
                  items={industryItems()}
                  label="What industry is your business in?"
                  metaData={industryData}
                  name="industry"
                  requiredLabel="You need to select an industry"
                />
              </div>

              <div>
                <Combobox
                  defaultItem={{ businessRole }}
                  items={businessRoleItems()}
                  label="How would you best describe your role?"
                  metaData={businessRolesData}
                  name="businessRole"
                  onChange={onChangeBusinessRole}
                  requiredLabel="You need to select a role"
                />
              </div>

              <div>
                <ButtonRow>
                  <Button onClick={this.save}>Get down to business</Button>
                </ButtonRow>
              </div>
            </div>
          </div>
        </StandardTemplate>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  businessName: state.businessName,
  industry: state.industry,
  businessRole: state.businessRole,
});

export { OnboardingView as View };
export default connect(mapStateToProps)(OnboardingView);
