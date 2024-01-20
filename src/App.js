import React, { useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Abacus from './Abacus';
import Kulram from './Kulram';
import Suanpan from './Suanpan';
import KulramFrame from './KulramFrame';
import './index.css';

await new Promise((resolve) => setTimeout(resolve, 0));
function App() {
  const handle = useFullScreenHandle();
  const [isReset, setIsReset] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [isShowingNr, setIsShowingNr] = useState(true);
  const [isShowingBead, setIsShowingBead] = useState(true);  
  const [isMoreRods, setIsMoreRods] = useState(false);
  const [isFewerRods, setIsFewerRods] = useState(false);
  const [isKulram, setIsKulram] = useState(false);
  const [isAbacus, setIsAbacus] = useState(true);
  const [isSuanpan, setIsSuanpan] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isCount, setIsCount] = useState(false);
  const [isAddition, setIsAddition] = useState(false);
  const [isSubtraction, setIsSubtraction] = useState(false);  
  const [isMultiplication, setIsMultiplication] = useState(false);  
  const [isDivision, setIsDivision] = useState(false);  
  const [isNewGame, setIsNewGame] = useState(false);
  const [isTimeExpired, setIsTimeExpired] = useState(false);
  const [isTimer, setIsTimer] = useState(true);
  const [isTeacher, setIsTeacher] = useState(false);
  
  const handleToggleImageNr = () => {    
    setIsShowingNr(!isShowingNr);    
  };

  const handleToggleImageBead = () => {    
    setIsShowingBead(!isShowingBead);    
  };

  const handleTeacher = () => {    
    setIsTeacher(!isTeacher);    
  };

  const handleIsKulram = () => {    
    setIsAbacus(false);
    setIsSuanpan(false);
    setIsKulram(true);   
    handleHome(); 
  };

  const handleIsSuanpan = () => {    
    setIsAbacus(false);    
    setIsSuanpan(true);
    setIsKulram(false);            
  };

  const handleIsAbacus = () => {    
    setIsAbacus(true); 
    setIsSuanpan(false);
    setIsKulram(false);               
  };

  const handleMoreRods = async () => {    
    setIsMoreRods(true); 
    await new Promise((resolve) => setTimeout(resolve, 0));  
    setIsMoreRods(false);    
  };

   const handleFewerRods = async () => {    
    setIsFewerRods(true); 
    await new Promise((resolve) => setTimeout(resolve, 0));
    setIsFewerRods(false);    
  };

  const handleRandom = async () => {
    setIsRandom(true); 
    await new Promise((resolve) => setTimeout(resolve, 0));
    setIsRandom(false);    
  };

  const handleReset = async () => {
    setIsReset(true);
    await new Promise((resolve) => setTimeout(resolve, 0));
    setIsReset(false); 
  };
  
  const handleNumber = () => {    
    setIsNumber(!isNumber);    
    setIsShowingNr(false); 
    setIsShowingBead(true);
    handleNewGame();   
  };

  const handleCount = () => {    
    setIsCount(!isCount);    
    if (!isCount) {      
      setIsShowingNr(false);      
      setIsShowingBead(true);
    } else {  
      setIsShowingNr(true);          
    }
    setIsReset(true);
  };

  const handleAddition = () => {      
    setIsAddition(!isAddition);
    setIsShowingNr(false); 
    setIsShowingBead(true);
    handleNewGame();   
  };

  const handleSubtraction = () => {    
    setIsSubtraction(!isSubtraction);   
    setIsShowingNr(false);  
    setIsShowingBead(true);
    handleNewGame();   
  };

  const handleMultiplication = () => {    
    setIsMultiplication(!isMultiplication);    
    setIsShowingNr(false); 
    setIsShowingBead(true);
    handleNewGame();   
  };

  const handleDivision = () => {    
    setIsDivision(!isDivision);    
    setIsShowingNr(false); 
    setIsShowingBead(true);
    handleNewGame();   
  };

  const handleHome = () => {
    setIsNumber(false);
    setIsAddition(false);
    setIsSubtraction(false);
    setIsMultiplication(false);
    setIsDivision(false);
    setIsCount(false);    
    setIsFewerRods(false);
    setIsMoreRods(false);
    setIsShowingBead(true);
    handleReset();
    setIsShowingNr(true);      
    handleNewGame();   
    setIsTimer(true);
    setIsTeacher(false);   
  }

  const handleMaxTimeExceeded = () => {              
    setIsTimeExpired(true); 
    setIsNewGame(false);
  };

  const handleNewGame = async () => {                     
      setIsNewGame(false);    
      await new Promise((resolve) => setTimeout(resolve, 0));
      setIsTimeExpired(false);
      setIsNewGame(true);          
  };

  const handleTimer = async () => {          
    await new Promise((resolve) => setTimeout(resolve, 0));
    setIsTimer(false); 
  };

  const showImage = (value, before, after) => ({
    backgroundImage: value ? `url(${before})` : `url(${after})`,    
    backgroundSize: "100% 100%",
    height: "9.5vh",
    width: "8.9vw",
  });

  const getImage = (image) => ({
    backgroundImage: `url(${image})`,    
    backgroundSize: "100% 100%",
    height: "9.5vh",
    width: "8.9vw",    
  });
  
  const handleToggleFullScreen = () => {
    handle[handle.active ? 'exit' : 'enter']();     
  };

  return (        
    <div className="App" onContextMenu={(e)=>e.preventDefault()}>                 
      <FullScreen handle={handle} >      
      <div className="button-container"/>            
      {!isTeacher && !isKulram && !isCount && !isNumber && !isAddition && !isSubtraction && !isMultiplication && !isDivision && !isCount && <button onClick={handleTeacher} style={getImage("teacher.png")} title="Teacher Mode"/> }            
      {(isKulram||isTeacher||isNumber||isAddition||isSubtraction||isMultiplication||isDivision||isCount) && <button onClick={handleHome} style={getImage("home.png") } title="Home"/>  }                       

      {isAbacus && !isCount && !isNumber && !isAddition && !isSubtraction && !isMultiplication && !isDivision && <button onClick={handleMoreRods} style={getImage("moreRods.png")} title="More Rods" />  }                       
      {isAbacus && !isCount && !isNumber && !isAddition && !isSubtraction && !isMultiplication && !isDivision && <button onClick={handleFewerRods} style={getImage("fewerRods.png")} title="Fewer Rods" /> }      
      {isSuanpan && !isCount && !isNumber && !isAddition && !isSubtraction && !isMultiplication && !isDivision && <button onClick={handleMoreRods} style={getImage("moreRodsSuanpan.png")} title="More Rods" />  }                       
      {isSuanpan && !isCount && !isNumber && !isAddition && !isSubtraction && !isMultiplication && !isDivision && <button onClick={handleFewerRods} style={getImage("fewerRodsSuanpan.png")} title="Fewer Rods" /> }    
      
      {isKulram && !isCount && !isNumber && !isAddition && !isSubtraction && !isMultiplication && !isDivision && <button onClick={handleIsAbacus} style={getImage("soroban.png")} title="Soroban" /> }   
      {isAbacus && !isCount && !isNumber && !isAddition && !isAddition && !isSubtraction && !isMultiplication && !isDivision && <button onClick={handleIsSuanpan} style={getImage("suanpan.png")} title = "Suanpan" /> }
      {isSuanpan && !isCount && !isNumber && !isAddition && !isAddition && !isSubtraction && !isMultiplication && !isDivision && <button onClick={handleIsKulram} style={getImage("kulram.png")} title="Abacus" /> }               
      
      {!isTeacher && !isKulram && !isCount && !isNumber && !isAddition && !isSubtraction && !isMultiplication && !isDivision && <button onClick={handleNumber} style={getImage("digit.png")} title="Enter a given number"/> }
      {!isTeacher && !isKulram && !isNumber && !isAddition && !isSubtraction && !isMultiplication && !isDivision && !isCount && <button onClick={handleCount} style={getImage("count.png")} title="Count from 1 and up" /> }
      {!isTeacher && !isKulram && !isNumber && !isAddition && !isSubtraction && !isMultiplication && !isDivision && !isCount && <button onClick={handleAddition} style={getImage("addition.png")} title="Addition" />  }                       
      {!isTeacher && !isKulram && !isNumber && !isAddition && !isSubtraction && !isMultiplication && !isDivision && !isCount && <button onClick={handleSubtraction} style={getImage("subtraction.png")} title="Subtraction" /> }      
      {!isTeacher && !isKulram && !isNumber && !isAddition && !isSubtraction && !isMultiplication && !isDivision && !isCount && <button onClick={handleMultiplication} style={showImage(isMultiplication, "home.png", "multiplication.png")} title="Multiplication" /> }      
      {!isTeacher && !isKulram && !isNumber && !isAddition && !isSubtraction && !isMultiplication && !isDivision && !isCount && <button onClick={handleDivision} style={showImage(isDivision, "home.png", "division.png")} title="Division" /> }                    
      {!isCount && !isNumber && !isAddition && !isSubtraction && !isMultiplication && !isDivision && isTeacher && <button onClick={handleToggleImageNr} title = "Show/Hide Digits" style={showImage(isShowingNr, "nodigit.png","digit.png")}/> }
      {isAbacus && !isCount && !isNumber && !isAddition && !isSubtraction && !isMultiplication && !isDivision && !isKulram && isTeacher && <button onClick={handleToggleImageBead} title = "Show/Hide Beads" style={showImage(isShowingBead, "hideBead.png","showbead.png")} />  }
      {isSuanpan && !isCount && !isNumber && !isAddition && !isSubtraction && !isMultiplication && !isDivision && !isKulram && isTeacher && <button onClick={handleToggleImageBead} title = "Show/Hide Beads" style={showImage(isShowingBead, "hideBead.png","showbeadSuanpan.png")} />  }
      {!isCount && !isNumber && !isAddition && !isSubtraction && !isMultiplication && !isDivision && isTeacher && <button onClick={handleRandom} style={getImage("random.png")} title = "Random Number" /> }
      {(isCount || isNumber || isAddition || isSubtraction || isMultiplication || isDivision) && isTimer && <button onClick={handleTimer} style={getImage("timer.png")} title="Hide Timer"/> }    
      {(isNumber || isAddition || isSubtraction || isMultiplication || isDivision || isTeacher) && <button onClick={handleReset} style={getImage("zero.png")} title="Set value to 0" /> }        
      {(isCount || isNumber || isAddition || isSubtraction || isMultiplication || isDivision) && isTimeExpired && !isNewGame && <button onClick={handleNewGame} style={getImage("newgame.png")} title = "New Game" /> }                   
      {<button onClick={handleToggleFullScreen} style={getImage("size.png")} title="Fullscreen" /> }       
      {/* Draw the frame and suanpan, if suanpan is selected */ }      
      {isSuanpan && (
      <>        
        <div className="vertical-left" />
        <div className="vertical-right" />        
        <div className="horizontal horizontal-top" />
        <div className="horizontal horizontal-suanpan-middle" />
        <div className="horizontal horizontal-bottom" />                                    
        <Suanpan initialRods={3} isReset = {isReset} isRandom = {isRandom} isMoreRods = {isMoreRods} isFewerRods = {isFewerRods} isShowingNr = {isShowingNr} isShowingBead = {isShowingBead}  isAbacus = {false} isSuanpan= {true}  isKulram = {false} isCount = {isCount} isNumber = {isNumber} isAddition = {isAddition} isSubtraction = {isSubtraction} isMultiplication = {isMultiplication} isDivision = {isDivision} onMaxTime = {handleMaxTimeExceeded} isNewGame = {isNewGame} isTimer = {isTimer} />
      </>
      )}
      {/* Draw the frame and soroban (abacus), if suanpan is selected */ }
      {isAbacus && (
      <>
        <div className="vertical-left" />
        <div className="vertical-right" />        
        <div className="horizontal horizontal-top" />
        <div className="horizontal horizontal-middle" />
        <div className="horizontal horizontal-bottom" />                                           
        <Abacus initialRods={3} isReset = {isReset} isRandom = {isRandom} isMoreRods = {isMoreRods} isFewerRods = {isFewerRods} isShowingNr = {isShowingNr} isShowingBead = {isShowingBead}  isAbacus = {true} isSuanpan= {false}  isKulram = {false} isCount = {isCount}  isNumber = {isNumber} isAddition = {isAddition} isSubtraction = {isSubtraction} isMultiplication = {isMultiplication} isDivision = {isDivision} onMaxTime = {handleMaxTimeExceeded} isNewGame = {isNewGame} isTimer = {isTimer} />
      </>
      )}
      {/* Draw the Kulram (an abacus for children) */ }
      {isKulram && (
      <><KulramFrame />                                       
        <Kulram isReset = {isReset} isRandom = {isRandom} isMoreRods = {isMoreRods} isFewerRods = {isFewerRods} isShowingNr = {isShowingNr} isShowingBead = {isShowingBead} isAbacus = {false} isSuanpan= {false} isKulram = {true} isCount = {isCount}/>
      </>
      )}             
      </FullScreen>      
    </div>      
  );
}

export default App;