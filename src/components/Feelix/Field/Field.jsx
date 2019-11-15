import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import InputLabel from '@myob/myob-widgets/lib/components/Input/InputLabel';
import InputError from '@myob/myob-widgets/lib/components/Input/InputError';
import Tooltip from '@myob/myob-widgets/lib/components/Tooltip/Tooltip';
import Icons from '@myob/myob-widgets/lib/components/Icons/index';

import styles from './Field.module.css';

/**
 * Field
 *
 * @visibleName
 */
class Field extends React.Component {
  static propTypes = {
    /**
     * Sets the id of the field element, the aria-describedby of the field and the for attribute on the label.
     * If no id is specified, a generated one is used.
     * These attributes associates the label and the error message to the field. Used for accessibility purposes.
     */
    id: PropTypes.string,
    /**
     * Sets the aria-describedby of the field. If no errorId is specified, a generated one is used.
     * This associates the error message to the field. Used for accessibility purposes.
     */
    errorId: PropTypes.string,
    /**
     * Creates a label to associate to the field
     */
    label: PropTypes.string.isRequired,
    /**
     * Determines whether to show or hide the label.
     */
    hideLabel: PropTypes.bool,
    /**
     * 	If this is not null or empty, it displays the string as an error message in the style dictated by Feelix.
     */
    errorMessage: PropTypes.string,
    /**
     * If there is an error message, and this is set to true, the error message will be displayed as a Tooltip in the field rather than below the field.
     */
    errorMessageInline: PropTypes.bool,
    /**
     * 	If this is not null or empty, it displays the string as an error message in the style dictated by Feelix.
     */
    warningNode: PropTypes.node,
    /**
     * If there is an error message, and this is set to true, the error message will be displayed as a Tooltip in the field rather than below the field.
     */
    warningNodeInline: PropTypes.bool,
    /**
     * If this is not null, it shows the specified node component next to the label.
     */
    labelAccessory: PropTypes.node,
    /**
     * If present will wrap the label in a ToolTip component and have the required label appear on hover.
     * Additionally will also add an asterix next to label.
     */
    requiredLabel: PropTypes.string,
    /**
     * Render props function called with a subset of props passed to the component with `id`, `errorId` and `aria-describedby` values.
     * These are used to connect element to the label and error messages.
     * It also passes any other unnamed props, which you can pass through.
     */
    renderField: PropTypes.func.isRequired,
    /**
     * Sets the aria-describedby of the field. If no requiredId is specified, a generated one is used.
     * This associates the required message to the field. Used for accessibility purposes.
     */
    requiredId: PropTypes.string,
  };

  static defaultProps = {
    id: undefined,
    errorId: undefined,
    requiredId: undefined,
    hideLabel: false,
    errorMessage: undefined,
    errorMessageInline: false,
    labelAccessory: undefined,
    requiredLabel: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: shortid.generate(),
    };
  }

  get inputId() {
    return this.props.id || `Input_${this.state.id}`;
  }

  get errorId() {
    return this.props.errorId || `${this.inputId}_error`;
  }

  get requiredId() {
    return this.props.requiredId || `${this.inputId}_required`;
  }

  renderLabel = () => {
    const { hideLabel, label, labelAccessory, requiredLabel } = this.props;
    const labelContent = requiredLabel ? (
      <Tooltip
        trigger={['click', 'hover']}
        triggerContent={
          <span>
            <InputLabel id={this.inputId} label={label} />
            <span className="form-group__required-icon" aria-hidden="true">
              *
            </span>
          </span>
        }
      >
        {requiredLabel}
      </Tooltip>
    ) : (
      <InputLabel id={this.inputId} label={label} />
    );
    return (
      <div
        className={classnames(
          { 'sr-only': hideLabel },
          'form-group__label-group'
        )}
      >
        {labelContent}
        {labelAccessory && (
          <span className="form-group__label-accessory">{labelAccessory}</span>
        )}
        {/* For Accessibility Purpose.
        When requiredLabel is set, tooltip is only appended to the DOM when we click on the label
        to let people using screen reader technology know the field is required */
          requiredLabel && (
            <span className="sr-only" id={this.requiredId}>
            {requiredLabel}
          </span>
          )}
      </div>
    );
  };

  render() {
    const {
      id,
      label,
      hideLabel,
      labelAccessory,
      errorMessage,
      errorMessageInline,
      warningMessage,
      warningMessageInline,
      renderField,
      errorId,
      requiredLabel,
      requiredId,
      ...otherProps
    } = this.props;
    return (
      <div
        className={classnames('form-group', {
          'has-error': errorMessage,
          'has-error--inline': errorMessage && errorMessageInline,
          [styles.warning]: warningMessage && !errorMessage,
          [styles.warningInline]: warningMessage && warningMessageInline && !errorMessage && !errorMessageInline,
        })}
      >
        {this.renderLabel()}
        <div className="form-group__input-group">
          {renderField({
            ...otherProps,
            errorId: this.errorId,
            id: this.inputId,
            requiredId: this.requiredId,
          })}
          {!!errorMessage && !errorMessageInline && (
            <InputError id={this.errorId} message={errorMessage} />
          )}
          {!!errorMessage && errorMessageInline && (
            <Tooltip id={this.errorId} triggerContent={<Icons.Error />}>
              {errorMessage}
            </Tooltip>
          )}
          {!!warningMessage && warningMessageInline && (
            <Tooltip id={this.errorId} triggerContent={<Icons.Warning />}>
              {warningMessage}
            </Tooltip>
          )}
        </div>
      </div>
    );
  }
}

export default Field;
