import PropTypes from 'prop-types';
import React from 'react';

import manageCollapsibles from './AccordionCollapsibleManager';

const Accordion = (props) => {
  const { children, addAccordionPropsToCollapsibles } = props;

  const childrenWithAccordionProps = addAccordionPropsToCollapsibles(children);

  return <div className="accordion">{childrenWithAccordionProps}</div>;
};

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  addAccordionPropsToCollapsibles: PropTypes.func.isRequired,
};

export default manageCollapsibles(Accordion);
