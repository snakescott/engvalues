import { Component } from 'react';
import * as React from 'react';
// require avoids TS "Could not find a declaration file" errors.
// Update once DefinitelyTyped includes react-redux 5.0.4
const reactRedux = require('react-redux');
import ShufflingCardGrid from './components/ShufflingCardGrid';

import './App.css';

const mapStateToProps = (state: any) : any => {
  return {
    stage: state.stage,
    cards: state.cards
  };
};

const mapDispatchToProps = (dispatch: any) : any => {
  return {
    onCardMark: (key: any, mark: any) : any => {
      dispatch({
        type: 'TOGGLE_CARD',
        key,
        mark
      });
    },
    onAdvanceStage: (stage: any) : any => {
      dispatch({
        type: 'ADVANCE_STAGE',
        stage
      });
    }
  };
};

class App extends Component<any, any> {

  constructor(props: any, context: any) {
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
    const numSelected = this.props.cards.filter( (c: any) => c.mark === 'selected').length;
    const needed = Math.floor(this.props.cards.length / 2);
    return (
      <div className="App">
        <h1 className="instructions">
          Select the things you value
          the most: <span className="progress">
            <span className="number-selected" key={numSelected}>{numSelected}</span> / {needed}
          </span>
        </h1>
        <ShufflingCardGrid
          width={totalWidth}
          height={this.state.windowHeight}
          itemWidth={cardWidth}
          itemHeight={120}
          {...this.props}
        />
      </div>
    );
  }
}

export default reactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
