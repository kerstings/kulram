import React, { Component } from 'react';
import Timer from "./Timer";
import './index.css';

class Abacus extends Component {   
  constructor(props) {
    super(props);
    this.state = {      
      beads: Array(25).fill().map(() => [
        { active: false },
        { active: false },
        { active: false },
        { active: false },
        { active: false }
      ]),      
      nr:0,
      correct:0, 
      seconds:0, 
      rods:props.initialRods,        
      maxtime: 120, 
      bw : 89.45/(Math.max(props.initialRods,5)),
      extra:props.initialRods*2,
      interactionsAllowed: true,      
      beadWidth : 89.45/(Math.max(props.initialRods,5)),
      rodWidth : 89.45/(Math.max(props.initialRods,5))/6,
      margin: props.initialRods+89.45/(Math.max(props.initialRods,5))*5/12,                       
    };    
  }
  
  setValues = (rods) => {          
    let bw = 89.45/rods;
    let oldbw = bw;
    if (rods < 5) {     
      bw = 89.45/5;
      this.setState({
        extra: (oldbw-bw)*rods/2,
      });
  
    } else {
      this.setState({
        extra: 0,        
      });
    }     
    const extra = 7.6/rods;
    this.setState({
      beadWidth : bw,
      rodWidth : bw/6,
      margin: this.state.extra/2+bw*5/12,
      rods: rods,                   
    });
    this.resetValue();
  }  

  resetValue = () => {
    this.setState(
      {
        beads: this.state.beads.map((rod) => rod.map((bead) => ({ active: false }))),
        nr: 0,
        interactionsAllowed:true,
      },
    );
    console.log("Rods=",this.state.rods);
    console.log(this.state.bw);    
  };

  updateTime = (milliSeconds) => {
    const sec = Math.floor(milliSeconds / 1000);
    this.setState({ seconds:sec });    
  };

  newValues = () => {    
    if (this.props.isAddition) {
      let randomVal1 = Math.floor(Math.random() * (Math.pow(10,this.state.rods)/2))+1;    
      let randomVal2 = Math.floor(Math.random() * (Math.pow(10,this.state.rods)/2)); 
      console.log("Randomnr1="+randomVal1+" " + Math.random());
      console.log("Randomnr2="+randomVal2 + " " + this.state.rods);       
      if (randomVal1+randomVal2 >= Math.pow(10,this.state.rods)) {
        randomVal1 = Math.pow(10,this.state.rods) - 1 - randomVal2;
      }
      this.setState({nr1 : randomVal1, nr2: randomVal2, total: randomVal1+randomVal2})
    } else if (this.props.isSubtraction) {
      let randomVal1 = Math.floor(Math.random() * (Math.pow(10,this.state.rods)-1))+2;    
      let randomVal2 = Math.floor(Math.random() * (randomVal1-1))+1;    
      this.setState({nr1 : randomVal1, nr2: randomVal2, total: randomVal1-randomVal2})      
    } else if (this.props.isMultiplication) {
      let randomVal1 = Math.floor(Math.random() * (Math.sqrt(Math.pow(10,this.state.rods)))); 
      if (randomVal1 === 0) {
        randomVal1 = 1;
      }   
      let randomVal2 = Math.floor(Math.random() * (Math.sqrt(Math.pow(10,this.state.rods)))); 
      if (randomVal2 === 0) {
        randomVal2 = 1;
      }
      this.setState({nr1 : randomVal1, nr2: randomVal2, total: randomVal1*randomVal2})   
    } else if (this.props.isDivision) {
      let randomVal1 = Math.floor(Math.random() * (Math.sqrt(Math.pow(10,this.state.rods)))); 
      if (randomVal1 === 0) {
        randomVal1 = 1;
      }   
      let randomVal2 = Math.floor(Math.random() * (Math.sqrt(Math.pow(10,this.state.rods)))); 
      if (randomVal2 === 0) {
        randomVal2 = 1;
      }
      this.setState({nr1 : randomVal1*randomVal2, nr2: randomVal1, total: randomVal2})   
    }
    console.log("this.state.nr1="+this.state.nr1);
    console.log("this.state.nr2="+this.state.nr2);
  }

  randomValue = () => {        
    this.setState({
      beads: this.state.beads.map((rod, rodIndex) => {
        const randomVal = Math.floor(Math.random() * 10);              
        return rod.map((bead, beadIndex) => ({              
          active:
          (beadIndex === 0 && randomVal / 5 >= 1) ||
          (beadIndex > 0 && randomVal % 5 >= beadIndex),         
        }));        
      }        
      ),
    });
  };

