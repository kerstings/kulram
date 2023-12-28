import React, { useState } from 'react';
import Abacus from './Abacus';
import Kulram from './Kulram';
import Suanpan from './Suanpan';
import KulramFrame from './KulramFrame';
import './index.css';

function App() {

  const [isReset, setIsReset] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [isShowingNr, setIsShowingNr] = useState(true);
  const [isShowingBead, setIsShowingBead] = useState(true);  
  const [isMoreRods, setIsMoreRods] = useState(false);
  const [isFewerRods, setIsFewerRods] = useState(false);
  const [isKulram, setIsKulram] = useState(false);
  const [isAbacus, setIsAbacus] = useState(true);
  const [isSuanpan, setIsSuanpan] = useState(false);
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

  const handleMoreRods = () => {    
    setIsMoreRods(true); 
    setTimeout(() => {
      setIsMoreRods(false);
    }, 0);    
  };

   const handleFewerRods = () => {    
    setIsFewerRods(true); 
    setTimeout(() => {
      setIsFewerRods(false);
    }, 0);   
  };

  const handleRandom = () => {
    setIsRandom(true); 
    setTimeout(() => {
      setIsRandom(false);
    }, 0);
  };

  const handleReset = () => {
    setIsReset(true);
    setTimeout(() => {
      setIsReset(false);
    }, 0);
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
    if (isKulram) {
      setIsKulram(false);
      setIsAbacus(true);    
    }
  }

  const handleMaxTimeExceeded = () => {              
    setIsTimeExpired(true); 
    setIsNewGame(false);
  };

  const handleNewGame = () => {                     
      setIsNewGame(false);    
      setTimeout(() => {
        setIsTimeExpired(false);
      }, 0);      
      setIsNewGame(true);          
  };

  const handleTimer = () => {          
    setTimeout(() => {      
    }, 0);      
    setIsTimer(false); 
  };

  const showImage = (value, before, after) => ({
    backgroundImage: value ? `url(${before})` : `url(${after})`,
    backgroundSize: "100% 100%",
    height: "12vh",
    width: "7vw",
  });

  const getImage = (image) => ({
    backgroundImage: `url(${image})`,
    backgroundSize: "100% 100%",
    height: "12vh",
    width: "7vw",
  });

  return (
    <div className="App" onContextMenu={(e)=>e.preventDefault()}>             
      <div className="button-container" />            
      {(isKulram||isTeacher||isAddition||isSubtraction||isMultiplication||isDivision||isCount) && <button onClick={handleHome} style={getImage("home.png")} />  }                       
      {!isTeacher && !isKulram && !isAddition && !isSubtraction && !isMultiplication && !isDivision && !isCount && <button onClick={handleCount} style={getImage("count.png")} /> }
      {!isTeacher && !isKulram && !isAddition && !isSubtraction && !isMultiplication && !isDivision && !isCount && <button onClick={handleAddition} style={getImage("addition.png")} />  }                       
      {!isTeacher && !isKulram && !isAddition && !isSubtraction && !isMultiplication && !isDivision && !isCount && <button onClick={handleSubtraction} style={getImage("subtraction.png")} /> }      
      {!isTeacher && !isKulram && !isAddition && !isSubtraction && !isMultiplication && !isDivision && !isCount && <button onClick={handleMultiplication} style={showImage(isMultiplication, "home.png", "multiplication.png")} /> }      
      {!isTeacher && !isKulram && !isAddition && !isSubtraction && !isMultiplication && !isDivision && !isCount && <button onClick={handleDivision} style={showImage(isDivision, "home.png", "division.png")} /> }      
      {isAbacus && !isCount && !isAddition && !isSubtraction && !isMultiplication && !isDivision && <button onClick={handleMoreRods} style={getImage("moreRods.png")} />  }                       
      {isAbacus && !isCount && !isAddition && !isSubtraction && !isMultiplication && !isDivision && <button onClick={handleFewerRods} style={getImage("fewerRods.png")} /> }      
      {isSuanpan && !isCount && !isAddition && !isSubtraction && !isMultiplication && !isDivision && <button onClick={handleMoreRods} style={getImage("moreRodsSuanpan.png")} />  }                       
      {isSuanpan && !isCount && !isAddition && !isSubtraction && !isMultiplication && !isDivision && <button onClick={handleFewerRods} style={getImage("fewerRodsSuanpan.png")} /> }            
      {!isAbacus && !isAddition && !isSubtraction && !isMultiplication && !isDivision && <button onClick={handleIsAbacus} style={getImage("abacus.png")} /> }   
      {!isSuanpan && !isCount && !isAddition && !isAddition && !isSubtraction && !isMultiplication && !isDivision && <button onClick={handleIsSuanpan} style={getImage("suanpan.png")} /> }
      {!isTeacher && !isKulram && !isCount && !isAddition && !isAddition && !isSubtraction && !isMultiplication && !isDivision && <button onClick={handleIsKulram} style={getImage("kulram.png")} /> }
      {!isTeacher && !isKulram && !isAddition && !isSubtraction && !isMultiplication && !isDivision && !isCount && <button onClick={handleTeacher} style={getImage("teacher.png")} /> }                     
      {!isCount && !isAddition && !isSubtraction && !isMultiplication && !isDivision && isTeacher && <button onClick={handleToggleImageNr} style={showImage(isShowingNr, "nodigit.png","digit.png")}/> }
      {isAbacus && !isCount && !isAddition && !isSubtraction && !isMultiplication && !isDivision && !isKulram && isTeacher && <button onClick={handleToggleImageBead} style={showImage(isShowingBead, "hideBead.png","showbead.png")} />  }
      {isAbacus && !isCount && !isAddition && !isSubtraction && !isMultiplication && !isDivision && !isKulram && isTeacher && <button onClick={handleToggleImageBead} style={showImage(isShowingBead, "hideBead.png","showbeadSuanpan.png")} />  }
      {!isCount && !isAddition && !isSubtraction && !isMultiplication && !isDivision && isTeacher && <button onClick={handleRandom} style={getImage("random.png")} /> }
      {!isCount && isTeacher && <button onClick={handleReset} style={getImage("zero.png")} /> }  
      {(isCount || isAddition || isSubtraction || isMultiplication || isDivision) && isTimer && <button onClick={handleTimer} style={getImage("timer.png")} /> }    
      {(isCount || isAddition || isSubtraction || isMultiplication || isDivision) && isTimeExpired && !isNewGame && <button onClick={handleNewGame} style={getImage("newgame.png")} /> }       
      {/* Draw the frame and suanpan, if suanpan is selected */ }
      {isSuanpan && (
      <>
        <div className="vertical-left" />
        <div className="vertical-right" />        
        <div className="horizontal horizontal-top" />
        <div className="horizontal horizontal-suanpan-middle" />
        <div className="horizontal horizontal-bottom" />                            
        <Suanpan initialRods={3} isReset = {isReset} isRandom = {isRandom} isMoreRods = {isMoreRods} isFewerRods = {isFewerRods} isShowingNr = {isShowingNr} isShowingBead = {isShowingBead}  isAbacus = {false} isSuanpan= {true}  isKulram = {false} isCount = {isCount} isAddition = {isAddition} isSubtraction = {isSubtraction} isMultiplication = {isMultiplication} isDivision = {isDivision} onMaxTime = {handleMaxTimeExceeded} isNewGame = {isNewGame} isTimer = {isTimer} />
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
        <Abacus initialRods={3} isReset = {isReset} isRandom = {isRandom} isMoreRods = {isMoreRods} isFewerRods = {isFewerRods} isShowingNr = {isShowingNr} isShowingBead = {isShowingBead}  isAbacus = {true} isSuanpan= {false}  isKulram = {false} isCount = {isCount}  isAddition = {isAddition} isSubtraction = {isSubtraction} isMultiplication = {isMultiplication} isDivision = {isDivision} onMaxTime = {handleMaxTimeExceeded} isNewGame = {isNewGame} isTimer = {isTimer} />
      </>
      )}
      {/* Draw the Kulram (an abacus for children) */ }
      {isKulram && (
      <><KulramFrame />                                       
        <Kulram isReset = {isReset} isRandom = {isRandom} isMoreRods = {isMoreRods} isFewerRods = {isFewerRods} isShowingNr = {isShowingNr} isShowingBead = {isShowingBead} isAbacus = {false} isSuanpan= {false} isKulram = {true} isCount = {isCount}/>
      </>
      )}
      
    </div>
  );
}

export default App;