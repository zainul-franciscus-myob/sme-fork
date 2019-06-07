/*
 * https://github.com/nosir/cleave.js
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Modifications copyright (C) 2019 MYOB
 */

import React from 'react';

import NumeralFormatter from './Utils/NumeralFormatter';
import Util from './Utils/Util';
import defaultProperties from './Utils/defaultProperties';

class CleaveWrapper extends React.Component {
  constructor(props) {
    super(props);

    const owner = this;

    const {
      value, onKeyDown, onChange, onFocus, onBlur, onInit,
    } = owner.props;

    let { options } = owner.props;

    owner.registeredEvents = {
      onInit: onInit || Util.noop,
      onChange: onChange || Util.noop,
      onFocus: onFocus || Util.noop,
      onBlur: onBlur || Util.noop,
      onKeyDown: onKeyDown || Util.noop,
    };

    if (!options) {
      options = {};
    }

    options.initValue = value;

    owner.properties = defaultProperties.assign({}, options);

    owner.state = {
      value: owner.properties.result,
      cursorPosition: 0,
    };
  }

  componentDidMount = () => {
    this.init();
  }

  componentDidUpdate = () => {
    const owner = this;

    const pps = owner.properties;

    Util.setSelection(owner.element, owner.state.cursorPosition, pps.document);
  }

