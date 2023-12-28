import React, { Component } from 'react';
import './index.css';

class Kulram extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      beads: Array(10).fill().map(() =>
        Array(10).fill().map(() => ({ active: false }))
      ),
    };    
  }

  calculateTotal = (rowIndex) => {        
    const { beads } = this.state;    
    let total = 0;  
    for (let i = 0;i<10;i++)      
         if (beads[i][rowIndex].active)
            total += 1;        
    return total;
  };

  resetValue = () => {
    this.setState({
      beads: this.state.beads.map(rod => rod.map(bead => ({ active: false })))
    });
  };

  randomValue = () => {
    const { beads } = this.state;
    for (let i = 0; i < 10; i++) {
      const randomVal = Math.floor(Math.random() * 10);
      for (let j = 0; j < 10; j++) {
        beads[j][i].active = j >= randomVal;
      }
    }
    this.setState({ beads });
  };


  componentDidUpdate(prevProps) {           
    if (this.props.isReset && !prevProps.isReset) {      
      this.resetValue();      
    } else if (this.props.isRandom && !prevProps.isRandom) {      
      this.randomValue();      
    }             
  }

  toggleBead = (rowIndex, beadIndex) => {
    this.setState((prevState) => {
      const beads = [...prevState.beads];
      beads[rowIndex][beadIndex].active = !beads[rowIndex][beadIndex].active;  
      if (beads[rowIndex][beadIndex].active) {
        for (let i = rowIndex; i <= 9; i++) {
          beads[i][beadIndex].active = true;
        }
      } else {
        for (let i = 0; i <= rowIndex; i++) {
          beads[i][beadIndex].active = false;
        }
      }      
      return { beads };
    });
  };
  
  
  renderBead = (bead, rowIndex, beadIndex) => {
    return (
      <div
        className={`bead-kulram ${bead.active ? 'bead-kulram-active' : 'bead-kulram'}`}        
        onClick={(event) => {
          event.preventDefault();
          this.toggleBead(rowIndex, beadIndex);
        }}
        onMouseDown={(event) => {
          event.preventDefault();
          this.toggleBead(rowIndex, beadIndex);
        }}
        onTouchStart={(event) => {
          event.preventDefault();
          this.toggleBead(rowIndex, beadIndex);
        }}>           
      </div>      
    );
  };

  renderRow = (row, rowIndex) => {
    const topPosition = `${15+rowIndex * 8}vh`; 
    return (      
      <div >
        {row.map((bead, beadIndex) => this.renderBead(bead, rowIndex, beadIndex))}        
        {this.calculateTotal(rowIndex) < 10 && <div className="nr-kulram" style={{ top: topPosition, left: '30.5vw' }}>{this.props.isShowingNr  && this.calculateTotal(rowIndex)}</div> }
        {this.calculateTotal(rowIndex) === 10 && <div className="nr-kulram" style={{ top: topPosition, left: '29.6vw' }}>{this.props.isShowingNr  && this.calculateTotal(rowIndex)}</div> }
      </div>
    );
  };

  render() {
    return (
      <div className="kulram">
        {this.state.beads.map((row, rowIndex) => this.renderRow(row, rowIndex))}
      </div>
    );
  }
}

export default Kulram;
