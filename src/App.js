import React, {useState, useEffect, useRef} from 'react';
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react'
import './App.css';
import { BsLightning } from "react-icons/bs";
import { SiGrammarly } from "react-icons/si";
import { RiAlarmWarningLine } from "react-icons/ri";


function App() {
  const startingTime = 60
  const [text, setText] = useState("")
  const [countdown, setCountdown] = useState(startingTime)
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const textareaRef = useRef()

  useEffect(() => { 
    if (isCountingDown && countdown > 0) {
      setTimeout(() => {
        setCountdown(prevTime => prevTime - 1)
      }, 1000)
    } else if(countdown === 0) {
      //end game
      setIsCountingDown(false)
      setWordCount(countWords(text))
      
    }
  }, [countdown, isCountingDown])

  function handleChange(event) {
    const {value} = event.target
    setText(value)
  }

  function countWords(text) {
    const wordsArr = text.trim().split(' ')
    return wordsArr.filter(word => word !== '').length
  }

  function startGame() {
    setCountdown(startingTime)
    setIsCountingDown(true)
    setText("")
    textareaRef.current.disabled = false
    textareaRef.current.focus()
  }
  

  return (
    <div>
      <div className='grid-container'>
          <div>
            <BsLightning  className='lightning'/>
          </div>
        <div className='title'>
          <h1 className='first'>how fast</h1>
          <h1 className='second'>do you type?</h1>
        </div>
        <div className='description'>
          <p style= {{fontWeight: 600, color: '#FFC300'}}>check it out</p><span><p>this app has Grammarly <SiGrammarly /> &nbsp;integrated!</p></span>
          
          <p style= {{fontWeight: 300}}>gauge your typing speed and root out pesky typos like a pro</p>
        </div>
      </div>
      
      
      <GrammarlyEditorPlugin clientId={`${process.env.REACT_APP_API_KEY}`}>
        <textarea 
          value={text}
          onChange={handleChange}
          disabled={!isCountingDown}
          ref={textareaRef}
        />
      </GrammarlyEditorPlugin>
      <p className='results'>time remaining: <span className='time-remaining'>{countdown}</span></p>
      <button disabled={isCountingDown} onClick={startGame}>Start Game</button>
      <p className='results'>word count: <span className='word-count'>{wordCount}</span></p>
      <p className='footnote'><RiAlarmWarningLine /> Grammarly suggestions will appear in a pop-up window in the bottom right corner of the screen</p>
    </div>
  );
}

export default App;
