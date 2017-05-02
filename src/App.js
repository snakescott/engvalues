import React, { Component } from 'react';
import { connect } from 'react-redux';

import ShufflingCardGrid from './components/ShufflingCardGrid';

import './App.css';

const mapStateToProps = state => {
  return {
    stage: state.stage,
    cards: state.cards
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onCardMark: (key, mark) => {
      dispatch({
        type: 'TOGGLE_CARD',
        key,
        mark
      });
    },
    onAdvanceStage: (stage) => {
      dispatch({
        type: 'ADVANCE_STAGE',
        stage
      });
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
    const numSelected = this.props.cards.filter(c => c.mark === 'selected').length;
    const needed = Math.floor(this.props.cards.length / 2);
    return (
      <div className="App">
        <h1 className="instructions">
          Select the values you value
          the most: <span className="progress">
            <span className="number-selected" key={numSelected}>{ numSelected }</span> / { needed }
          </span>
        </h1>
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
