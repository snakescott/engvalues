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
      windowWidth: window.innerWidth
    };
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  render() {
    const totalWidth = Math.min(this.state.windowWidth, 900);
    const cardWidth = 200;
    return (
      <div className="App">
        <ShufflingCardGrid
          width={totalWidth}
          itemWidth={cardWidth}
          itemHeight={160}
          cards={CARDS}
        />
      </div>
    );
  }
}

export default App;
