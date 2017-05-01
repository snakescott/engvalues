import React, { Component } from 'react';
import uuid from 'uuid';

import './store/reducers';
import CARD_TEXTS from './store/values.json';

import ShufflingCardGrid from './components/ShufflingCardGrid';

const CARDS = CARD_TEXTS.map(text => ({
  key: uuid.v4(),
  text,
  accepted: false,
  rejected: false
}));

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  render() {
    const totalWidth = Math.min(this.state.windowWidth, 900);
    const cardWidth = 160;
    return (
      <div className="App">
        <ShufflingCardGrid
          width={totalWidth}
          height={this.state.windowHeight}
          itemWidth={cardWidth}
          itemHeight={120}
          cards={CARDS}
        />
      </div>
    );
  }
}

export default App;