  checkValue = (rodIndex, beadIndex) => {
    const { beads } = this.state;
    let total = 0;
    let rodvalue = 0;
  
    for (let rod = 0; rod < this.state.rods; rod++) {
      for (let bead = 0; bead < 5; bead++) {
        if (beads[rod][bead].active) {
          total += beads[rod][bead].active
            ? (bead === 0 ? 5 : 1) * Math.pow(10, this.state.rods - rod - 1)
            : 0;
          if (rod === rodIndex) rodvalue += beads[rod][bead].active ? (bead === 0 ? 5 : 1) * Math.pow(10, this.state.rods - rod - 1) : 0;
        }
      }
    }
  
    if (!beads[rodIndex][beadIndex].active) {
      if (beadIndex === 0) {
        total += 5 * Math.pow(10, this.state.rods - rodIndex - 1);
      } else {
        total += beadIndex * Math.pow(10, this.state.rods - rodIndex - 1) - rodvalue;
        if (beads[rodIndex][0].active) {
          total += 5 * Math.pow(10, this.state.rods - rodIndex - 1);
        }
      }
    } else {
      if (beadIndex === 0) {
        total -= 5 * Math.pow(10, this.state.rods - rodIndex - 1);
      } else {
        total -= rodvalue - (beadIndex - 1) * Math.pow(10, this.state.rods - rodIndex - 1);
        if (beads[rodIndex][0].active) {
          total += 5 * Math.pow(10, this.state.rods - rodIndex - 1);
        }
      }
    }    
    if (this.state.seconds < this.state.maxtime && total === this.state.total && (this.props.isAddition || this.props.isSubtraction || this.props.isMultiplication || this.props.isDivision)) {
      this.setState({ interactionsAllowed: false });
       this.setState({correct:this.state.correct+1});       
       this.newValues();       
       setTimeout(() => {
        this.resetValue();
      }, 100);       
    } else if (total === this.state.nr + 1 && !(this.props.isAddition || this.props.isSubtraction || this.props.isMultiplication || this.props.isDivision)) {
      this.setState({ nr: this.state.nr + 1 });
    }
  };
  
  componentDidUpdate(prevProps) {         
    if (this.props.isTimer && this.state.seconds >= this.state.maxtime) {      
      this.props.onMaxTime();
    }
    if (this.props.isNewGame && !prevProps.isNewGame) {
      this.resetValue();
      this.newValues();
      this.setState({
        correct: 0,
        seconds: 0,
      });       
    }
    if (this.props.isReset && (!prevProps  || !prevProps.isReset)) {                        
      this.resetValue();                             
    } else if (this.props.isRandom && !prevProps.isRandom) {      
      this.randomValue();      
    } else if (!this.props.isShowingBead && prevProps.isShowingBead) {            
      this.randomValue();      
    } else if (this.props.isMoreRods && !prevProps.isMoreRods) {                     
      if (this.state.rods < 25) {
        this.setValues(this.state.rods + 1);   
        return;
      }
    } else if (this.props.isFewerRods && !prevProps.isFewerRods) {            
      if (this.state.rods > 1) {
        this.setValues(this.state.rods - 1);
        return;
      }        
    } 
    if (this.props.isAddition && !prevProps.isAddition) {
      this.resetValue();
      this.newValues();
      this.setState({
        correct:0,
      });      
    }
    if (this.props.isSubtraction && !prevProps.isSubtraction) {
      this.resetValue();
      this.newValues();
      this.setState({
        correct:0,
      });
      this.setState({seconds:0}); 
    }
    if (this.props.isMultiplication && !prevProps.isMultiplication) {
      this.resetValue();
      this.newValues();
      this.state.correct = 0;
      this.setState({seconds:0}); 
    }
    if (this.props.isDivision && !prevProps.isDivision) {
      this.resetValue();
      this.newValues();
      this.state.correct = 0;
      this.setState({seconds:0}); 
    }
    if (this.props.isCount && !prevProps.isCount) {
      this.resetValue();
      this.setState({seconds:0});       
    }
    if (!this.props.isCount && prevProps.isCount) {
      this.resetValue();      
      this.setState({seconds:0}); 
    }       
  }

  toggleBead = (rodIndex, beadIndex) => {         

    if (!this.state.interactionsAllowed || this.state.seconds >= this.state.maxtime) {      
      return;
    }
    
    this.setState((prevState) => {
        //const beads = JSON.parse(JSON.stringify(prevState.beads));
        //beads[rodIndex][beadIndex].active = !beads[rodIndex][beadIndex].active;      
    
        const beads = [...prevState.beads];  // Shallow copy the outer array
        beads[rodIndex] = [...prevState.beads[rodIndex]];  // Shallow copy the inner array
        beads[rodIndex][beadIndex] = { ...prevState.beads[rodIndex][beadIndex], 
        active: !prevState.beads[rodIndex][beadIndex].active };
      if (beadIndex === 0) {
        // Upper bead
      }
      else if ( beads[rodIndex][beadIndex].active === true)
        for (let i = 1; i < beadIndex; i++) {          
          beads[rodIndex][i].active = beads[rodIndex][beadIndex].active;          
        }
      else
        for (let i = beadIndex; i<=4; i++) {          
          beads[rodIndex][i].active = beads[rodIndex][beadIndex].active;          
        }
      return { beads };             
    });
  }
  
