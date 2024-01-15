import React, { Component } from 'react';
import Timer from "./Timer";
import './index.css';

class Suanpan extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      beads: Array(19).fill().map(() => [
        { active: false },
        { active: false },
        { active: false },
        { active: false },
        { active: false },
        { active: false },
        { active: false }
      ]),
      nr:0,
      correct:0, 
      milliseconds:0,         
      rods:props.initialRods,        
      maxtime: 120000,
      interactionsAllowed: true,  
      bw : 89.45/(Math.max(props.initialRods,5)),
      extra:props.initialRods*2,        
      beadWidth : 89.45/(Math.max(props.initialRods,5)),
      rodWidth : 89.45/(Math.max(props.initialRods,5))/6,
      margin: props.initialRods+89.45/(Math.max(props.initialRods,5))*5/9,   
    };    
    this.setValues(props.initialRods);
  }

  updateTime = (milliSeconds) => {
    this.setState({ milliseconds:milliSeconds });    
  };

  setValues = (rods) => {
    let bw = 89.45/rods;
    let oldbw = bw;
    if (rods < 5) {     
      bw = 89.45/5;
      this.setState({
        extra : (oldbw-bw)*rods/2,
      });      
    } else {
      this.setState({
        extra:0,
      });      
    }     
    const extra = 7.6/rods;
    this.setState({
      beadWidth:bw,
      rodWidth:bw/6,
      margin:extra/2+bw*5/12,
      rods:rods,
    });    
    this.resetValue();     
  }  
  
  resetValue = () => {    
    this.setState({            
      beads: this.state.beads.map(rod => rod.map(bead => ({ active: false }))),
      nr:0,
      interactionsAllowed:true,
    });    
  };
  
  newValues = () => {
    if (this.props.isNumber) {      
      let randomVal = Math.floor(Math.random() * (Math.pow(10,this.state.rods)/2))+1;          
      this.setState({nr1 : randomVal, total: randomVal})            
    }
    else if (this.props.isAddition) {
      let randomVal1 = Math.floor(Math.random() * (Math.pow(10,this.state.rods)/2))+1;    
      let randomVal2 = Math.floor(Math.random() * (Math.pow(10,this.state.rods)/2));        
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
  }

  randomValue = () => {
    this.setState({
      beads: this.state.beads.map((rod, rodIndex) => {
        const randomVal = Math.floor(Math.random() * 10);        
        return rod.map((bead, beadIndex) => {
          return {
            active:
              (beadIndex === 1 && randomVal / 5 >= 1) ||
              (beadIndex > 1 && randomVal % 5 >= (beadIndex-1)),
          };
        });
      }),
    });
  };
  
  checkValue = (rodIndex,beadIndex) => {    
    const { beads } = this.state;
    let total = 0;  
    let rodvalue = 0;
    if (beadIndex === 0)
            return;          
    for (let rod=0; rod<this.state.rods;rod++){
      for (let bead = 0; bead<7;bead++) {      
        if (beads[rod][bead].active)  {            
          if (bead === 1) {                   
              total +=  5 * Math.pow(10, this.state.rods - rod - 1);      
          } else {
            total +=  Math.pow(10, this.state.rods - rod - 1);      
          }
          if (rod === rodIndex)
             rodvalue += beads[rod][bead].active ? ((bead === 0 || bead === 1) ? 5 : 1) * Math.pow(10, this.state.rods - rod - 1) : 0;      
        }
      }
    }       
    if (!beads[rodIndex][beadIndex].active){               
        if (beadIndex === 1){              
           total += 5*Math.pow(10, this.state.rods - rodIndex - 1)           
        }
        else if (beadIndex>1) {          
           total += (beadIndex-1) * Math.pow(10, this.state.rods - rodIndex - 1) -rodvalue ;           
           if (beads[rodIndex][0].active || beads[rodIndex][1].active) {            
              total += 5* Math.pow(10, this.state.rods - rodIndex - 1);               
            }            
        }
    }
    else {            
      if (beadIndex === 1){           
        total -= 5*Math.pow(10, this.state.rods - rodIndex - 1)                    
      }
      else  if (beadIndex>1){                
         total -= rodvalue - (beadIndex-2) * Math.pow(10, this.state.rods - rodIndex - 1); 
         if (beads[rodIndex][0].active || beads[rodIndex][1].active) {          
             total += 5* Math.pow(10, this.state.rods - rodIndex - 1);              
         } 
      }            
    }       
    if (this.state.milliseconds < this.state.maxtime && total===this.state.total && (this.props.isNumber || this.props.isAddition || this.props.isSubtraction || this.props.isMultiplication || this.props.isDivision)) {                           
      this.setState({ interactionsAllowed: false });
      this.setState({correct:this.state.correct+1});       
      this.newValues();       
      setTimeout(() => {
         this.resetValue();
      }, 200);        
    }
    else if (total === this.state.nr+1 && !(this.props.isNumber || this.props.isAddition || this.props.isSubtraction || this.props.isMultiplication || this.props.isDivision)) {             
        this.setState({ nr: this.state.nr + 1 });                
      }
  }

  componentDidUpdate(prevProps) {           
    if (this.props.isTimer && this.state.milliseconds >= this.state.maxtime) {      
      this.props.onMaxTime();
    }
    if (this.props.isNewGame && !prevProps.isNewGame) {
      this.resetValue();
      this.newValues();
      this.setState({correct:0});
      this.setState({milliseconds:0});             
    }
    if (this.props.isReset && (!prevProps  || !prevProps.isReset)) {                        
      this.resetValue();                             
    } else if (this.props.isRandom && !prevProps.isRandom) {            
      this.randomValue();      
    } else if (!this.props.isShowingBead && prevProps.isShowingBead) {            
//this.randomValue();      
    } else if (this.props.isMoreRods && !prevProps.isMoreRods) {                     
      if (this.state.rods < 15) {
        this.setValues(this.state.rods + 1);   
        return;
      }
    } else if (this.props.isFewerRods && !prevProps.isFewerRods) {            
      if (this.state.rods > 1) {
        this.setValues(this.state.rods - 1);
        return;
      }        
    } 
    if (this.props.isNumber && !prevProps.isNumber) {      
      this.resetValue();
      this.newValues();
      this.setState({
        correct:0,
      });      
    }
    if (this.props.isAddition && !prevProps.isAddition) {
      this.resetValue();
      this.newValues();
      this.setState({correct:0});
    }
    if (this.props.isSubtraction && !prevProps.isSubtraction) {
      this.resetValue();
      this.newValues();
      this.setState({
        correct:0,
      });      
      this.setState({milliseconds:0}); 
    }
    if (this.props.isMultiplication && !prevProps.isMultiplication) {
      this.resetValue();
      this.newValues();
      this.setState({
        correct:0,
      });
      this.setState({milliseconds:0}); 
    }
    if (this.props.isDivision && !prevProps.isDivision) {
      this.resetValue();
      this.newValues();
      this.setState({
        correct:0,
      });
      this.setState({milliseconds:0}); 
    }
    if (this.props.isCount && !prevProps.isCount) {
      this.resetValue();
      this.setState({milliseconds:0});       
    }
    if (!this.props.isCount && prevProps.isCount) {
      this.resetValue();      
      this.setState({milliseconds:0}); 
    }    
  }

  toggleBead = (rodIndex, beadIndex) => {
    if (!this.state.interactionsAllowed || this.state.milliseconds >= this.state.maxtime) {      
      return;
    }
    this.setState((prevState) => {     
      const beads = [...prevState.beads];  
      beads[rodIndex] = [...prevState.beads[rodIndex]];  
      beads[rodIndex][beadIndex] = { ...prevState.beads[rodIndex][beadIndex], 
      active: !prevState.beads[rodIndex][beadIndex].active };
      if (beadIndex === 0) {        
        if (beads[rodIndex][beadIndex].active) 
          beads[rodIndex][1].active = true;        
      }
      else if (beadIndex === 1) {        
        if (!beads[rodIndex][beadIndex].active) 
          beads[rodIndex][0].active = false;         
      }
      else if (beads[rodIndex][beadIndex].active === true){        
        for (let i = 2; i < beadIndex; i++) {          
          beads[rodIndex][i].active = beads[rodIndex][beadIndex].active;          
        }
      }
      else {        
        for (let i = beadIndex; i<=6; i++) {          
          beads[rodIndex][i].active = beads[rodIndex][beadIndex].active;          
        }
      }
      return { beads };
    });   
  };

  calculateTotal = (rodIndex) => {
    const { beads } = this.state;
    let total = 0;  
    const rod = beads[rodIndex];
    rod.forEach((bead, beadIndex) => {
      total += bead.active ? ((beadIndex === 0 || beadIndex === 1)? 5 : 1) : 0;
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
      height:"82vh"      
    };
    return (            
      <div key={rodIndex} className="rod" style={rodStyle}>                       
        { this.props.isShowingBead && 
          <div           
            className={`upper-bead upper-bead-suanpan ${beads[0].active ? 'upper-bead-suanpan-active' : 'upper-bead-suanpan'}`}
            onClick={() => this.toggleBead(rodIndex, 0)}
            onMouseDown={(event) => {
              event.preventDefault();
              this.toggleBead(rodIndex, 0);
              this.checkValue(rodIndex, 0);
            }}
            onTouchStart={(event) => {                           
              this.toggleBead(rodIndex, 0);
              this.checkValue(rodIndex, 0);
            }}           
            style={beadStyle}>          
          </div> 
        }
        { this.props.isShowingBead && 
          <div           
            className={`upper-bead upper-bead-suanpan ${beads[1].active ? 'upper-bead-suanpan-active' : ''}`}
            onClick={() => this.toggleBead(rodIndex, 1)}
            onMouseDown={(event) => {
              this.toggleBead(rodIndex, 1);
              this.checkValue(rodIndex, 1);
            }}
            onTouchStart={(event) => {              
              this.toggleBead(rodIndex, 1);
              this.checkValue(rodIndex, 1);
            }}
            style={beadStyle}>          
          </div> 
        }
        <div>
        {this.props.isShowingBead && <div>          
          {beads.slice(2).map((bead, beadIndex) => (            
            <div
              key={beadIndex}
              className={`lower-bead-suanpan bead ${bead.active ? 'lower-bead-suanpan-active' : 'lower-bead-suanpan'}`}
              onClick={() => {
                this.toggleBead(rodIndex, beadIndex+2);
                this.checkValue(rodIndex, beadIndex+2);
              }}
              onMouseDown={(event) => {
                this.toggleBead(rodIndex, beadIndex+2);
                this.checkValue(rodIndex, beadIndex+2);
              }}
              onTouchStart={(event) => {                                           
                this.toggleBead(rodIndex, beadIndex+2);
                this.checkValue(rodIndex, beadIndex+2);
              }}
              style={beadStyle}>                        
            </div>            
          ))}
          </div>        
        }
        </div>  
        <div className="nr">{this.props.isShowingNr && this.calculateTotal(rodIndex)}</div>                
      </div>
    );
  };

  render() {    
    return (            
      <div>
{this.props.isNumber && (
        <div className={this.props.isFullScreen ? "countnr-fullscreen" : "countnr"}>
        {this.state.nr1}
        </div>
      )}

    {this.props.isCount && (
      <div className={this.props.isFullScreen ? "countnr-fullscreen" : "countnr"}>
      {this.state.nr}&#x27A1;{this.state.nr + 1}
      </div>
    )}

    {this.props.isAddition && (
      <div className={this.props.isFullScreen ? "countnr-fullscreen" : "countnr"}>
      {this.state.nr1}&nbsp;+&nbsp;{this.state.nr2}
      </div>
    )}

    {this.props.isSubtraction && (
      <div className={this.props.isFullScreen ? "countnr-fullscreen" : "countnr"}>
      {this.state.nr1}&nbsp;-&nbsp;{this.state.nr2}
      </div>
    )}

    {this.props.isMultiplication && (
      <div className={this.props.isFullScreen ? "countnr-fullscreen" : "countnr"}>
      {this.state.nr1}&nbsp;x&nbsp;{this.state.nr2}
      </div>
    )}

    {this.props.isDivision && (
      <div className={this.props.isFullScreen ? "countnr-fullscreen" : "countnr"}>
      {this.state.nr1}&nbsp;/&nbsp;{this.state.nr2}
      </div>
    )}

    {(this.props.isTimer && this.state.milliseconds <this.state.maxtime) && (this.props.isCount || this.props.isNumber || this.props.isAddition || this.props.isSubtraction || this.props.isMultiplication || this.props.isDivision) &&  <div className="timer"><Timer maxtime={this.state.maxtime} onTimeUpdate={this.updateTime}/></div>}     
    {(this.props.isTimer && this.state.milliseconds >=this.state.maxtime) && (this.props.isCount || this.props.isNumber || this.props.isAddition || this.props.isSubtraction || this.props.isMultiplication || this.props.isDivision) &&  <div className="timer">0:0</div>}     
    {this.props.isTimer && (this.props.isNumber || this.props.isAddition || this.props.isSubtraction || this.props.isMultiplication || this.props.isDivision) && (
        <div className={this.props.isFullScreen ? "answers-fullscreen" : "answers"}>
        {this.state.correct}
        </div>
    )}
     
      <div className="suanpan">
        {Array(this.state.rods)
          .fill()
          .map((_, index) => this.renderRod(this.state.beads[index], index))}
      </div>             
      </div>
    );
  }
}

export default Suanpan;
