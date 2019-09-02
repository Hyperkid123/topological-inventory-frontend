import React from 'react';
import PropTypes from 'prop-types';
import { rawComponents } from '@data-driven-forms/pf4-component-mapper';
import { FilterIcon } from '@patternfly/react-icons';

const ValueContainer = ({ children }) => (
  <div className="filter-value-container" style={ { position: 'absolute' } }>
    <FilterIcon style={ { marginLeft: 6 } } fill="#393F44" />
    { children }
  </div>
);

ValueContainer.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]).isRequired
};

const FilterSelect = props => {
  if (!props.options || props.options.length === 0) {
    return (
      <div key="filter-select-placeholder" id="filter-select-placeholder" className="filter-select">
        <rawComponents.Select
          components={ { ValueContainer } }
          simpleValue={ false }
          options={ [] }
          isDisabled
        />
      </div>
    );

  }

  return (
    <div key="filter-select" id="filter-select" className="filter-select">
      <rawComponents.Select
        components={ { ValueContainer } }
        simpleValue={ false }
        { ...props }
      />
    </div>
  );
};

FilterSelect.propTypes = {
  options: PropTypes.array
};

export default FilterSelect;
