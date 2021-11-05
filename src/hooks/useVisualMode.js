import { useState } from 'react';
export default function useVisualMode(initial) { 
  const [history, setHistory] = useState([initial]);

  const transition = function(mode, replace = false) {
    // Replaces last entry of history with mode
    setHistory(prev => replace ? [...prev.slice(0,-1), mode] : [...prev, mode]);
  }

  const back = function () { 
    // gets rid of the last entry
    setHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev); 
  }
  // Returns the mode as the last entry in history
  return { mode: history[history.length -1], transition, back };
}




























/*
import { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (mode, replace = false) {
    // case where we want to be able to go back twice
    if (replace) {
      // create copy of history array
      let replaceHistory = [...history]
      // set last value of array to the mode
      mode = replaceHistory[replaceHistory.length - 1]
      setHistory((prev) => replaceHistory)
      setMode(mode)
    } else {
      setHistory((prev) => [...prev, mode])
      setMode(mode)
    }
  }

  function back () {
    if (history.length > 1) {
      // delete last entry on array
      //history.pop()
      // set mode to previous entry
      //setMode(history[history.length-1])

      setMode(history[history.length -2]);
      setHistory(prev =>[...prev.slice(0, -1)])
    }
  }
  return { mode, transition, back };
}
*/
