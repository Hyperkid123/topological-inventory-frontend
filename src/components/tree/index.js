import React from 'react';
import PropTypes from 'prop-types';
import Node from './node';

const Tree = ({ data, render }) => {
  return (
    <div>
      <h1>Sources</h1>
      {data.map((node) => (
        <Node key={node.id} {...node} render={render} />
      ))}
    </div>
  );
};

const nodeShape = {
  title: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

nodeShape.children = PropTypes.arrayOf(PropTypes.shape(nodeShape));

Tree.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(nodeShape)),
  render: PropTypes.func,
};

Tree.defaultProps = {
  data: [],
};

export default Tree;
