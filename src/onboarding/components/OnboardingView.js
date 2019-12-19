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
    this.dispatcher = dispatcher;
    this.onSave = onSave;
  }

  businessRoleItems = () => businessRoles.map(businessRole => ({ businessRole }));

  industryItems = () => Industries.map(industry => ({ industry }))

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
                  name="default"
                  label="What's the name of your business?"
                  value={businessName}
                  onChange={onChangeBusinessName}
                  requiredLabel="You need to enter a business name"
                  autoFocus
                />
              </div>

              <div>
                <Combobox
                  items={industryItems()}
                  metaData={industryData}
                  defaultItem={{ industry }}
                  onChange={onChangeIndustry}
                  name="industry"
                  label="What industry is your business in?"
                  requiredLabel="You need to select an industry"
                />
              </div>

              <div>
                <Combobox
                  items={businessRoleItems()}
                  metaData={businessRolesData}
                  defaultItem={{ businessRole }}
                  onChange={onChangeBusinessRole}
                  name="businessRole"
                  label="How would you best describe your role?"
                  requiredLabel="You need to select a role"
                />
              </div>

              <div>
                <ButtonRow>
                  <Button onClick={this.onSave}>Get down to business</Button>
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