  updateRegisteredEvents = (props) => {
    const owner = this;
    const {
      onKeyDown, onChange, onFocus, onBlur, onInit,
    } = owner.registeredEvents;

    owner.registeredEvents = {
      onInit: props.onInit === onInit ? onInit : (props.onInit || Util.noop),
      onChange: props.onChange === onChange ? onChange : (props.onChange || Util.noop),
      onFocus: props.onFocus === onFocus ? onFocus : (props.onFocus || Util.noop),
      onBlur: props.onBlur === onBlur ? onBlur : (props.onBlur || Util.noop),
      onKeyDown: props.onKeyDown === onKeyDown ? onKeyDown : (props.onKeyDown || Util.noop),
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const owner = this;

    let newValue = nextProps.value;

    this.updateRegisteredEvents(nextProps);

    if (newValue !== undefined) {
      newValue = newValue.toString();

      if (newValue !== owner.properties.initValue && newValue !== owner.properties.result) {
        owner.properties.initValue = newValue;
        owner.onInput(newValue, true);
      } else if (newValue === owner.properties.result) {
        owner.properties.initValue = newValue;
      }
    }
  }

  getInitialState = () => {
    const owner = this;

    const {
      value, onKeyDown, onChange, onFocus, onBlur, onInit,
    } = owner.props;

    let { options } = owner.props;

    owner.registeredEvents = {
      onInit: onInit || Util.noop,
      onChange: onChange || Util.noop,
      onFocus: onFocus || Util.noop,
      onBlur: onBlur || Util.noop,
      onKeyDown: onKeyDown || Util.noop,
    };

    if (!options) {
      options = {};
    }

    options.initValue = value;

    owner.properties = defaultProperties.assign({}, options);

    return {
      value: owner.properties.result,
      cursorPosition: 0,
    };
  }

  init = () => {
    const owner = this;


    const pps = owner.properties;

    // so no need for this lib at all
    if (
      !pps.numeral
      && !pps.phone
      && !pps.creditCard
      && !pps.time
      && !pps.date
      && (pps.blocksLength === 0 && !pps.prefix)
    ) {
      owner.onInput(pps.initValue);
      owner.registeredEvents.onInit(owner);

      return;
    }

    pps.maxLength = Util.getMaxLength(pps.blocks);

    owner.isAndroid = Util.isAndroid();

    owner.initNumeralFormatter();

    // avoid touch input field if value is null
    // otherwise Firefox will add red box-shadow for <input required />
    if (pps.initValue || (pps.prefix && !pps.noImmediatePrefix)) {
      owner.onInput(pps.initValue);
    }

    owner.registeredEvents.onInit(owner);
  }

  initNumeralFormatter = () => {
    const owner = this;


    const pps = owner.properties;

    if (!pps.numeral) {
      return;
    }

    pps.numeralFormatter = new NumeralFormatter(
      pps.numeralDecimalMark,
      pps.numeralIntegerScale,
      pps.numeralDecimalScale,
      pps.numeralThousandsGroupStyle,
      pps.numeralPositiveOnly,
      pps.stripLeadingZeroes,
      pps.delimiter,
    );
  }

  setRawValue = (value) => {
    let val = value;
    const owner = this;


    const pps = owner.properties;

    val = val !== undefined && val !== null ? val.toString() : '';

    if (pps.numeral) {
      val = val.replace('.', pps.numeralDecimalMark);
    }

    pps.postDelimiterBackspace = false;

    owner.onChange({
      target: { val },
      // Methods to better resemble a SyntheticEvent
      stopPropagation: Util.noop,
      preventDefault: Util.noop,
      persist: Util.noop,
    });
  }

  getRawValue = () => {
    const owner = this; const pps = owner.properties;


    let rawValue = pps.result;

    if (pps.rawValueTrimPrefix) {
      rawValue = Util.getPrefixStrippedValue(
        rawValue, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters,
      );
    }

    if (pps.numeral) {
      rawValue = pps.numeralFormatter ? pps.numeralFormatter.getRawValue(rawValue) : '';
    } else {
      rawValue = Util.stripDelimiters(rawValue, pps.delimiter, pps.delimiters);
    }

    return rawValue;
  }

  getISOFormatDate = () => {
    const owner = this;


    const pps = owner.properties;

    return pps.date ? pps.dateFormatter.getISOFormatDate() : '';
  }

  getISOFormatTime = () => {
    const owner = this;


    const pps = owner.properties;

    return pps.time ? pps.timeFormatter.getISOFormatTime() : '';
  }

  onInit = owner => owner

  onKeyDown = (event) => {
    const owner = this;


    const pps = owner.properties;


    let charCode = event.which || event.keyCode;

    // if we got any charCode === 8, this means, that this device correctly
    // sends backspace keys in event, so we do not need to apply any hacks
    owner.hasBackspaceSupport = owner.hasBackspaceSupport || charCode === 8;
    if (!owner.hasBackspaceSupport
      && Util.isAndroidBackspaceKeydown(owner.lastInputValue, pps.result)
    ) {
      charCode = 8;
    }

    // hit backspace when last character is delimiter
    const postDelimiter = Util.getPostDelimiter(pps.result, pps.delimiter, pps.delimiters);
    if (charCode === 8 && postDelimiter) {
      pps.postDelimiterBackspace = postDelimiter;
    } else {
      pps.postDelimiterBackspace = false;
    }

    owner.registeredEvents.onKeyDown(event);
  }

  onFocus = (e) => {
    const owner = this; const
      pps = owner.properties;

    e.target.rawValue = owner.getRawValue();
    e.target.value = pps.result;

    owner.registeredEvents.onFocus(e);

    Util.fixPrefixCursor(owner.element, pps.prefix, pps.delimiter, pps.delimiters);
  }

  onBlur = (e) => {
    const owner = this; const
      pps = owner.properties;

    e.target.rawValue = owner.getRawValue();
    e.target.value = pps.result;

    owner.registeredEvents.onBlur(e);
  }


  onChange = (e) => {
    const owner = this; const
      pps = owner.properties;

    owner.onInput(e.target.value);

    e.target.rawValue = owner.getRawValue();
    e.target.value = pps.result;

    owner.registeredEvents.onChange(e);
  }

  onInput = (value, fromProps) => {
    let val = value;
    const owner = this; const
      pps = owner.properties;

    // case 1: delete one more character "4"
    // 1234*| -> hit backspace -> 123|
    // case 2: last character is not delimiter which is:
    // 12|34* -> hit backspace -> 1|34*
    const postDelimiterAfter = Util.getPostDelimiter(val, pps.delimiter, pps.delimiters);
    if (!fromProps && !pps.numeral && pps.postDelimiterBackspace && !postDelimiterAfter) {
      val = Util.headStr(val, val.length - pps.postDelimiterBackspace.length);
    }

    // phone formatter
    if (pps.phone) {
      if (pps.prefix && (!pps.noImmediatePrefix || val.length)) {
        pps.result = pps.prefix + pps.phoneFormatter.format(val).slice(pps.prefix.length);
      } else {
        pps.result = pps.phoneFormatter.format(val);
      }
      owner.updateValueState();

      return;
    }

    // numeral formatter
    if (pps.numeral) {
      if (pps.prefix && (!pps.noImmediatePrefix || val.length)) {
        pps.result = pps.prefix + pps.numeralFormatter.format(val);
      } else {
        pps.result = pps.numeralFormatter.format(val);
      }
      owner.updateValueState();

      return;
    }

    // date
    if (pps.date) {
      val = pps.dateFormatter.getValidatedDate(val);
    }

    // time
    if (pps.time) {
      val = pps.timeFormatter.getValidatedTime(val);
    }

    // strip delimiters
    val = Util.stripDelimiters(val, pps.delimiter, pps.delimiters);

    // strip prefix
    val = Util.getPrefixStrippedValue(
      val, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters,
    );

    // strip non-numeric characters
    val = pps.numericOnly ? Util.strip(val, /[^\d]/g) : val;

    // convert case
    val = pps.uppercase ? val.toUpperCase() : val;
    val = pps.lowercase ? val.toLowerCase() : val;

    // prefix
    if (pps.prefix && (!pps.noImmediatePrefix || val.length)) {
      val = pps.prefix + val;

      // no blocks specified, no need to do formatting
      if (pps.blocksLength === 0) {
        pps.result = val;
        owner.updateValueState();

        return;
      }
    }

    // update credit card props
    if (pps.creditCard) {
      owner.updateCreditCardPropsByValue(val);
    }

    // strip over length characters
    val = pps.maxLength > 0 ? Util.headStr(val, pps.maxLength) : val;

    // apply blocks
    pps.result = Util.getFormattedValue(
      val,
      pps.blocks, pps.blocksLength,
      pps.delimiter, pps.delimiters, pps.delimiterLazyShow,
    );

    owner.updateValueState();
  }

  updateValueState = () => {
    const owner = this;


    const pps = owner.properties;

    if (!owner.element) {
      owner.setState({ value: pps.result });
    }

    let endPos = owner.element.selectionEnd;
    const oldValue = owner.element.value;
    const newValue = pps.result;

    owner.lastInputValue = newValue;

    endPos = Util.getNextCursorPosition(endPos, oldValue, newValue, pps.delimiter, pps.delimiters);

    if (owner.isAndroid) {
      window.setTimeout(() => {
        owner.setState({ value: newValue, cursorPosition: endPos });
      }, 1);

      return;
    }

    owner.setState({ value: newValue, cursorPosition: endPos });
  }

  render = () => {
    const owner = this;
    // eslint-disable-next-line
    var { value, options, onKeyDown, onFocus, onBlur, onChange, onInit, htmlRef, ...propsToTransfer } = owner.props;

    return (
      <input
        type="text"
        ref={(...args) => {
          const [ref] = args;
          owner.element = ref;

          if (!htmlRef) {
            return;
          }

          htmlRef.apply(this, args);
        }}
        value={owner.state.value}
        onKeyDown={owner.onKeyDown}
        onChange={owner.onChange}
        onFocus={owner.onFocus}
        onBlur={owner.onBlur}
        {...propsToTransfer}
      />
    );
  }
}

export default CleaveWrapper;
