import { Component } from 'react';
import * as React from 'react';

import './Card.css';

class Card extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {};
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

namespace Card {
  export const defaultProps = {}
}

export default Card;
