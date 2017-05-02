import React, { Component } from 'react';
import _ from 'lodash';

import Card from './Card';

import './ShufflingCardGrid.css';

/*
  Card objects should be:
  {
    key: UUID,
    text: string
    accepted: boolean
    rejected: boolean -- should have?
  }
*/

export default class ShufflingCardGrid extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      centered: false,
      cardIndex: _.fromPairs(
        this.props.cards.map((c, index) => [c.key, index])
      )
    };
    console.log(props);
  }

  shuffle = () => {
    let n = this.props.cards.length;
    let newCards = this.props.cards.slice();
    for (let idx of _.range(n)) {
      let swapIdx = _.random(idx, n - 1);
      let [a, b] = [newCards[idx], newCards[swapIdx]];
      newCards[idx] = b;
      newCards[swapIdx] = a;
    }
    this.setState({
      // centered: true,
      cardIndex: _.fromPairs(
        newCards.map((c, index) => [c.key, index])
      )
    });
    setTimeout(() => this.setState({ centered: false }), 400);
  }

  render() {
    const rowSize = Math.floor(this.props.width / this.props.itemWidth);

    const indexToXPos = index => {
      const col = index % rowSize;
      const padding = (col + 1) * this.props.padding;
      return (col * this.props.itemWidth) + padding;
    }
    const indexToYPos = index => {
      const row = Math.floor(index / rowSize);
      const padding = (row + 1) * this.props.padding;
      return (row * this.props.itemHeight) + padding;
    }
    const transitionTime = index => {
      return 400 + (index % 6 * 50);
    }

    const actualWidth = indexToXPos(rowSize - 1) + this.props.padding + this.props.itemWidth;

    const centeredX = (this.props.width - this.props.itemWidth) / 2;
    const centeredY = (this.props.height - this.props.itemHeight) / 2;

    return (
      <div
        style={{ width: actualWidth }}
        className="ShufflingCardGrid"
        onClick={this.shuffle}
        >
        {
          this.props.cards.map((_, index) => (
            <div
              className="Card fake"
              style={{
                top: indexToYPos(index),
                left: indexToXPos(index),
                width: this.props.itemWidth,
                height: this.props.itemHeight
              }}
            />
          ))
        }
        {
          this.props.cards.map((card, cardIndex) => {
            let index = this.state.cardIndex[card.key];
            return (
              <Card
                {...card}
                style={{
                  top: this.state.centered ? centeredY : indexToYPos(index),
                  left: this.state.centered ? centeredX : indexToXPos(index),
                  width: this.props.itemWidth,
                  height: this.props.itemHeight,
                  transition: `all ${transitionTime(cardIndex)}ms ease-in-out, box-shadow 80ms linear`
                }}
                onCardMark={this.props.onCardMark}
              />
            );
          })
        }
      </div>
    );
  }
}

ShufflingCardGrid.defaultProps = {
  cards: [],
  padding: 10,
  itemWidth: 200,
  itemHeight: 240
};
