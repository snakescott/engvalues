import React, { Component } from 'react';
import uuid from 'uuid';

import ShufflingCardGrid from './components/ShufflingCardGrid';

const CARD_TEXTS = [
  'A place to call home',
  'Mosin Nagant',
  'Jigglypuff uses pound attack!',
  'When you play the game of thrones, you win or you die',
  'Keep a swear jar on your table top',
  'France is Bacon',
  'There better not be anything scary cryptic written here',
  'Pretty stationary though',
  'I fight for my friends',
  "Welcome to the jungle, we've got fun and games"
];

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
          cardWidth={cardWidth}
          cards={CARDS}
        />
      </div>
    );
  }
}

export default App;
