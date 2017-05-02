import React, { Component } from 'react';
import { connect } from 'react-redux';

import ShufflingCardGrid from './components/ShufflingCardGrid';


const mapStateToProps = state => {
  return {
    stage: state.stage,
    cards: state.cards
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onCardMark: (mark) => {
      dispatch({
        type: 'MARK_CARD',
        mark
      })
    },
    onAdvanceStage: (stage) => {
      dispatch({
        type: 'ADVANCE_STAGE',
        stage
      })
    }
  }
}

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
          { ...this.props }
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