  calculateTotal = (rodIndex) => {
    const { beads } = this.state;
    let total = 0;  
    const rod = beads[rodIndex];
    rod.forEach((bead, beadIndex) => {     
      total += bead.active ? (beadIndex === 0 ? 5 : 1) : 0;
    });
    return total;
  };

  renderRod = (beads, rodIndex) => {    
    const beadStyle = {
      width: `${this.state.beadWidth}vw`,            
    };
    const rodStyle = {
      width: `${this.state.rodWidth}vw`,   
      marginLeft: `${this.state.margin+this.state.extra}vw`,    
      marginRight: `${this.state.margin-this.state.extra}vw`,    
      height:"81.3vh"            
    };
    return (            
      <div key={rodIndex} className="rod" style={rodStyle}>                       
        { this.props.isShowingBead && 
          <div           
            className={`${beads[0].active ? 'upper-bead-active' : 'upper-bead'}`}
            onClick={(event) => {
              event.preventDefault();
              this.checkValue(rodIndex, 0);    
              this.toggleBead(rodIndex, 0);                                      
            }}            
            onMouseDown={(event) => {
              event.preventDefault();                
              this.checkValue(rodIndex, 0);                       
              this.toggleBead(rodIndex, 0); 
            }}            
            onTouchStart={(event) => {                                           
              this.checkValue(rodIndex, 0);
              this.toggleBead(rodIndex, 0);                                     
            }}            
            style={beadStyle}>          
          </div> 
        }
        <div
            className={`bead-divider ${beads[0].active ? 'bead-divider-active' : ''}`}
            style = {beadStyle}>              
        </div>
        <div className={`bead-divider`}></div>        
        {this.props.isShowingBead && <div>
          {beads.slice(1).map((bead, beadIndex) => (
            <div
              key={beadIndex}            
              className={`bead ${bead.active ? 'active' : ''}`}
              onClick={(event) => {
                event.preventDefault();                
                this.checkValue(rodIndex, beadIndex+1);                
                this.toggleBead(rodIndex, beadIndex+1);                
              }}            
              onMouseDown={(event) => {
                event.preventDefault();                
                this.checkValue(rodIndex, beadIndex+1);                
                this.toggleBead(rodIndex, beadIndex+1);                
              }}
              
              onTouchStart={(event) => {                
                this.checkValue(rodIndex, beadIndex+1);                
                this.toggleBead(rodIndex, beadIndex+1);                
              }}
              style={beadStyle}>                                        
            </div>
          ))}
        </div>  
        }
      <div className="nr">{this.props.isShowingNr && this.props.isShowingBead && this.calculateTotal(rodIndex)}</div>        
      <div className="nr2">{this.props.isShowingNr && !this.props.isShowingBead && this.calculateTotal(rodIndex)}</div>                    
      </div>      
    );
  };

  render() {    
    return (            
      <div>      
      {this.props.isCount && <div className="countnr">{this.state.nr}&#x27A1;{this.state.nr+1}</div>}
      {this.state.seconds>=this.state.maxtime && this.props.isAddition && <div className="countnr-maxtime">{this.state.nr1}&nbsp;+&nbsp;{this.state.nr2}</div>}
      {this.state.seconds<this.state.maxtime && this.props.isAddition && <div className="countnr">{this.state.nr1}&nbsp;+&nbsp;{this.state.nr2}</div>}
      {this.props.isSubtraction && <div className="countnr">{this.state.nr1}&nbsp;-&nbsp;{this.state.nr2}</div>}
      {this.props.isMultiplication && <div className="countnr">{this.state.nr1}&nbsp;x&nbsp;{this.state.nr2}</div>}
      {this.props.isDivision && <div className="countnr">{this.state.nr1}&nbsp;/&nbsp;{this.state.nr2}</div>}      
      {(this.props.isTimer && this.state.seconds <this.state.maxtime) && (this.props.isCount || this.props.isAddition || this.props.isSubtraction || this.props.isMultiplication || this.props.isDivision) &&  <div className="timer"><Timer maxtime={this.state.maxtime} onTimeUpdate={this.updateTime}/></div>}     
      {(!this.props.isTimer || this.state.seconds<this.state.maxtime) && (this.props.isAddition || this.props.isSubtraction || this.props.isMultiplication || this.props.isDivision) &&  <div className="answers">{this.state.correct}</div>}
      {(!this.props.isTimer || this.state.seconds>=this.state.maxtime) && (this.props.isAddition || this.props.isSubtraction || this.props.isMultiplication || this.props.isDivision) &&  <div className="answers-maxtime">{this.state.correct}</div>}                       
      <div className="abacus">        
        {Array(this.state.rods)
          .fill()
          .map((_, index) => this.renderRod(this.state.beads[index], index))}
      </div>     
      </div>             
    );
  }
}

export default Abacus;
