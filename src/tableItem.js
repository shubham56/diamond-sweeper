import React, { Component } from 'react';
import './tableItem.css';
// import $ from 'jquery';
export default class TableItem extends Component {
  state = {
    pressed: false,
    isDiamond: false
  };
  diamondPositions = this.props.diamondPositions.slice();
  diamondIndexInPosArray = this.diamondPositions.findIndex(
    d => d.r === this.props.row && d.c === this.props.col
  );
  componentDidMount() {
    if (
      this.props.diamondPositions.findIndex(
        pos => pos.r === this.props.row && pos.c === this.props.col
      ) !== -1
    ) {
      this.setState({ isDiamond: true });
    }
  }
  left = '>';
  right = '<';
  up = '^';
  down = 'v';
  render() {
    if (!this.state.pressed)
      return (
        <button
          className="button"
          id={'button'}
          onClick={() => {
            let isDiamond = false;
            let nearestNeighbour;
            if (
              this.props.diamondPositions.findIndex(
                pos => pos.r === this.props.row && pos.c === this.props.col
              ) !== -1
            ) {
              isDiamond = true;
            } else {
              let minR = 8;
              let minC = 8;
              this.props.diamondPositions.forEach(diamond => {
                if (
                  (Math.abs(diamond.r - this.props.row) +
                    Math.abs(diamond.c - this.props.col)) /
                    2 <
                  (minC + minR) / 2
                ) {
                  minR = Math.abs(diamond.r - this.props.row);
                  minC = Math.abs(diamond.c - this.props.col);
                  nearestNeighbour = diamond;
                }
              });
              if (
                Math.abs(nearestNeighbour.r - this.props.row) <
                  Math.abs(nearestNeighbour.c - this.props.col) ||
                nearestNeighbour.r === this.props.row
              ) {
                if (nearestNeighbour.c - this.props.col < 0)
                  this.setState({ nextDirection: this.right });
                else this.setState({ nextDirection: this.left });
              } else {
                if (nearestNeighbour.r - this.props.row > 0)
                  this.setState({ nextDirection: this.down });
                else this.setState({ nextDirection: this.up });
              }
            }
            if (isDiamond) {
              this.props.removeDiamondFromArray();
            }
            this.setState({ isDiamond }, () =>
              this.setState({ pressed: true })
            );
          }}
        />
      );
    if (this.state.isDiamond) return <div className="display-value">Y</div>;
    return <div className="display-value">{this.state.nextDirection}</div>;
  }
}
