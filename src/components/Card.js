import React, { Component } from 'react';
import _ from 'lodash';

import './Card.css';

export default class Card extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }

  render() {
    return (
      <div
        className={'Card ' + (this.props.mark || '')}
        style={this.props.style}
        onClick={this.props.onClick}
        >
        { this.props.text }
      </div>
    );
  }
}

Card.defaultProps = {

};
